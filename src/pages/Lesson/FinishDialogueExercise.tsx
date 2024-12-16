import React, { useState, useEffect } from "react";
import { OpenAI } from "openai";

interface FinishDialogueExerciseProps {
  topic: string;
  structures: string[];
  onNext: () => void;
}

const FinishDialogueExercise: React.FC<FinishDialogueExerciseProps> = ({
  topic,
  structures,
  onNext,
}) => {
  const [dialogue, setDialogue] = useState<string>(""); // Full dialogue
  const [expectedResponse, setExpectedResponse] = useState<string>(""); // Correct Spanish response
  const [userResponse, setUserResponse] = useState(""); // User's input
  const [feedback, setFeedback] = useState<string | null>(null); // Feedback message
  const [isCorrect, setIsCorrect] = useState(false); // Check correctness

  useEffect(() => {
    const generateDialogue = async () => {
      const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
      if (!apiKey) {
        console.error("OpenAI API key is missing.");
        return;
      }

      const openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true, // Allow browser use
      });

      const prompt = `
        Tim: ¿Cómo estuvo la película?
        You: Estuvo bastante bien.
        Tim: Te lo dije, ¿verdad?
        You: [Yeah, it was better than I expected.]
        Suggested response: Si, fue mejor de lo que esperaba.

        Tim: ¿Qué te pareció la comida en ese restaurante nuevo?
        You: Estaba tan deliciosa que me sorprendió.
        Tim: ¡Vaya! ¿No pensaste que sería tan bueno?
        You: [It was much better than I thought.]
        Suggested response: Fue mucho más divertida de lo que pensaba.

        Tim: Acabo de ganar la lotería.
        You: ¡Wow, qué suerte!
        Tim: Sí, tan inesperado que todavía no lo creo.
        You: [So unexpected that I still can't believe it.]
        Suggested response: Tan inesperado que todavía no puedo creerlo.

        Using the task: '${topic}' and the provided structures: '${structures.join(
        ", "
      )}', generate a single dialogue.

        The response **must** meet the following criteria:
        1. It contains exactly **3 turns of conversation** between two speakers: "Tim" and "You".
        2. The **final turn** (You:) must include a phrase in square brackets in English, showing what the user must say in Spanish.
        3. 'Suggested response:' immediately follows the English phrase in brackets and includes the correct Spanish translation.
        4. The format must strictly match the examples provided, with no extra lines, labels, or formatting.
        5. Lastly, but most importantly, the final turn of the conversation for the user to fill in, MUST be answerable using exactly one of the structures given.

        Structure the response **exactly** as shown in the examples, with no extra lines, labels, or formatting beyond what’s in the examples.
      `;

      try {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 150,
          temperature: 0.7,
        });

        console.log("GPT Response for Dialogue Generation:", response.choices[0]?.message?.content); // Log the GPT response

        const text = response.choices[0]?.message?.content?.trim() || "";
        const match = text.match(
          /^(?<dialogue>(?:.*\n)*.*?)\s*Suggested response:\s*(?<response>.+)$/s
        );

        if (match?.groups) {
          setDialogue(match.groups.dialogue.trim()); // Full dialogue
          setExpectedResponse(match.groups.response.trim()); // Expected response
        } else {
          console.error("Failed to parse GPT output:", text);
        }
      } catch (error) {
        console.error("Error calling OpenAI API:", error);
      }
    };

    generateDialogue();
  }, [topic, structures]);

  const analyzeUserTranslation = async (
    userTranslation: string,
    englishIdea: string,
    suggestedTranslation: string
  ): Promise<boolean> => {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    if (!apiKey) {
      console.error("OpenAI API key is missing.");
      return false;
    }
  
    const openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true,
    });
  
    const prompt = `
      You are a Spanish language instructor. Grade the student's Spanish translation based on whether it conveys the correct meaning, even if the grammar or phrasing is slightly different.
  
      Here is the context:
      - Idea: '${englishIdea}'
      - Student's Translation: '${userTranslation}'
      - Suggested Translation: '${suggestedTranslation}'
  
      Your task:
      - If the student's translation conveys the same meaning as the suggested translation (even if there are small differences in phrasing or grammar), respond with "YES".
      - If the student's translation does NOT convey the same meaning as the suggested translation, respond with "NO".
  
      Only respond with "YES" or "NO". No explanations or additional text.
    `;
  
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 10,
        temperature: 0.0,
      });
  
      const gptResponse = response.choices[0]?.message?.content?.trim();
      console.log("GPT Validation Response:", gptResponse); // Log the GPT response for validation
      return gptResponse === "YES";
    } catch (error) {
      console.error("Error calling OpenAI API for translation analysis:", error);
      return false;
    }
  };
  

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserResponse(e.target.value);
    setFeedback(null);
  };

  const handleButtonClick = async () => {
    const englishIdeaMatch = dialogue.match(/\[([^\]]+)\]/);
    const englishIdea = englishIdeaMatch ? englishIdeaMatch[1] : "";

    if (!englishIdea) {
      console.error("Failed to extract English idea from the dialogue.");
      return;
    }

    const isValid = await analyzeUserTranslation(
      userResponse.trim(),
      englishIdea,
      expectedResponse
    );

    if (isValid) {
      setFeedback("Sounds good! Great work!");
      setIsCorrect(true);
    } else {
      setFeedback("Not quite. Try again; use the structures we learned!");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md h-[24rem] flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Finish the Dialogue Using a Structure you Learned
          </h2>
          {/* Display the entire dialogue with bolded "Tim:" and "You:" */}
          <div className="text-xl text-gray-700 mb-4 whitespace-pre-wrap">
            {dialogue
              ? dialogue.split("\n").map((line, index) => {
                  const boldPattern = /^(Tim:|You:)/; // Match "Tim:" or "You:"
                  const parts = line.split(boldPattern); // Split at "Tim:" or "You:"

                  return (
                    <p key={index} className="leading-relaxed">
                      {parts.map((part, idx) =>
                        boldPattern.test(part) ? (
                          <strong key={idx}>{part}</strong> // Bold "Tim:" or "You:"
                        ) : (
                          part // Leave the rest of the text normal
                        )
                      )}
                    </p>
                  );
                })
              : "Loading..."}
          </div>

          {/* Input Box */}
          <textarea
            className="w-full px-4 py-2 text-xl border border-gray-300 rounded-lg mb-4 outline-none focus:border-gray-500 focus:ring-0 resize-none"
            rows={2}
            value={userResponse}
            onChange={handleInputChange}
            placeholder="Type your response here..."
            disabled={isCorrect}
          />
        </div>

        {/* Feedback */}
        <div className="min-h-[1em] mb-4 flex items-center justify-center">
          {feedback && (
            <p
              className={`${
                isCorrect ? "text-green-600" : "text-red-600"
              } text-lg font-bold text-center`}
            >
              {feedback}
            </p>
          )}
        </div>
      </div>

      {/* Button */}
      <button
        className={`${
          isCorrect
            ? "bg-green-400 hover:bg-green-500"
            : "bg-purple-500 hover:bg-purple-700"
        } text-white px-8 py-4 text-xl mt-6 rounded-lg block mx-auto`}
        onClick={isCorrect ? onNext : handleButtonClick}
        disabled={!userResponse.trim() && !isCorrect}
      >
        {isCorrect ? "Next" : "Check"}
      </button>
    </div>
  );
};

export default FinishDialogueExercise;
