import { useContext } from "react";
import { NuiServiceContext } from "../context/NuiServiceContext";

export const useNuiRequest = () => {
  return useContext(NuiServiceContext);
};
