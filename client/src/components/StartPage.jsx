function StartPage(props) {
  const { handleStartGame } = props;
  const displayTitle = 'WORDLE';
  const displayArr = Array.from({ length: 6 }, (_, i) => displayTitle[i]);

  return (
    <section
      className="h-dvh bg-[rgb(245,245,245)] flex flex-col items-center justify-evenly

                lg:justify-center lg:gap-12"
    >
      <div
        className="flex gap-1 md:gap-2"
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
                className={`${bgColor} text-white text-2xl p-2
                          md:text-4xl md:font-bold md:p-4
                          lg:text-5xl lg:font-extrabold`}
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
        className="bg-green-600 text-white cursor-pointer tracking-wide transition hover:scale-110 py-3 px-4 rounded-3xl text-lg
                  md:text-3xl md:rounded-full md:p-6
                  lg:p-4 lg:px-8  lg:text-xl lg:font-bold"
        onClick={handleStartGame}
      >
        PLAY
      </button>
    </section>
  )
}

export default StartPage;