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
                    className="bg-black text-white flex justify-center items-center 
                              lg:w-12 lg:h-12 lg:text-3xl lg:font-extrabold"
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