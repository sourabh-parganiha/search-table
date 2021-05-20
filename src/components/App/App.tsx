import React from "react";

import { Header } from "../Header/Header";
import { TableWithSearch } from "../Table/Table";

import "./App.scss";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <TableWithSearch></TableWithSearch>
      </main>
    </div>
  );
};

export default App;
