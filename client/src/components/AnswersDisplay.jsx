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
                    className="bg-black text-white flex justify-center items-center w-10 h-10 font-bold text-xl
                              md:font-extrabold md:w-20 md:h-20 md:text-5xl
                
                          xl:w-12 xl:h-12 xl:text-3xl
                              "
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