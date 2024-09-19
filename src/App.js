import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Repositories from "./components/Repositories";
import RepositoryDetails from "./components/RepositoryDetails";
import Welcome from "./components/Welcome";

export const AppContext = createContext();

function App() {
  const [developerToken, setDeveloperToken] = useState("");

  return (
    <AppContext.Provider value={{ developerToken, setDeveloperToken }}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/repositories" element={<Repositories />} />
            <Route
              path="/repositories/:repo_name"
              element={<RepositoryDetails />}
            />
          </Routes>
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;
