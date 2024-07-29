import React, { createContext, Context } from "react";
interface AuthContextValue {
  user: any; 
  isAuthenticated: any;
  setUser: (user: any) => void; 
  setIsAuthenticated: (isAuthenticated: any) => void;
}

const AuthContext: Context<AuthContextValue> = createContext<AuthContextValue>({} as AuthContextValue);

export default AuthContext;
