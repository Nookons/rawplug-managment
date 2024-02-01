import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchItems} from "../../stores/async/fetchItems";
import {Breadcrumbs, Button, Skeleton, Typography} from "@mui/material";
import styles from './Item.module.css'
import {Link, useNavigate} from "react-router-dom";
import Barcode from "react-barcode";
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EditIcon from '@mui/icons-material/Edit';
import {getImg, getItem, getName, getRecipient, getSender} from "./const";
import PrintIcon from '@mui/icons-material/Print';
import SettingsItem from "./SettingsItem";
import MyButton from "../../components/MyButton/MyButton";
import ReactToPrint, {useReactToPrint} from "react-to-print";
import SettingsToPrint from "./Print/SettingsToPrint";
import {deleteItem, editItem} from "../../utils/DataBase/ItemsDataBase";
import {HOME_ROUTE} from "../../utils/consts";


const ItemPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = useSelector(state => state.items.items)
    const user = useSelector(state => state.user.user)

    const currentURL = window.location.href;
    const rootClasses = [styles.Main]
    const id = currentURL.split('_')[1]


    const [change, setChange] = useState(false);
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


        getItem({index, setItemData})
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

    if (currentItem) {
        switch (currentItem.status) {
            case 'Hold':
                rootClasses.push(styles.Hold)
                break
            case 'Odzysk':
                rootClasses.push(styles.Odzysk)
                break
            default:
                break
        }
    }

    const onDeleteClick = async () => {
        const id = currentItem.id;
        const userIndex = prompt('Pls write the ' + currentItem.index + ' for delete')

        if (userIndex === currentItem.index) {
            try {
                const response = await deleteItem({id, currentItem, user});

                if (response) {
                    navigate(HOME_ROUTE)
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('Not correct index... Item was not delete')
        }
    }
    const onEditClick = async () => {
        const id = currentItem.id;

        try {
            const response = await editItem(id);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className={rootClasses.join(' ')}>
            <div ref={componentRef}>
                <SettingsToPrint currentItem={currentItem} itemData={itemData}/>
            </div>
            <div className={styles.Wrapper}>
                {/*<div className={styles.Preview}>
                   <img src={itemData.imgUrl} alt=""/>
               </div>*/}
                <SettingsItem currentItem={currentItem} itemData={itemData} change={change}/>

                <div className={styles.Actions}>
                    <div>
                        {currentItem &&
                            <Barcode width={3} height={50} fontSize={16} value={currentItem.PalletReceipt}/>}
                    </div>
                    <div>
                        <MyButton><AssignmentTurnedInIcon/></MyButton>
                        <MyButton click={test}><PrintIcon/></MyButton>
                        <MyButton click={onEditClick}><EditIcon/></MyButton>
                        <MyButton click={onDeleteClick}><DeleteIcon/></MyButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemPage;