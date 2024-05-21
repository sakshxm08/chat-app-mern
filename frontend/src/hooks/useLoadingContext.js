import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";

const useLoadingContext = () => {
  return useContext(LoadingContext);
};

export default useLoadingContext;
