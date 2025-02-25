import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Film, Plus } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import Button from "../atoms/Button/Button";
import "./Layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`layout ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <header className="header">
        <nav className="nav">
          <Link to="/" className="logo">
            <Film size={24} />
            <span>Intellias Movie Picker</span>
          </Link>
          <div className="nav-links">
            <Link to="/create-movie" className="favorites-link">
              <Plus size={24} />
            </Link>
            <Link to="/profile" className="favorites-link">
              Profile
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
