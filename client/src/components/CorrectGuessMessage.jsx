import ActionButtons from "./ActionButtons.jsx";

function CorrectGuessMessage(props) {
  const { randomWord, handleRestartGame } = props;

  return (
    <div className="fixed h-dvh w-dvw z-100 bg-[#0d0d0d] opacity-95 flex items-center justify-center inset-0">
      <div className="bg-green-900 w-11/20 h-1/3 text-white font-bold rounded-4xl flex flex-col  items-center justify-center gap-6">
        <p className="text-3xl">
          Awesome, you guessed the word : {randomWord}!
        </p>
        <ActionButtons
          handleRestartGame={handleRestartGame}
        />
      </div>
    </div>
  )
}

export default CorrectGuessMessage;