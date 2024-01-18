import {addCommentsAction, addItemsAction, addMoviesAction} from "../itemsReducer";
import {child, get, getDatabase, ref} from "firebase/database";

export const fetchItems = () => {

    return async function (dispatch) {
        try {
            const dbRef = ref(getDatabase());

            // Fetch comments
            const snapshot = await get(child(dbRef, `items/`));

            if (snapshot.exists()) {
                // Convert object to array
                const commentsArray = Object.values(snapshot.val());
                dispatch(addItemsAction(commentsArray));
                return commentsArray
            } else {
                console.log("No comments available");
            }

            // Uncomment this if you want to fetch movies
            // const response = await axios.get('your_movie_api_url');
            // dispatch(addMoviesAction(response.data.results));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        dispatch(addItemsAction([]))
    }
};