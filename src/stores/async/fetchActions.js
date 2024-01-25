import {child, get, getDatabase, ref} from "firebase/database";
import {addUsersAction} from "../actionsReducer";

export const fetchUsersActions = () => {

    return async function (dispatch) {
        try {
            const dbRef = ref(getDatabase());
            const snapshot = await get(child(dbRef, `userAction/`));

            if (snapshot.exists()) {
                const actionsArray = Object.values(snapshot.val());
                dispatch(addUsersAction(actionsArray));
                return actionsArray
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        dispatch(addUsersAction([]))
    }
};