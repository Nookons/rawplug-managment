import React, {useState} from 'react';

import styles from './HomeNavigate.module.css'
import MyButton from "../../../components/MyButton/MyButton";
import {ADD_ITEM_ROUTE, ADD_PALLET_ROUTE, DATA_PAGE_ROUTE} from "../../../utils/consts";
import {useNavigate} from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';

const HomeNavigate = ({navigate_menu_status, setNavigate_menu_status }) => {
    const navigate = useNavigate();

    const rootClasses = [styles.Main]


    if (navigate_menu_status) {
        rootClasses.push(styles.Active)
    }

    const onAddItem = async (event) => {
        navigate(ADD_ITEM_ROUTE)
    };
    const onDataGridClick = async (event) => {
        navigate(DATA_PAGE_ROUTE)
    };

    return (
        <div onClick={() => setNavigate_menu_status(false)} className={rootClasses.join(' ')}>
            <div onClick={(event) => event.stopPropagation()} className={styles.Wrapper}>
                <div>
                    <h6>Navigate menu</h6>
                    <MyButton click={onAddItem}>Add Item</MyButton>
                    <MyButton click={() => navigate(ADD_PALLET_ROUTE)}>Add pallet</MyButton>
                    <MyButton click={onDataGridClick}>Data grid</MyButton>
                    <MyButton click={() => alert('Page in progress...')}>Add Plan</MyButton>
                </div>
                <div style={{gap: 14, alignItems: 'flex-end'}}>
                    <div className={styles.CloseButton}>
                        <MyButton click={() => setNavigate_menu_status(false)}><CancelIcon /></MyButton>
                    </div>
                    <h6 style={{fontSize: 12}}>Current version 1.0.3</h6>
                </div>
            </div>
        </div>
    );
};

export default HomeNavigate;