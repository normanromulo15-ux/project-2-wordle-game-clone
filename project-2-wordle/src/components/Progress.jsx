import { useState } from "react";

function Progress(props) {
  const { randomWord, answers } = props;

  function getBgColor(letter, index) {
    if (letter === randomWord[index]) {
      return 'green';
    }

    if (randomWord.includes(letter)) {
      return 'orange';
    }

    return 'black';
  }

  return (
    <div className="answers-display">
      {
        answers.map((guess, guessIndex) => (
          <div className="answers-container" key={guessIndex}>
            {
              guess.split("").map((letter, index) => (
                <div
                  className="user-answer"
                  key={`${guessIndex}-${index}`}
                  style={{ backgroundColor: getBgColor(letter, index) }}
                >
                  {letter}
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default Progress;