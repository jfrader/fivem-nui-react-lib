import { useContext } from "react";
import { NuiServiceContext } from "../context/NuiServiceContext";
export var useNuiRequest = function () {
    var context = useContext(NuiServiceContext);
    if (!context.resource) {
        throw new Error("fivem-nui-react-lib: useNuiRequest must be used inside NuiServiceProvider passing the resource prop");
    }
    return context;
};
