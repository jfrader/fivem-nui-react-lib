import { useContext } from "react";
import { NuiServiceContext } from "../context/NuiServiceContext";
export var useNuiRequest = function () {
    return useContext(NuiServiceContext);
};
