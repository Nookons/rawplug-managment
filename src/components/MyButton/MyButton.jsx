import React from 'react';
import {Button} from "@mui/material";
import styles from './MyButton.module.css'

const MyButton = ({click,children, props}) => {
    return (
        <Button {...props} onClick={click} className={styles.Main}>{children}</Button>
    );
};

export default MyButton;