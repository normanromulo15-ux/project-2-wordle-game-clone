function AnswersDisplay(props) {
  const { userInput } = props;

  const guess = "TESTS";
  const answerLetters = Array(5).fill("");
  const answerRows = Array(6).fill(answerLetters);

  answerRows[0] = guess.split("");

  return (
    <div className="answers-display-2">
      {
        answerRows.map((userGuess, rowIndex) =>
          <div key={rowIndex} className="answer-row">
            {
              userGuess.map((letter, letterIndex) =>
                <div key={letterIndex} className="answer-letter-box">
                  {rowIndex}
                </div>
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default AnswersDisplay;