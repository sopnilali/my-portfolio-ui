// components/ThemeToggle.tsx
"use client"; // Next.js-এ ক্লায়েন্ট কম্পোনেন্ট হিসেবে চালু রাখুন

import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  // থিম টগল করার ফাংশন
  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-muted"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <SunIcon className="w-5 h-5 text-yellow-400" /> // ডার্ক মোডে সান আইকন
      ) : (
        <MoonIcon className="w-5 h-5 text-foreground" /> // লাইট মোডে মুন আইকন
      )}
    </button>
  );
}