import { useState } from "react";
import letters from "./Letters.js";

function LetterButtons(props) {
  const { answers, getGuessColors, reachedLimit, handleClickButton, handleSubmitGuess, handleBackspace } = props;

  // OBJECT TO TRACK THE COLORS OF THE LETTER BUTTONS, INITIALLY EMPTY
  const keyboardColors = {};

  // COLOR RANK: GREEN > ORANGE > BLACK
  const rank = { green: 3, orange: 2, black: 1 };

  // LOOP THROUGH THE USER'S GUESSES TO DETERMINE THE COLOR OF EACH LETTER BUTTON
  answers.forEach(guess => {
    const colors = getGuessColors(guess); // GETS AN ARRAY OF COLORS FOR THE CURRENT GUESS BASED ON THE RANDOM WORD

    guess.split("").forEach((letter, index) => {
      const previousColor = keyboardColors[letter];
      const currentColor = colors[index]; // CURRENT COLOR

      // ONLY UPDATE THE COLOR IF IT IS A NEW COLOR OR A STRONGER COLOR (GREEN > ORANGE > BLACK)
      if (!previousColor || (rank[currentColor] > rank[previousColor])) {
        keyboardColors[letter] = currentColor;
      }
    })
  })

  return (
    < section
      className="grid grid-cols-10 grid-rows-3 border-black border-solid border-2 gap-1 p-4 mx-5 
       rounded-3xl
       md:gap-2 md:p-5 md:mx-20
                lg:rounded-4xl lg:gap-2 xl:mx-100"
    >
      {
        // RENDER THE LETTER BUTTONS
        letters.map((letter, index) => {
          return (
            <button
              name="letter-button"
              key={letter}
              type="button"
              className={`cursor-pointer bg-[#A9A9A9] text-white hover:bg-[#5A5A5A] disabled:opacity-100 font-bold p-2 rounded-lg flex items-center justify-center text-base
                        md:text-2xl md:rounded-xl md:p-4
                         lg:rounded-2xl 
                        xl:text-lg
                        ${index >= 20 && "order-2"} `}
              value={letter}
              style={{ backgroundColor: keyboardColors[letter] }}
              onClick={handleClickButton}
              disabled={reachedLimit}
            >
              {letter}
            </button>
          )
        }
        )
      }
      <button
        type="button"
        className={`order-1 cursor-pointer bg-[#A9A9A9] disabled:cursor-not-allowed rounded-lg flex items-center justify-center p-1 
          md:rounded-xl
                  lg:p-2 lg:rounded-2xl 
                  ${reachedLimit && "bg-green-500"} flex items-center justify-center `}
        onClick={handleSubmitGuess}
        disabled={!reachedLimit}
      >
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg"
          alt="Enter">
          <path d="M20 7V8.2C20 9.88016 20 10.7202 19.673 11.362C19.3854 11.9265 18.9265 12.3854 18.362 12.673C17.7202 13 16.8802 13 15.2 13H4M4 13L8 9M4 13L8 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        className="order-3 cursor-pointer bg-[#A9A9A9] flex items-center justify-center p-1 rounded-lg
        md:rounded-xl
                  lg:p-2 lg:rounded-2xl"
        onClick={handleBackspace}
      >
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.91987 5C7.33602 5 6.78132 5.25513 6.40136 5.69842L2.11564 10.6984C1.47366 11.4474 1.47366 12.5526 2.11564 13.3016L6.40136 18.3016C6.78132 18.7449 7.33602 19 7.91987 19L19 19C20.1046 19 21 18.1046 21 17L21 7C21 5.89543 20.1046 5 19 5L7.91987 5Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
          <path d="M15 10.0001L11 14.0001" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
          <path d="M11 10.0001L15 14.0001" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
        </svg>

      </button>

    </section >
  )
}

export default LetterButtons;
