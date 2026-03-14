import React, { createContext, useEffect, useState } from "react";

export const grid_list_context = createContext(null);
function GridListViewContext({ children }) {
  const [view, setView] = useState(() => {
    return sessionStorage.getItem("view_type") || "apps";
  });

  useEffect(() => {
    sessionStorage.setItem("view_type", view);
  }, [view]);

  return (
    <grid_list_context.Provider value={{ setView, view }}>
      {children}
    </grid_list_context.Provider>
  );
}

export default GridListViewContext;
