import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './theme/theme-toggle';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [darkMode, setDarkMode] = useState(() => {
  //   const savedTheme = localStorage.getItem('theme');
  //   return savedTheme === 'dark';
  // });

  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  //   localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  // }, [darkMode]);

  // const toggleDarkMode = () => {
  //   setDarkMode((prev) => !prev);
  // };

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  

  return (
    <nav className="bg-white dark:bg-gray-800   shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold dark:text-white">MySite</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-4">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
            </div>
      <div className="hidden md:flex items-center gap-4 border-2 ">
  {/* <button
    onClick={toggleDarkMode}
    className="p-2 rounded-md focus:outline-none"
    aria-label="Toggle dark mode"
  >
    {darkMode ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm..."
          clipRule="evenodd"
        />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-white" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.293 13.293A8 8 0 016.707 2.707..." />
      </svg>
    )}
  </button> */}

  <ThemeToggle />

 <Link
    to="/register"
    className=" pt-2 pb-2 pl-5 pr-5  bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 dark:bg-transparent dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/20 transition duration-200 text-sm font-medium shadow"
  >
    sign-up
  </Link>

  <Link
    to="/login"
    className=" pt-2 pb-2 pl-5 pr-5  bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 dark:bg-transparent dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/20 transition duration-200 text-sm font-medium shadow"
  >
    Login
  </Link>
</div>


          {/* Mobile menu and dark mode toggle */}
          <div className="md:hidden flex items-center gap-2">
            {/* <button
              onClick={toggleDarkMode}
              className="p-2 mr-2 rounded-md focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button> */}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-white dark:bg-gray-800 transition-colors duration-300">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-gray-800 dark:text-white px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
