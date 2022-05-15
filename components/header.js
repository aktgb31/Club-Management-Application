import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

export default function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route);
    return routeName;
}