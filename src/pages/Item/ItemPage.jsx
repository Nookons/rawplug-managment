import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchItems} from "../../stores/async/fetchItems";
import {Breadcrumbs, Button, Skeleton, Typography} from "@mui/material";
import styles from './Item.module.css'
import {Link} from "react-router-dom";
import Barcode from "react-barcode";
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EditIcon from '@mui/icons-material/Edit';
import {getImg, getName, getRecipient, getSender} from "./const";
import PrintIcon from '@mui/icons-material/Print';
import SettingsItem from "./SettingsItem";
import MyButton from "../../components/MyButton/MyButton";
import ReactToPrint, {useReactToPrint} from "react-to-print";
import SettingsToPrint from "./Print/SettingsToPrint";


const ItemPage = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.movies.items)

    const currentURL = window.location.href;

    const id = currentURL.split('_')[1]
    const [currentItem, setCurrentItem] = useState({});


    const [itemData, setItemData] = useState({
        name: '',
        imgUrl: '',
        to: '',
        from: '',
    });

    useEffect(() => {
        const response = dispatch(fetchItems())
    }, [])

    useEffect(() => {
        const findItem = items.filter(el => el.id === Number(id))
        setCurrentItem(...findItem)
    }, [currentURL, items]);

    useEffect(() => {
        const index = currentItem ? currentItem.index : '9999'
        const Recipient = currentItem ? currentItem.Recipient : '9999'
        const Sender = currentItem ? currentItem.Sender : '9999'

        getName({index, setItemData})
        getImg({index, setItemData})
        getRecipient({Recipient, setItemData})
        getSender({Sender, setItemData})

    }, [currentItem]);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const test = () => {
        handlePrint()
    }

    return (
        <div className={styles.Main}>
            <div ref={componentRef}>
                <SettingsToPrint currentItem={currentItem} itemData={itemData}/>
            </div>
            <div className={styles.Wrapper}>
                {/*<div className={styles.Preview}>
                   <img src={itemData.imgUrl} alt=""/>
               </div>*/}
                <SettingsItem currentItem={currentItem} itemData={itemData}/>
                <div className={styles.Actions}>
                    <MyButton><AssignmentTurnedInIcon/></MyButton>
                    <MyButton click={test}><PrintIcon/></MyButton>
                    <MyButton><EditIcon/></MyButton>
                    <MyButton><DeleteIcon/></MyButton>
                </div>
            </div>
        </div>
    );
};

export default ItemPage;