import React, { createContext, useState, useMemo } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ islogin: 0, admin: "" });

  const authValue = useMemo(
    () => ({
      auth,
      setAuth,
    }),
    [auth]
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
