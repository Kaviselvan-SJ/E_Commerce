import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ToggleButton } from "./ToggleButton";
import { cn } from "@/lib/utils";
const navLinks = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Products", to: "/products" },
  { name: "Contact", to: "/contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-md shadow-xs"
          : "py-3"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link
          className="text-xl font-bold text-primary flex items-center"
          to="/"
        >
          <span className="text-glow text-foreground">PON</span> Traders
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "text-foreground/80 hover:text-primary transition-colors duration-300",
                location.pathname === link.to && "text-primary"
              )}
            >
              {link.name}
            </Link>
          ))}
          <ToggleButton />
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center md:hidden gap-3">
          <ToggleButton />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-foreground z-50"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-30 flex flex-col items-center justify-center transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-8 text-xl">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
