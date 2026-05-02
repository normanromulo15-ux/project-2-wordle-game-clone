import ActionButtons from "./ActionButtons.jsx";

function CorrectGuessMessage(props) {
  const { randomWord, handleRestartGame } = props;

  return (
    <div className="fixed h-dvh w-dvw z-100 bg-[#0d0d0d] opacity-95 flex items-center justify-center inset-0">
      <div className="flex flex-col items-center justify-evenly text-white bg-green-900 p-6 w-6/7 h-1/3 font-bold rounded-4xl xl:w-11/20 xl:h-1/2">
        <p className="text-center text-lg md:text-2xl lg:text-3xl">
          Awesome, you guessed the word: {randomWord}!
        </p>
        <ActionButtons
          handleRestartGame={handleRestartGame}
        />
      </div>
    </div>
  )
}

export default CorrectGuessMessage;