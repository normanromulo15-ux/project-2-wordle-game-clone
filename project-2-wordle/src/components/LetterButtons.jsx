import { useState } from "react";

import letters from "./Letters.js";

function LetterButtons(props) {
  const { answers, getGuessColors, handleClickButton, reachedLimit } = props;

  const clickedLetters = [];

  // OBJECT TO TRACK THE COLORS OF THE LETTER BUTTONS, INITIALLY EMPTY
  const keyboardColors = {};

  // COLOR RANK: GREEN > ORANGE > BLACK
  const rank = { green: 3, orange: 2, black: 1 };

  // LOOP THROUGH THE USER'S GUESSES TO DETERMINE THE COLOR OF EACH LETTER BUTTON
  answers.forEach(guess => {
    const colors = getGuessColors(guess); // RETURNS AN ARRAY CONTAINING ['green', 'orange', 'black', ...]

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
    < div className="letters-container" >
      {
        // RENDER THE LETTER BUTTONS
        letters.map((letter, index) => {
          return (
            <button
              name="letter-button"
              key={index}
              type="button"
              className="letter-button"
              value={letter}
              style={{ backgroundColor: keyboardColors[letter] || 'rgb(115,115,115)' }}
              onClick={handleClickButton}
              disabled={reachedLimit}
            >
              {letter}
            </button>
          )
        }
        )
      }
    </div >
  )
}

export default LetterButtons;
