export const defaultStateItems = {
    items: [],
    readyItems: [],
}

const FETCH_ITEMS       = "FETCH_ITEMS"
const FETCH_READY_ITEMS       = "FETCH_READY_ITEMS"

export const movieReducer = (state = defaultStateItems, action) => {
    switch (action.type) {
        case "FETCH_ITEMS":
            return {
                ...state,
                items: action.payload // Если нужно полностью заменить массив
            };
        case "FETCH_READY_ITEMS":
            return {
                ...state,
                readyItems: action.payload // Если нужно полностью заменить массив
            };
        case "ADD_ITEM":
            return {
                ...state,
                items: [...state.items, action.payload]
            };
        case "REMOVE_MOVIES":
            return {
                ...state,
                movies: state.items.filter(movie => movie.id !== action.payload)
            };
        default:
            return state;
    }
};

export const addItemsAction    = (payload) => ({type: FETCH_ITEMS, payload})
export const addReadyItemsAction    = (payload) => ({type: FETCH_READY_ITEMS, payload})