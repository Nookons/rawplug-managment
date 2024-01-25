export const defaultActionsState = {
    usersActions: [],
}

const FETCH_ACTIONS       = "FETCH_ACTIONS"

export const actionReducer = (state = defaultActionsState, action) => {
    switch (action.type) {
        case "FETCH_ACTIONS":
            return {
                ...state,
                usersActions: action.payload // Если нужно полностью заменить массив
            };
        case "ADD_ITEM":
            return {
                ...state,
                usersActions: [...state.usersActions, ...action.payload]
            };
        case "REMOVE_MOVIES":
            return {
                ...state,
                usersActions: state.usersActions.filter(userAction => userAction.id !== action.payload)
            };
        default:
            return state;
    }
};

export const addUsersAction    = (payload) => ({type: FETCH_ACTIONS, payload})