import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {favoriteReducer} from "./favoriteReducer";
import {movieReducer} from "./itemsReducer";
import {userReducer} from "./userReducer";
import {actionReducer} from "./actionsReducer";

const rootReducer = combineReducers({
    items: movieReducer,
    favorite: favoriteReducer,
    user: userReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))