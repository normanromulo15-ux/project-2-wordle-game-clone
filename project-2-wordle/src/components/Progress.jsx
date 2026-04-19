import { useState } from "react";

function Progress(props) {
  const { randomWord, answers } = props;

  // FUNCTION TO DISPLAY THE USER'S GUESSES WITH COLOR-CODED BACKGROUND
  function getGuessColors(guess) {

    // INITIALIZE AN ARRAY TO HOLD THE COLOR FOR EACH LETTER IN THE GUESS, DEFAULTING TO BLACK
    const colors = Array(guess.length).fill('black');

    // CREATE A COPY OF THE RANDOM WORD AS AN ARRAY TO TRACK USED LETTERS
    const randomWordLetters = randomWord.split("");

    // PASS 1: CHECK FOR CORRECT LETTERS IN THE CORRECT POSITION (GREEN)
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === randomWordLetters[i]) {
        // MARK THIS LETTER AS GREEN
        colors[i] = 'green';

        // MARK THIS LETTER AS USED TO AVOID DUPLICATE MATCHES IN PASS 2
        randomWordLetters[i] = '*';
      }
    }

    // PASS 2: CHECK FOR CORRECT LETTERS IN THE WRONG POSITION (ORANGE)
    for (let i = 0; i < guess.length; i++) {

      // SKIP LETTERS ALREADY MARKED AS GREEN
      if (colors[i] === 'green') continue;

      // RETURNS THE INDEX OF THE FIRST OCCURRENCE OF THE LETTER IN THE REMAINING LETTERS ARRAY
      const letterIndex = randomWordLetters.indexOf(guess[i]);

      if (letterIndex !== -1) {
        // MARK THIS LETTER AS ORANGE
        colors[i] = 'orange';

        // MARK THIS LETTER AS USED TO AVOID DUPLICATE MATCHES
        randomWordLetters[letterIndex] = '*';
      }
    }

    // RETURNS AN ARRAY OF COLORS CORRESPONDING TO EACH LETTER IN THE GUESS
    return colors;
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