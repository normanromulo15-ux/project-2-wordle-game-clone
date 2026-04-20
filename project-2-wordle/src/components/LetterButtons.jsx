import { useState } from "react";
import letters from "./Letters.js";

function LetterButtons(props) {

  const { answers, getGuessColors } = props;

  // OBJECT TO TRACK THE COLORS OF THE LETTER BUTTONS
  const keyboardColors = {};

  // COLOR STRENGTH: GREEN > ORANGE > BLACK
  const colorStrength = { green: 3, orange: 2, black: 1 };

  // STORE THE CLICKED LETTERS IN AN ARRAY
  const [lettersClicked, setLettersClicked] = useState([]);

  // FUNCTION TO HANDLE CLICKING THE LETTER BUTTONS
  function handleLetterButtonClick(e) {
    const { value } = e.target;
    console.log(keyboardColors); // FOR TESTING PURPOSES ONLY --- IGNORE ---
  }

  // LOOP THROUGH THE USER'S GUESSES TO DETERMINE THE COLOR OF EACH LETTER BUTTON
  answers.forEach(guess => {
    const colors = getGuessColors(guess);

    guess.split("").forEach((letter, index) => {
      keyboardColors[letter] = colors[index];
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
              onClick={handleLetterButtonClick}
              style={{ backgroundColor: keyboardColors[letter] || 'grey' }}

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