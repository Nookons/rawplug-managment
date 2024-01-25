import {ref, set} from "firebase/database";
import {database} from "../firebase";

export default function addUserAction ({item, user}) {
    const id = item.id;
    const userId = user.uid;

    const tempElement = {
        Created: item.Created,
        actionDate: item.createdDate,
        actionId: item.id,
        actionItem: {...item}
    }

    set(ref(database, 'userAction/' + userId + '/' + id + '/'), {
        ...tempElement
    });
}