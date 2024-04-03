import React, { useState } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { SchedulePage } from "./pages/Schedule";
import { SearchBar } from "./components/SearchBar";
import { SearchContext } from "./context/searchContext";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="flex flex-col h-screen px-4 mobile:px-7">
      <SearchContext.Provider value={{ searchTerm, handleSearch }}>
        <Router>
          <SearchBar />
          <Routes>
            <Route path={"/"} element={<SchedulePage />} />
          </Routes>
        </Router>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
