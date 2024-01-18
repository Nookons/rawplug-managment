import React, {useCallback, useEffect, useState} from 'react';
import styles from './Navbar.module.css'
import {Link, Route, useNavigate} from "react-router-dom";
import logo from '../../assets/logo.svg'
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "../../stores/async/fetchUser";
import LoginIcon from '@mui/icons-material/Login';
import {HOME_ROUTE, PROFILE_ROUTE, SIGN_IN_ROUTE} from "../../utils/consts";
import LogoutIcon from '@mui/icons-material/Logout';
import {mySignOut} from "../../utils/database";
import Loader from "../Loader/Loader";
import {userSignInAction} from "../../stores/userReducer";
import {publicRoutes} from "../../routes";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        const getUser = async () => {
            const response = await dispatch(fetchUser());
            console.log(response);
        }
        getUser()
    }, []);



    const [burger, setBurger] = useState(false);
    const [loader, setLoader] = useState(false);

    const onBurgerClick = useCallback(() => {
        setBurger(prevBurger => !prevBurger);
    }, []);

    const onLoginIconClick = useCallback((event) => {
        navigate(SIGN_IN_ROUTE)
    }, []);

    const onLogOutIconClick = async (event) => {
        try {
            setLoader(true)
            const response = await mySignOut();

            if (response) {
                setTimeout(() => {
                    setLoader(false)
                    dispatch(userSignInAction(null))
                }, 500)
            }
        }catch (error) {
            setLoader(false)
            console.error(error);
        }
    };

    const goHome = useCallback((event) => {
        localStorage.setItem('pageInfo', 1);
        navigate(HOME_ROUTE)
    }, []);

    return (
        <div className={styles.Main}>
            <Loader value={loader} setValue={setLoader}/>
            <div className={styles.LogoPlace} onClick={goHome}>
                <img src={logo} alt=""/>
                <h6>Rawplug Managment</h6>
            </div>
            <div className={styles.Wrapper }>
                <div className={burger ? styles.NavBarBurger : styles.NavBar}>
                    {publicRoutes.map( ({path, label}, index) =>
                        <Link key={index} to={path} >{label}</Link>
                    )}
                </div>
                {user
                    ?
                    <div>
                        {!user.uid
                            ? <LoginIcon style={{ cursor: 'pointer'}} onClick={onLoginIconClick}/>
                            :
                            <div  className={styles.Wrapper }>
                                <Link to={PROFILE_ROUTE + '?_' + user.uid} >Profile</Link>
                                <LogoutIcon style={{ cursor: 'pointer'}} onClick={onLogOutIconClick}/>
                            </div>
                        }
                    </div>
                    : null
                }
            </div>
        </div>
    )
};

export default Navbar;