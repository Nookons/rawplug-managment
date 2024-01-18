import React, { useCallback, useEffect, useState } from 'react';
import MainStyles from '../Sing.module.css';
import { Button, TextField } from "@mui/material";
import { mySignIn } from "../../../utils/database";
import { useDispatch, useSelector } from "react-redux";
import { userSignInAction } from "../../../stores/userReducer";
import { useNavigate } from "react-router-dom";
import {HOME_ROUTE, SIGN_UP_ROUTE} from "../../../utils/consts";
import Loader from "../../../components/Loader/Loader";
import logo from '../../../assets/logo.svg';

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

    const [formData, setFormData] = useState({
        nickName: '',
        password: ''
    });

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleErrors = (error) => {
        switch (error.toString()) {
            case 'Error: email':
                setError('You have not entered an email.');
                break;
            case 'Error: missing-password':
                setError('You have not entered a password.');
                break;
            case 'Error: invalid-credential':
                setError('Invalid email or password. Please try again.');
                setFormData((prevData) => ({ ...prevData, password: '' }));
                break;
            default:
                setError('An error occurred. Please try again.');
        }
    };

    const signIn = async () => {
        try {
            setLoader(true);
            const response = await mySignIn(formData);

            console.log("Response:", response);

            if (response === true) {
                setLoader(false);
                dispatch(userSignInAction(response));
                navigate(HOME_ROUTE);
            } else {
                console.log("Unexpected response:", response);
            }
        } catch (error) {
            handleErrors(error);
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        // If the user is authenticated, redirect to home
        if (user && user.uid) {
            navigate(HOME_ROUTE);
        }
    }, [user, navigate]);

    return (
        <div className={MainStyles.Main}>
            <Loader value={loader} setValue={setLoader} />
            <div className={MainStyles.Wrapper}>
                <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 34 }}>
                    <img style={{ maxWidth: 32 }} src={logo} alt="" />
                    <h4>Welcome back !!!</h4>
                </div>
                <article>Login:</article>
                <TextField
                    required
                    id="outlined-required"
                    type="email"
                    name="nickName"
                    value={formData.nickName}
                    onChange={handleInputChange}
                    placeholder="Please leave a login here"
                />
                <article>Password:</article>
                <TextField
                    id="outlined-password-input"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    autoComplete="current-password"
                    placeholder="Please leave a password here"
                />
                <div style={{ color: 'red', marginTop: 14 }}>{error}</div>
                <article style={{ marginTop: 14 }}>Don't have an account? <span onClick={() => navigate(SIGN_UP_ROUTE)} style={{ color: "#7272fd", textDecoration: 'underline dotted #7272fd', cursor: 'pointer' }}>Sign up</span></article>
                <Button style={{marginTop: 14 }} onClick={signIn}>Sign In</Button>
            </div>
        </div>
    );
};

export default SignIn;
