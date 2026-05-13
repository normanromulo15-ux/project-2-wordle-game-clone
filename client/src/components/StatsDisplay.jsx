import MyBarChart from "./stats_charts/MyBarChart.jsx";
import MyPieChart from "./stats_charts/MyPieChart.jsx";

function StatsDisplay(props) {
  const { userStats, winRate, averageScore, handleRedirectToHome } = props;

  return (
    <div className="fixed h-dvh w-dvw z-100 bg-[#0d0d0d] opacity-100 flex items-center justify-center inset-0">
      <div className="flex flex-col items-center justify-around text-white bg-[rgb(245,245,245)] p-2 w-6/7 h-9/10 font-bold rounded-4xl md:h-3/4 xl:w-11/20">
        <div className="flex flex-col justify-center items-center w-full md:flex-row">
          <MyBarChart userStats={userStats} averageScore={averageScore} />
          <MyPieChart winRate={winRate} />
        </div>
        <button
          type="button"
          className="text-white bg-blue-900 px-4 py-2 cursor-pointer rounded-3xl transition hover:scale-105"
          onClick={handleRedirectToHome}
        >
          Back To Home
        </button>
      </div>
    </div>
  );
}

export default StatsDisplay;
