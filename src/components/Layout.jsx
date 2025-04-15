import NavBar from './NavBar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-hidden">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <NavBar />
      </header>

      {/* Scrollable Main Area */}
      <main className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Footer (after content scroll) */}
      <Footer />
    </div>
  );
};

export default Layout;