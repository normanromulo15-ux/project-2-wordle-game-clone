import ActionButtons from "./ActionButtons.jsx";

function GameOverMessage(props) {
  const { randomWord, handleRestartGame } = props;

  return (
    <div className="fixed h-dvh w-dvw z-100 bg-[#0d0d0d] opacity-95 flex items-center justify-center inset-0">
      <div className="flex flex-col items-center justify-evenly text-white bg-red-900 p-4 w-6/7 h-1/3 font-bold rounded-4xl md:p-10 xl:w-11/20 xl:h-1/2 ">
        <div className="flex flex-col items-center justify-center gap-2 md:gap-6">
          <h1 className="text-center text-2xl md:text-3xl">
            Sorry, you ran out of attempts!
          </h1>
          <h2 className="text-center text-xl md:text-2xl">
            The word was: {randomWord}
          </h2>
        </div>
        <ActionButtons
          handleRestartGame={handleRestartGame}
        />
      </div>
    </div>
  )
}

export default GameOverMessage;