function StartPage(props) {
  const { handleStartGame } = props;
  const displayTitle = 'WORDLE';
  const displayArr = Array.from({ length: 6 }, (_, i) => displayTitle[i]);

  return (
    <section
      className="bg-[rgb(245,245,245)] flex flex-col items-center justify-center h-dvh 
                lg:gap-12"
    >
      <div
        className="flex gap-1"
      >
        {
          displayArr.map((e, i) => {
            let bgColor = "bg-black";

            if (i == 0 || i == 3 || i == 5) {
              bgColor = "bg-[#008000]"
            } else if (i == 1 || i == 4) {
              bgColor = "bg-[#FFA500]"
            }

            return (
              <div
                key={i}
                className={`${bgColor} text-white 
                          lg:text-4xl lg:font-bold lg:p-4`}
              >
                {e}
              </div>
            )
          }

          )
        }
      </div>

      <button
        type="button"
        className="bg-green-600 text-white cursor-pointer tracking-wide transition hover:scale-110 
                  lg:p-4 lg:px-8  lg:text-xl lg:font-bold  lg:rounded-4xl"
        onClick={handleStartGame}
      >
        PLAY
      </button>
    </section>
  )
}

export default StartPage;