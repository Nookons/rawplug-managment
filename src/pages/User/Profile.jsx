import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import styles from './Profile.module.css'
import {useNavigate} from "react-router-dom";
import {HOME_ROUTE} from "../../utils/consts";

const Profile = () => {
    const user      = useSelector((state) => state.user.user)
    const navigate  = useNavigate();

    useEffect(() => {
        if (!user.uid) {
            navigate(HOME_ROUTE)
        }
    }, [user])

    return (
            user.uid
            ?
                <div className={styles.Settings} style={{padding: 14}}>
                    <h1>Page in progress...</h1>
                    <hr style={{width: '100%'}}/>
                    <h5>Email: <span>{user.email}</span></h5>
                    <h5>Email verified: {user.emailVerified === false ? <span>Nope  😢</span> : null}</h5>
                    <h5>Account created: <span>{user.metadata.creationTime}</span></h5>
                    <h5>Work position: <span>Forklift driver</span></h5>
                    <h5>Last signIn: <span>{user.metadata.lastSignInTime}</span></h5>
                </div>
                : null
    );
};

export default Profile;