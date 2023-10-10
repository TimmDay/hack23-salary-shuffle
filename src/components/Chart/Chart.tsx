import styles from "./Chart.module.css";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  "Medicare Levy (2%)",
  "Super Guarantee (15%)",
  "Salary Sacrifice (15%)",
  "0 - 18200 (0%)",
  "18201 - 45000 (19%)",
  "45001 - 120000 (32.5%)",
  "120001 - 180000 (37%)",
  "180001+ (45%)",
];
const rates = [2, 15, 15, 0, 19, 32.5, 37, 45];

type Props = {
  bucketIncomes: number[]; //TODO: length 8
  bucketTaxes: number[];
  yAxisMax: number;
};

export function Chart({ bucketIncomes, bucketTaxes, yAxisMax }: Props) {
  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        max: yAxisMax,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Tax Buckets",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "post-tax income",
        data: labels.map((_, index) => bucketIncomes[index]),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "tax",
        data: labels.map((_, index) => bucketTaxes[index]),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className={styles.wrapper}>
      <Bar options={options} data={data}></Bar>
    </div>
  );
}
