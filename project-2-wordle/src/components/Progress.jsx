import { useState } from "react";

function Progress(props) {
  const { randomWord, answers } = props;

  // FUNCTION TO DISPLAY THE USER'S GUESSES WITH COLOR-CODED BACKGROUND
  function getGuessColors(guess) {
    const colors = Array(guess.length).fill('black');
    const remainingLetters = randomWord.split('');

    // PASS 1: CHECK FOR CORRECT LETTERS IN THE CORRECT POSITION (GREEN)
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === remainingLetters[i]) {
        // MARK THIS LETTER AS GREEN
        colors[i] = 'green';

        // MARK THIS LETTER AS USED TO AVOID DUPLICATE MATCHES IN PASS 2
        remainingLetters[i] = null;
      }
    }

    // PASS 2: CHECK FOR CORRECT LETTERS IN THE WRONG POSITION (ORANGE)
    for (let i = 0; i < guess.length; i++) {

      // SKIP LETTERS ALREADY MARKED AS GREEN
      if (colors[i] === 'green') continue;

      // RETURNS THE INDEX OF THE FIRST OCCURRENCE OF THE LETTER IN THE REMAINING LETTERS ARRAY
      const letterIndex = remainingLetters.indexOf(guess[i]);

      if (letterIndex !== -1) {
        // MARK THIS LETTER AS ORANGE
        colors[i] = 'orange';

        // MARK THIS LETTER AS USED TO AVOID DUPLICATE MATCHES
        remainingLetters[letterIndex] = null;
      }
    }

    return colors; // RETURNS AN ARRAY OF COLORS CORRESPONDING TO EACH LETTER IN THE GUESS
  }


  return (
    <div className="answers-display">
      {
        answers.map((guess, guessIndex) => {
          const colors = getGuessColors(guess);

          return (
            <div className="answers-container" key={guessIndex}>
              {
                guess.split("").map((letter, index) => (
                  <div
                    className="user-answer"
                    key={`${guessIndex}-${index}`}
                    style={{ backgroundColor: colors[index] }}
                  >
                    {letter}
                  </div>
                ))
              }
            </div>
          )

        }

        )
      }
    </div>
  )
}

export default Progress;