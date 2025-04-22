export interface IsolateData {
  schemes: Scheme[];
  aliases: string[];
  allele_designations: AlleleDesignations;
  provenance: Provenance;
}

export interface Scheme {
  full_designations: string;
  description: string;
  loci_designated_count: number;
  fields: {
    ST: number;
    [key: string]: any;
  };
  allele_ids: string;
}

export interface AlleleDesignations {
  allele_ids: string;
  full_designations: string;
  designation_count: number;
}

export interface Provenance {
  region: string;
  curator: string;
  year: number;
  comments: string;
  continent: string;
  id: number;
  source: string;
  disease: string;
  datestamp: string;
  sender: string;
  date_entered: string;
  country: string;
  isolate: string;
  species: string;
}
