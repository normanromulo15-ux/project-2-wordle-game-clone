import { useState } from "react";

function Progress(props) {
  const { inputContainer, randomWord } = props;
  const hiddenWord = randomWord.split("");
  const [bgColor, setBgColor] = useState("");


  return (
    <div className="answers-container">
      {inputContainer.map((answer, index) => {
        console.log(hiddenWord.join(""));

        return <div
          className="user-answer"
          key={index}
          style={
            {
              backgroundColor: (answer === hiddenWord[index] && hiddenWord.includes(answer)) && 'green'
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