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
    <section
      className="flex flex-col gap-1.5"
    >
      {
        answerRows.map((row, rowIndex) => {
          const colors = getGuessColors(row);

          return (
            <div key={rowIndex}
              className="flex justify-center items-center gap-1"
            >
              {
                row.map((letter, letterIndex) =>
                  <div
                    key={letterIndex}
                    className="w-12 h-12 text-3xl font-extrabold text-white bg-black flex justify-center items-center"
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
    </section>
  )
}

export default AnswersDisplay;