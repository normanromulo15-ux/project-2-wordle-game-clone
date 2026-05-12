import { PieChart, Pie, Sector } from "recharts";

function MyPieChart(props) {
  const { winRate } = props;

  const COLORS = ["#00b300", "#cc0000"];
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    if (cx == null || cy == null || innerRadius == null || outerRadius == null)
      return null;

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const ncx = Number(cx);
    const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const ncy = Number(cy);
    const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > ncx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${((percent ?? 1) * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomPie = (props) => {
    return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
  };

  return (
    <section className="flex flex-col gap-2 w-full items-center">
      <h2 className="text-base text-[#00b300] text-center">Win Rate</h2>
      <PieChart
        style={{
          width: "100%",
          maxWidth: "20rem",
          maxHeight: "12rem",
          aspectRatio: 1,
        }}
        responsive
      >
        <Pie
          data={winRate}
          dataKey="record"
          isAnimationActive={true}
          labelLine={false}
          label={renderCustomizedLabel}
          shape={CustomPie}
        />
      </PieChart>
    </section>
  );
}

export default MyPieChart;
