import { Link } from "react-router-dom";

const ModuleCard = ({ title, description, route, backdropColor }) => {
  return (
    <Link 
      to={route} 
      className={`
        block
        w-[400px] sm:w-1/2 lg:w-1/3
        rounded-lg
        border border-gray-300
        shadow-lg
        p-8
        m-4
        ${backdropColor}
        transform transition duration-300 hover:scale-105
      `}
    >
      <h3 className="text-2xl font-semibold mb-4 text-white">{title}</h3>
      <p className="text-white w-1 whitespace-normal break-words">{description}</p>
    </Link>
  );
};

export default ModuleCard;
