import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ allReports }) => {
  const types = [];

  let amountPerType = {
    Bache: 0,
    "Cableado en el suelo": 0,
    "Espacio ilegalmente ocupado": 0,
  };

  let amountPerTypeArr = [];

  allReports.forEach((report) => {
    types.push(report.type);
  });

  const typeLabels = [...new Set(types)];

  types.filter((type) => {
    type === amountPerType[type]++;
  });

  typeLabels.forEach((label) => {
    amountPerTypeArr.push(amountPerType[label]);
  });

  const data = {
    labels: typeLabels,
    datasets: [
      {
        label: "Reportes por tipo",
        data: amountPerTypeArr,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={data} />;
};

export default DoughnutChart;
