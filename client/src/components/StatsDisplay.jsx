import { BarChart, Bar, XAxis, YAxis, PieChart, Pie } from "recharts";

function StatsDisplay(props) {
  const { userStats, winRate, handleRedirectToHome } = props;

  return (
    <div className="fixed h-dvh w-dvw z-100 bg-[#0d0d0d] opacity-100 flex items-center justify-center inset-0">
      <div className="flex flex-col items-center justify-evenly text-white bg-[rgb(245,245,245)] p-2 w-6/7 h-3/4 font-bold rounded-4xl xl:w-11/20">
        <div className="flex gap-2 justify-evenly w-full">
          <BarChart
            style={{
              width: "40%",
              maxWidth: "20rem",
              maxHeight: "12rem",
              aspectRatio: 1,
            }}
            responsive
            data={userStats}
          >
            <Bar dataKey="frequency" fill="#3503fc" />
            <XAxis
              dataKey="score"
              label={{
                position: "center",
                value: "Attempt",
                dy: 10,
              }}
            />
            <YAxis
              label={{
                position: "insideTopLeft",
                angle: -90,
                dy: 40,
              }}
            />
          </BarChart>
          <p className="text-base text-black">
            This area is for the pie chart.
          </p>
        </div>

        <button
          type="button"
          className="text-white bg-blue-900 px-4 py-2 cursor-pointer rounded-3xl transition hover:scale-105"
          onClick={handleRedirectToHome}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default StatsDisplay;
