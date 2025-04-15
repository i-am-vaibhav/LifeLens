import ModuleCard from './ModuleCard';

const Home = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-semibold text-center mb-8">Welcome to LifeLens</h2>

      {/* Flex Container for Cards */}
      <div className="flex flex-wrap justify-center">
        
        {/* Card 1: Species Catalog */}
        <ModuleCard
          title="Endangered Species"
          description="Learn about species that are on the brink of extinction and what is being done to protect them."
          route="/endangered-species"
          backdropColor="bg-red-600"
        />

        {/* Microbial Strains Card */}
        <ModuleCard 
          title="Microbial Strains"
          description="Discover the fascinating world of microbes and their crucial role in the ecosystem."
          route="/microbial-strains"
          backdropColor="bg-blue-600"
        />

        {/* Species Catalog Card */}
        <ModuleCard 
          title="Species Catalog"
          description="Explore our comprehensive catalog of diverse species from around the globe."
          route="/species-catalog"
          backdropColor="bg-green-600"
        />

      </div>
    </div>
  );
};

export default Home;
