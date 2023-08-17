import { useContext } from "react";
import { GeneralContext } from "../stores/general";

export const useGeneral = () => useContext(GeneralContext);
