import React, { createContext, useState, useMemo } from "react";

export const authContext = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useState({islogin: 0, admin: ""});

  const authValue = useMemo(
    () => ({
      auth,
      setAuth,
    }),
    [auth]
  );

  return (
    <authContext.Provider value={authValue}>
      {children}
    </authContext.Provider>
  );
}

export default AuthProvider;
