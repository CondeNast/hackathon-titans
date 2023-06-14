import { Bar } from "react-chartjs-2";
export const BarChart = ({ chartData, label }) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>{label}</h2>
      <Bar
        data={chartData}
        options={{
          scales: {
            y: {
              text: "dd",
              ticks: {
                // Include a dollar sign in the ticks
                callback: function (value, index, ticks) {
                  return value + "%";
                },
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Click Rate",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};
