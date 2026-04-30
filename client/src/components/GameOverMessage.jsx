import ActionButtons from "./ActionButtons.jsx";

function GameOverMessage(props) {
  const { randomWord, handleRestartGame } = props;

  return (
    <div className="fixed h-dvh w-dvw z-100 bg-[#0d0d0d] opacity-95 flex items-center justify-center inset-0">
      <div className="bg-red-900 w-11/20 h-1/3 text-white font-bold rounded-4xl flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-3xl">
            Sorry, you ran out of attempts!
          </h1>
          <h2 className="text-2xl">
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