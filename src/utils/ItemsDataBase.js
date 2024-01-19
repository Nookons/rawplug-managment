import {getDatabase, ref, set} from "firebase/database";
import dayjs from "dayjs";
import {useSelector} from "react-redux";

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

export function writeUserItem({data, user}) {
    try {
        const db = getDatabase();
        const id = Date.now();
        const date = dayjs().toString();

        validateData(data);

        if (!user) {
            throw new Error('Not user')
        }

        const item = {
            id: id,
            createdDate: date,
            index: data ? data.index : null,
            quantity: data ? data.quantity : null,
            JM: 'SHT',
            Recipient: data ? data.ToDepartment : null,
            Sender: data ? data.FromDepartment : null,
            Created: user ? user.email : null,
            PalletReceipt: id + (user ? '-' + user.uid.slice(0, 4) : "-9999"),
            status: data ? data.status : null,
            description: data ? data.description : null
        }

        set(ref(db, 'items/' + id + '/'), {
            ...item
        });
        return [true, item]
    } catch (e) {
        console.log(e);
        return false
    }
}