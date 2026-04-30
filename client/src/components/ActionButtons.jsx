function ActionButtons(props) {
  const {handleRestartGame} = props;

  return (
    <div className="flex gap-4">
      <button className="bg-yellow-400 text-black rounded-3xl px-4 py-2 text-xl cursor-pointer hover:scale-105 transition">
        See Your Stats
      </button>
      <button className="bg-white text-green-500 rounded-3xl px-4 py-2 text-xl cursor-pointer hover:scale-105 transition"
        onClick={handleRestartGame}
      >
        Play Again
      </button>
    </div>
  )
}

export default ActionButtons;