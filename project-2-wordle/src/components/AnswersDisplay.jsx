function AnswersDisplay(props) {
  const { userInput, answers, getGuessColors } = props;

  const guessPerAttempt = userInput;

  const answerRows = Array.from({ length: 6 },
    (_, rowIndex) => {

      let rowValue = "";

      if (rowIndex === answers.length) {
        rowValue = userInput;
      }
      
      else if (rowIndex < answers.length) {
        rowValue = answers[rowIndex];
      }

      return Array.from({ length: 5 }, (_, letterIndex) => rowValue[letterIndex] ?? ""
      );
    }
  );

  return (
    <div className="answers-display">
      {
        answerRows.map((row, rowIndex) => {
          const colors = getGuessColors(row);

          return (
            <div key={rowIndex} className="answer-row">
              {
                row.map((letter, letterIndex) =>
                  <div
                    key={letterIndex}
                    className="answer-letter-box"
                    style={{ backgroundColor: (rowIndex < answers.length) && colors[letterIndex] }}
                  >
                    {letter}
                  </div>
                )
              }
            </div>
          )
        }
        )
      }
    </div>
  )
}

export default AnswersDisplay;