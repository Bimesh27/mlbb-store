"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode; 
      localStorage.setItem("isDarkMode", JSON.stringify(newMode)); 
      return newMode; 
    });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("isDarkMode"); 
    if (savedTheme !== null) {
      setIsDarkMode(JSON.parse(savedTheme)); 
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark"); 
    } else {
      document.documentElement.classList.remove("dark"); 
    }
  }, [isDarkMode]);

  return (
    <Button
      size="icon"
      onClick={toggleTheme}
      variant="secondary"
      className="rounded-full"
    >
      {isDarkMode ? (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
