import React, { createContext, useState } from "react";

export const DataContext = createContext();

const DataProvider = (props) => {
  const [account, setAccount] = useState({ name: "", email: "" });

  return (
    <DataContext.Provider value={{ account, setAccount }}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;