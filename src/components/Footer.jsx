const Footer = () => {
  return (
    <footer className="bg-white border-t py-4">
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} LifeLens — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;