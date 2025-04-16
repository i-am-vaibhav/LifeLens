import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Box } from '@chakra-ui/react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface SpeciesCount {
  count: number;
  taxon: {
    id: number;
    name: string;
    preferred_common_name?: string;
  };
}

interface TopSpeciesChartProps {
  onBarClick: (taxonId: number) => void;
}

const TopSpeciesChart: React.FC<TopSpeciesChartProps> = ({ onBarClick }) => {
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchSpeciesCounts = async () => {
      try {
        const response = await axios.get('https://api.inaturalist.org/v1/observations/species_counts', {
          params: {
            per_page: 10,
            order_by: 'count',
            order: 'desc',
            verifiable: true,
            quality_grade: 'research',
          },
        });

        const speciesCounts: SpeciesCount[] = response.data.results;

        const labels = speciesCounts.map((item) => item.taxon.preferred_common_name || item.taxon.name);
        const data = speciesCounts.map((item) => item.count);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Number of Observations',
              data,
              backgroundColor: 'rgba(75,192,192,0.6)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching species counts:', error);
      }
    };

    fetchSpeciesCounts();
  }, []);

  const options: ChartOptions<'bar'> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top Observed Endangered Species',
      },
    },
    indexAxis: 'y',
    interaction: {
      mode: 'nearest',
      axis: 'y',
      intersect: true,
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const taxonId = chartData.datasets[0].data[index];
        if (typeof taxonId === 'number') {
          onBarClick(taxonId);
        }
      }
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
        <Bar data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default TopSpeciesChart;