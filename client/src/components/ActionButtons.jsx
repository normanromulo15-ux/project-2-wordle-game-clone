function ActionButtons(props) {
  const { handleRestartGame, handleShowStats } = props;

  return (
    <div className="flex gap-4 md:gap-8">
      <button
        className="cursor-pointer hover:scale-105 transition bg-yellow-400 text-black rounded-3xl p-3 text-base md:text-lg md:p-4 md:rounded-4xl"
        onClick={handleShowStats}
      >
        See Your Stats
      </button>
      <button
        className="cursor-pointer hover:scale-105 transition bg-white text-green-500 rounded-3xl p-3 text-base md:text-lg md:p-4 md:rounded-4xl"
        onClick={handleRestartGame}
      >
        Play Again
      </button>
    </div>
  );
}

export default ActionButtons;
