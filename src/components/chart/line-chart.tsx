import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartData } from "chart.js";
import { ChartProps, Line } from "react-chartjs-2";

interface LineChartProps extends ChartProps {
  data: ChartData<"line", any, any>;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({ ...props }: LineChartProps) {
  return <Line {...props} />;
}
