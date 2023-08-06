import Chart from "react-apexcharts";

interface OhlcChartProps {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  options?: ApexCharts.ApexOptions;
}

export default function OhlcChart({ ...props }: OhlcChartProps) {
  return (
    <Chart
      type="candlestick"
      {...props}
      // series={[{
      //     data: [{
      //         x: new Date(1538778600000),
      //         y: [6629.81, 6650.5, 6623.04, 6633.33]
      //       },
      //       {
      //         x: new Date(1538780400000),
      //         y: [6632.01, 6643.59, 6620, 6630.11]
      //       }]
      //     }]}
      // options={{
      //   chart: {
      //     type: 'candlestick',
      //   },
      //   title: {
      //     text: ""
      //   },
      //   xaxis: {
      //     type: 'datetime'
      //   },
      //   yaxis: {
      //     tooltip: {
      //       enabled: true
      //     }
      //   }
      // }}
    />
  );
}
