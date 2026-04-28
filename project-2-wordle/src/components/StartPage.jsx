function StartPage(props) {
  const { handleStartGame } = props;
  const displayTitle = 'WORDLE';
  const displayArr = Array.from({ length: 6 }, (_, i) => displayTitle[i]);

  return (
    <section
      className="flex flex-col gap-12 items-center justify-center h-dvh  bg-[rgb(245,245,245)]"
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
                className={`${bgColor} text-white text-4xl font-bold p-4`}
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
        className="p-4 px-8 bg-green-600 text-xl text-white font-bold tracking-wide transition hover:scale-105 rounded-4xl cursor-pointer"
        onClick={handleStartGame}
      >
        PLAY
      </button>
    </section>
  )
}

export default StartPage;