import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Box, Heading } from "@chakra-ui/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ObservationTrends: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.inaturalist.org/v1/observations",
          {
            params: {
              verifiable: true,
              quality_grade: "research",
              per_page: 200,
              order_by: "observed_on",
              order: "desc",
              csi: "EN",
            },
          }
        );

        const observations = response.data.results;

        const monthlyCounts = Array(12).fill(0);

        observations.forEach((obs: any) => {
          if (obs.observed_on) {
            const month = new Date(obs.observed_on).getMonth();
            monthlyCounts[month]++;
          }
        });

        setChartData({
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Observations per Month",
              data: monthlyCounts,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: (context: any) => {
                const ctx = context.chart.ctx;
                const chartArea = context.chart.chartArea;
                if (!chartArea) return "rgba(75,192,192,0.2)";
                const gradient = ctx.createLinearGradient(
                  0,
                  chartArea.bottom,
                  0,
                  chartArea.top
                );
                gradient.addColorStop(0, "rgba(75,192,192,0.2)");
                gradient.addColorStop(1, "rgba(75,192,192,0)");
                return gradient;
              },
              fill: true,
              tension: 0.3,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching observation data:", error);
      }
    };

    fetchData();
  }, []);

  const options: ChartOptions<"line"> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Observation Trends',
      },
    },
  };

  return (
    <Box
      p={6}
      borderRadius="xl"
      height="100%"
      minH="400px"
    >
      <Box position="relative" width="100%" height="400px">
        <Line data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default ObservationTrends;