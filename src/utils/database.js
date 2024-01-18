import {ref, set} from "firebase/database";
import {database} from "../firebase";
import {child, push, update} from "firebase/database";
import dayjs from "dayjs";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "firebase/auth";

export const sendToDataBase = async ({comment, filmId}) => {
    try {
        await set(ref(database, `comments/${filmId}/${comment.id}`), {
            ...comment
        });
        return true;
    } catch (error) {
        console.error('Error adding comment to the database:', error);
        return false;
    }
}

export async function Unlikes({likes, element, id, commentId, uid}) {
    let tempArray = element.userLike.filter(e => e !== uid)
    const newLikesCountMinus = likes - 1;

    const updates = {
        [`/comments/${id}/${commentId}/likes`]: newLikesCountMinus,
        [`/comments/${id}/${commentId}/userLike`]: [...tempArray]
    };
    await update(ref(database), updates);

    return true
}

export async function updateLikesAtComments({likes, element, id, commentId, uid}) {
    const newLikesCountPlus = likes + 1;
    const newUserLikes = uid;

    const updates = {
        [`/comments/${id}/${commentId}/likes`]: newLikesCountPlus,
        [`/comments/${id}/${commentId}/userLike`]: element.userLike ? [...element.userLike, newUserLikes] : [newUserLikes]
    };

    await update(ref(database), updates);
    return true;
}

export async function addCommentChild({id, comment, temporaryComment, user, answerBody}) {

    const updates = {
        [`/comments/${id}/${comment.id}/child`]: comment.child ? [...comment.child, temporaryComment] : [temporaryComment]
    };

    await update(ref(database), updates);
    return true;
}


export async function mySignIn({nickName, password}) {
    const auth = getAuth();
    console.log(nickName);
    try {
        const userCredential = await signInWithEmailAndPassword(auth, nickName, password);
        const user = userCredential.user;
        return user;
    } catch (error) {
        const errorCode = error.code;
        console.log(errorCode);

        switch (errorCode) {
            case 'auth/invalid-email':
                throw new Error('email');
            case 'auth/missing-password':
                throw new Error('missing-password');
            case 'auth/invalid-credential':
                throw new Error('invalid-credential');
            default:
                throw new Error('unknown-error')
        }
    }
}

export async function mySignUp({email, password}) {
    const auth = getAuth();
    console.log(email);


    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            return true
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);

            switch (errorCode) {
                case 'auth/invalid-email':
                    throw new Error('email');
                case 'auth/missing-password':
                    throw new Error('missing-password');
                case 'auth/invalid-credential':
                    throw new Error('invalid-credential');
                default:
                    throw new Error('unknown-error')
            }
        });
}


export async function mySignOut() {
    const auth = getAuth();
    let status = false;

    await signOut(auth).then(() => {
        status = true
    }).catch((error) => {
        console.error(error);
        status = false
    });

    return status
}
