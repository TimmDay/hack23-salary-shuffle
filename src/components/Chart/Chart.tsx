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

export const options = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
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

const labels = [
  "Medicare Levy",
  "Super Guarantee",
  "Salary Sacrifice",
  "0 - 18200",
  "18201 - 45000",
  "45001 - 120000",
  "120001 = 180000",
  "180001+",
];

const bucketIncomes = [16000, 20000, 20000, 26800, 75000, 60000, 60000, 60000];

type Props = {
  bucketIncomes: number[]; //TODO: length 8
  bucketTaxes: number[];
};

export function Chart({ bucketIncomes, bucketTaxes }: Props) {
  const data = {
    labels,
    datasets: [
      {
        label: "post-tax income",
        data: labels.map((_, index) => bucketIncomes[index]), //faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "tax",
        data: labels.map((_, index) => bucketTaxes[index]), //faker.datatype.number({ min: 0, max: 1000 })),
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
