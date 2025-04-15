import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `hover:text-blue-600 ${
      isActive(path) ? "text-blue-600 font-semibold underline" : "text-gray-700"
    }`;

  return (
    <nav className="bg-white/90 backdrop-blur shadow-md w-full sticky top-0 z-50">
      <div className="w-full px-2">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600">
            🐾 LifeLens
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 font-medium">
            <Link to="/" className={linkClass("/")}>Home</Link>
            <Link to="/about" className={linkClass("/about")}>About</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded w-full"> 
              {isOpen ? <p>X</p> : <p>Menu</p>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 pt-2 pb-4 space-y-2 shadow-md">
          <Link to="/" onClick={toggleMenu} className={linkClass("/")}>Home</Link>
          <Link to="/about" onClick={toggleMenu} className={linkClass("/about")}>About</Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
