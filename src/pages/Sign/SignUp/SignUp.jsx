import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { mySignUp } from '../../../utils/database';
import { userSignInAction } from '../../../stores/userReducer';
import { HOME_ROUTE } from '../../../utils/consts';
import MainStyles from '../Sing.module.css';
import Loader from '../../../components/Loader/Loader';
import logo from '../../../assets/logo.svg';
import { Button, TextField } from '@mui/material';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        passwordCheck: '',
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
                setFormData((prevData) => ({
                    ...prevData,
                    password: '',
                    passwordCheck: '',
                }));
                break;
            case 'Error: check':
                setError("Passwords don't match.");
                setFormData((prevData) => ({ ...prevData, passwordCheck: '' }));
                break;
            default:
                setError('An error occurred. Please try again.');
        }
    };

    const signIn = async () => {
        try {
            setLoader(true);
            if (formData.password !== formData.passwordCheck) {
                throw new Error('check');
            }
            const response = await mySignUp(formData);

            console.log('Response:', response);

            if (response === true) {
                setLoader(false);
                dispatch(userSignInAction(response));
                navigate(HOME_ROUTE);
            } else {
                console.log('Unexpected response:', response);
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
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 14,
                        marginBottom: 34,
                    }}
                >
                    <img style={{ maxWidth: 32 }} src={logo} alt="" />
                    <h4>Welcome to our family</h4>
                </div>
                <article>Email:</article>
                <TextField
                    required
                    id="outlined-required"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Please leave an email here"
                />
                <div className={MainStyles.PasswordWrapper}>
                    <div>
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
                    </div>
                    <div>
                        <article>Check password:</article>
                        <TextField
                            id="outlined-check-password-input"
                            type="password"
                            name="passwordCheck"
                            value={formData.passwordCheck}
                            onChange={handleInputChange}
                            autoComplete="current-password"
                            placeholder="Please leave a password here"
                        />
                    </div>
                </div>
                <div style={{ color: 'red', marginTop: 14 }}>{error}</div>
                <Button style={{ marginTop: 14 }} onClick={signIn}>
                    Sign Up
                </Button>
            </div>
        </div>
    );
};

export default SignUp;
