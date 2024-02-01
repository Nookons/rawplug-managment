import {getDatabase, ref, set} from "firebase/database";
import {getCurrentDate} from "../getDate";
import {getCurrentUSer} from "../getUser";

export function writeUserPallet({data, user}) {
    try {
        const db        = getDatabase();
        const id        = Date.now();
        const date      = getCurrentDate();


        if (!user.uid) {
            throw new Error('Not user')
        }

        const item = {
            id: id,
            createdDate: date,
            lastChange: date,
            index: data ? data.index : null,
            quantity: data ? Number(data.quantity) : null,
            JM: data ? data.JM : null,
            Created: user ? getCurrentUSer(user) : null,
            userUid: user ? user.uid : null,
            PalletReceipt: id + (user ? '-' + user.uid.slice(0, 4) : "-9999"),
            status: data ? data.status : null,
            description: data ? data.description : null
        }

        /*addUserAction({item, user})*/

        set(ref(db, 'readyPallets/' + id + '/'), {
            ...item
        });
        return [true, item]
    } catch (e) {
        console.log(e);
        return false
    }
}