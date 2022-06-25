import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const BarChart = ({ allReports }) => {
  const months = [];

  let amountPerMonth = {
    Enero: 0,
    Febrero: 0,
    Marzo: 0,
    Abril: 0,
    Mayo: 0,
    Junio: 0,
    Julio: 0,
    Agosto: 0,
    Septiembre: 0,
    Octubre: 0,
    Noviembre: 0,
    Diciembre: 0,
  };

  const amountPerMonthArr = [];

  allReports.forEach((report) => {
    const month = new Date(report.creationDate).getMonth();

    switch (month) {
      case 0:
        months.push("Enero");
        break;
      case 1:
        months.push("Febrero");
        break;
      case 2:
        months.push("Marzo");
        break;
      case 3:
        months.push("Abril");
        break;
      case 4:
        months.push("Mayo");
        break;
      case 5:
        months.push("Junio");
        break;
      case 6:
        months.push("Julio");
        break;
      case 7:
        months.push("Agosto");
        break;
      case 8:
        months.push("Septiembre");
        break;
      case 9:
        months.push("Octubre");
        break;
      case 10:
        months.push("Noviembre");
        break;
      case 11:
        months.push("Diciembre");
        break;
    }
  });

  const monthLabels = [...new Set(months)];

  months.filter((month) => {
    month === amountPerMonth[month]++;
  });

  monthLabels.forEach((label) => {
    amountPerMonthArr.push(amountPerMonth[label]);
  });

  const data = {
    labels: monthLabels,
    datasets: [
      {
        data: amountPerMonthArr,
        backgroundColor: "rgba(32, 214, 155, 1)",
        barThickness: 10,
      },
    ],
  };

  const options = {
    plugins: {
      legend: false,
      title: {
        text: "Reportes por mes",
        display: true,
        font: {
          size: 18,
        },
      },
    },
    scales: {
      xAxis: {
        display: true,
      },
      yAxis: {
        max: 10,
      },
    },
    elements: {
      bar: {
        barPercentage: 0.3,
        categoryPercentage: 1,
      },
    },
  };

  return <Bar data={data} height={70} width={100} options={options} />;
};

export default BarChart;
