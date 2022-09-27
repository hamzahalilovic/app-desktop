import { useContext, createContext } from "react";

export const AppContext = createContext(null);

export function useAppContext() {
  return useContext(AppContext);
}

export const AccountContext = createContext(null);

export function useAccountContext() {
  return useContext(AccountContext);
}

export const AppStudioContext = createContext(null);

export function useAppStudioContext() {
  return useContext(AppStudioContext);
}
