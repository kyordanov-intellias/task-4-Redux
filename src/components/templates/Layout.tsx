import React from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Film } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import Button from "../atoms/Button";
import "./Layout.css"; // Import the CSS file

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`layout ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <header className="header">
        <nav className="nav">
          <Link to="/" className="logo">
            <Film size={24} />
            <span>MovieDB</span>
          </Link>
          <div className="nav-links">
            <Link to="/favorites" className="favorites-link">
              Favorites
            </Link>
            <Button onClick={toggleTheme} variant="secondary">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>
        </nav>
      </header>
      <main className="main">{children}</main>
    </div>
  );
};

export default Layout;
