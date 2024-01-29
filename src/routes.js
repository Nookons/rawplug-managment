import {
    HOME_ROUTE,
    SIGN_IN_ROUTE,
    SIGN_UP_ROUTE,
    PROFILE_ROUTE,
    ADD_ITEM_ROUTE,
    ITEM_ROUTE,
    DATA_PAGE_ROUTE, ADD_PALLET_ROUTE, READY_ITEM_ROUTE
} from "./utils/consts";
import Home from "./pages/Home/Home";
import SignIn from "./pages/Sign/SignIn/SignIn";
import SignUp from "./pages/Sign/SignUp/SignUp";
import Profile from "./pages/User/Profile";
import AddItem from "./pages/Item/AddItem/AddItem";
import ItemCard from "./pages/Home/ItemCard";
import ItemPage from "./pages/Item/ItemPage";
import DataPage from "./pages/DataPage/DataPage";
import AddPallet from "./pages/Item/AddPallet/AddPallet";
import ReadyItemPage from "./pages/Item/ReadyItemPage";

// routes for users
export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home,
        label: 'Home',
    },
]

export const privateRoutes = [
    {
        path: SIGN_IN_ROUTE,
        Component: SignIn,
        label: 'FilmPrivate',
    },
    {
        path: SIGN_UP_ROUTE,
        Component: SignUp,
        label: 'FilmPrivate',
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile,
        label: 'FilmPrivate',
    },
    {
        path: ADD_ITEM_ROUTE,
        Component: AddItem,
        label: 'FilmPrivate',
    },
    {
        path: ITEM_ROUTE,
        Component: ItemPage,
        label: 'FilmPrivate',
    },
    {
        path: READY_ITEM_ROUTE,
        Component: ReadyItemPage,
        label: 'FilmPrivate',
    },
    {
        path: ADD_PALLET_ROUTE,
        Component: AddPallet,
        label: 'FilmPrivate',
    },
    {
        path: DATA_PAGE_ROUTE,
        Component: DataPage,
        label: 'FilmPrivate',
    },
]



