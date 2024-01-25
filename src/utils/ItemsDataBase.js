import {getDatabase, ref, set, remove, update} from "firebase/database";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import {getCurrentDate} from "./getDate";
import {getCurrentUSer} from "./getUser";
import addUserAction from "./addAction";

const validateData = (data) => {
    const validateLength = (value, field, minLength) => {
        if (value.length < minLength) {
            throw new Error(`Invalid ${field}`);
        }
    };

    validateLength(data.index, 'index', 1);
    validateLength(data.FromDepartment, 'FromDepartment', 1);

    if (data.quantity < 10) {
        throw new Error('Invalid quantity: 10 or more required.');
    }
};

export function deleteItem (id) {
    return new Promise((resolve, reject) => {
        const db = getDatabase();
        const itemRef = ref(db, 'items/' + id);

        remove(itemRef)
            .then(() => {
                resolve(true);
            })
            .catch((error) => {
                reject(false);
            });
    });
}
export function editItem (id) {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            const date = getCurrentDate();

            const itemRef = ref(db, 'items/' + id);

            const fieldPath = 'lastChange';

            const updateData = {
                [fieldPath]: date,
            };

            // Use the update function to update only the 'lastChange' field
            update(itemRef, updateData)
                .then(() => {
                    console.log('Item successfully edited');
                    resolve(date);
                })
                .catch((error) => {
                    console.error('Error editing item:', error);
                    reject('Error editing item: ' + error.message);
                });
        } catch (error) {
            console.error('Error in editItem:', error);
            reject('Error in editItem: ' + error.message);
        }
    });
}

export function writeUserItem({data, user}) {
    try {
        const db        = getDatabase();
        const id        = Date.now();
        const date      = getCurrentDate();

        validateData(data);

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
            Recipient: data ? data.ToDepartment : null,
            Sender: data ? data.FromDepartment : null,
            Created: user ? getCurrentUSer(user) : null,
            PalletReceipt: id + (user ? '-' + user.uid.slice(0, 4) : "-9999"),
            status: data ? data.status : null,
            description: data ? data.description : null
        }

        /*addUserAction({item, user})*/

        set(ref(db, 'items/' + id + '/'), {
            ...item
        });
        return [true, item]
    } catch (e) {
        console.log(e);
        return false
    }
}