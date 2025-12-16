import { useEffect, useState } from "react";
import { Activity, Moon, Sun } from "lucide-react";
import logo from '@/assets/dark.png';

const TopNav = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="bg-app-primary shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Left Logo */}
        <div className="bg-app-primary py-3">
               <div className="flex items-center justify-center overflow-hidden">
                  <img
                    src={logo}
                    alt="Primex Logo"
                    className="w-50 h-auto object-contain"
                  />
                </div>
            </div>

        {/* Right Profile & Theme Toggle */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition"
            aria-label="Toggle Theme"
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          <span className="font-semibold text-white hidden sm:block">
            John Doe
          </span>

          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold">
            JD
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
