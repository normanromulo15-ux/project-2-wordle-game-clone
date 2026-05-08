function StatsDisplay(props) {
  const { userStats, handleRedirectToHome } = props;

  return (
    <div className="fixed h-dvh w-dvw z-100 bg-[#0d0d0d] opacity-100 flex items-center justify-center inset-0">
      <div className="flex flex-col items-center justify-evenly text-white bg-[rgb(245,245,245)] p-6 w-6/7 h-1/3 font-bold rounded-4xl xl:w-11/20 xl:h-1/2">
        <div className="flex gap-1">
          {userStats.map((e, i) => (
            <div key={e.id} className="text-black text-lg">
              {e.score}
            </div>
          ))}
        </div>
        <button
          type="button"
          className="text-white bg-blue-900 px-4 py-2 cursor-pointer rounded-3xl"
          onClick={handleRedirectToHome}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default StatsDisplay;
