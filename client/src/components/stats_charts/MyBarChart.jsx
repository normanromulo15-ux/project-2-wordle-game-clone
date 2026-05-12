import { BarChart, Bar, XAxis, YAxis } from "recharts";

function MyBarChart(props) {
  const { userStats, averageScore } = props;

  const sum = averageScore.map((e) => e.score).reduce((a, b) => a + b, 0);
  const n = averageScore.length;
  const average = `${(sum / n).toFixed(1)}`;

  return (
    <section className="flex flex-col gap-2 w-full items-center mb-8 md:m-0">
      <h2 className="text-base text-black text-center">
        Average Successful Attempt: {average}
      </h2>
      <BarChart
        style={{
          width: "100%",
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
    </section>
  );
}

export default MyBarChart;
