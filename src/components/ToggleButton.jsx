import { Moon, Sun, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

export const ToggleButton = () => {
  const[isDarkMode,setIsDarkMode] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if(storedTheme == "dark"){
      setIsDarkMode(true)
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme","light");
      setIsDarkMode(false);
    }
  },[])

  const toggleTheme = () => {
    if(isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme","light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme","dark");
      setIsDarkMode(true);
    }
  }

  return (

    <div>
      <button
        className="p-2 rounded-full transition-colors duration-300 focus:outline-none "
        title="View Cart"
        onClick={() => {
          window.location.href = "/cart";
        }}
      >
        <ShoppingCart className="h-6 w-6 text-red-500 dark:text-red-500" />
      </button>

      <button 
        onClick ={toggleTheme}
        className={cn(
          "fixed max-sm:hidden top-3 right-5 z-50 p-2 rounded-full transition-colors duration-300",
          "focus:outlin-hidden"
        )}
      >
      {isDarkMode ? (
        <Sun className="h-6 w-6 text-yellow-300"/>
      ) : ( 
        <Moon className="h-6 w-6 text-blue-900"/>
      ) }
      </button>
    </div>
   
  );
};