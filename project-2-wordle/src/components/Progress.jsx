import { useState } from "react";

function Progress(props) {
  const { inputContainer, randomWord } = props;
  const hiddenWord = randomWord.split("");

  let bgColor = null;

  return (
    <div className="answers-container">
      {inputContainer.map((answer, index) => {
        if (answer === hiddenWord[index]) {
          bgColor = 'green'
        } else if (hiddenWord.includes(answer)) {
          bgColor = 'orange'
        } else {
          bgColor = 'black'
        }

        return <div
          className="user-answer"
          key={index}
          style={
            {
              backgroundColor: bgColor
            }
          }
        >
          {answer}
        </div>
      }
      )}
    </div>
  )
}

export default Progress;