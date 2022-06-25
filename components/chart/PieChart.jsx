import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ allUsers }) => {
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

  allUsers.forEach((user) => {
    const month = new Date(user.creationDate).getMonth();

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
        label: "# of Votes",
        data: amountPerMonthArr,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
};

export default PieChart;
