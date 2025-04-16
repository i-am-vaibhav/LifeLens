import axios from 'axios';

const BASE_URL = 'https://api.gbif.org/v1';

export interface Occurrence {
  key: number;
  scientificName: string;
  media?: Array<{
    identifier: string;
    type: string;
    format: string;
    title?: string;
  }>;
  [key: string]: any;
}

export const fetchOccurrencesByThreatStatus = async (
  threatStatuses: string,
  limit: number = 10
): Promise<Occurrence[]> => {
  try {
    const params = new URLSearchParams();
    params.append('threat', threatStatuses);
    params.append('limit', limit.toString());

    const response = await axios.get(`${BASE_URL}/occurrence/search?${params.toString()}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching occurrences:', error);
    return [];
  }
};
