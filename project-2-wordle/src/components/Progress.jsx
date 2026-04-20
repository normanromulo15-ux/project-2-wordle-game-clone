import { useState } from "react";

function Progress(props) {
  const { answers, getGuessColors } = props;

  return (
    <div className="answers-display">
      {
        answers.map((guess, guessIndex) => {

          // GETS AN ARRAY OF COLORS FOR THE CURRENT GUESS BASED ON THE RANDOM WORD
          const colors = getGuessColors(guess);

          return (
            <div className="answers-container" key={guessIndex}>
              {
                guess.split("").map((letter, index) => (
                  <div
                    className="user-answer"
                    key={`${index}`}
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