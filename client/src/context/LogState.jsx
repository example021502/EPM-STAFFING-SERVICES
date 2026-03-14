import React, { createContext, useEffect, useState } from "react";
export const log_state = createContext(null);

function LogState({ children }) {
  const [log, setLog] = useState(() => {
    const saved = sessionStorage.getItem("log_state");
    return saved === "true";
  });

  useEffect(() => {
    sessionStorage.setItem("log_state", log.toString());
  }, [log]);

  return (
    <log_state.Provider value={{ log, setLog }}>{children}</log_state.Provider>
  );
}

export default LogState;
