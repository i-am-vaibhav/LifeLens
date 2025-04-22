import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import ModularCard from "../components/ModularCard";
import picture from "../assets/speciesCatalog.jpeg";
import animalsListTemp from "../assets/animalList.json";

interface Species {
  name: string;
  description: string;
  image: string;
  url: string;
}

const itemsPerPage = 10;

const animalsList = animalsListTemp.animalsList;

function SpeciesCatalogue() {
  const [currentPage, setCurrentPage] = useState(1);
  const [speciesData, setSpeciesData] = useState<Species[]>([]);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(animalsList.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = speciesData.slice(indexOfFirstItem, indexOfLastItem);

  const baseURL = "https://api.inaturalist.org/v1/taxa?q=";

  useEffect(() => {
    setLoading(true);
    setSpeciesData([]); // Clear old data

    const fetchData = async () => {
      const requests = [];

      for (
        let i = indexOfFirstItem;
        i < indexOfLastItem && i < animalsList.length;
        i++
      ) {
        const animal = animalsList[i];
        const request = axios
          .get(`${baseURL}${animal}`)
          .then((response) => {
            const species = response.data?.results?.[0];
            console.log(species);

            if (species) {
              const taxonName = species.iconic_taxon_name
                ? `Taxon Name: ${species.iconic_taxon_name}`
                : "";

              const completeSpeciesCount =
                species.complete_species_count !== undefined &&
                species.complete_species_count !== null
                  ? `Complete Species Count: ${species.complete_species_count}`
                  : "";

              const completeRank = species.complete_rank
                ? `Complete Rank: ${species.complete_rank}`
                : "";

              const isActive =
                typeof species.is_active === "boolean"
                  ? `Active: ${species.is_active ? "Yes" : "No"}`
                  : "";

              const descriptionParts = [
                species.wikipedia_summary,
                taxonName,
                completeSpeciesCount,
                completeRank,
                isActive,
              ];

              const desc = descriptionParts
                .filter((part) => part && part.trim() !== "")
                .join("\n");

              return {
                name: species.name,
                description:
                  species.wikipedia_summary ||
                  desc ||
                  "No description available.",
                image: species.default_photo?.medium_url || picture,
                url: species.wikipedia_url || "#",
              };
            }

            return null;
          })
          .catch((error) => {
            console.error(`Error fetching data for ${animal}:`, error);
            return null;
          });

        requests.push(request);
      }

      const results = await Promise.all(requests);
      const filtered = results.filter((item) => item !== null) as Species[];
      setSpeciesData(filtered);
      setLoading(false);
    };

    fetchData();
  }, [currentPage]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="container mt-5">
        <h2 className="mb-4">Animal List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : speciesData.length === 0 ? (
          <p>No data available.</p>
        ) : (
          <div className="row">
            {speciesData.map((item, idx) => (
              <div className="col-12 mb-4" key={idx}>
                <ModularCard
                  imageSrc={item.image}
                  title={item.name}
                  description={item.description}
                  href={item.url}
                />
              </div>
            ))}
          </div>
        )}

        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
              >
                Previous
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, idx) => (
              <li
                key={idx}
                className={`page-item ${
                  currentPage === idx + 1 ? "active" : ""
                }`}
              >
                <button onClick={() => paginate(idx + 1)} className="page-link">
                  {idx + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === totalPages && "disabled"
              }`}
            >
              <button
                className="page-link"
                onClick={() =>
                  currentPage < totalPages && paginate(currentPage + 1)
                }
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default SpeciesCatalogue;
