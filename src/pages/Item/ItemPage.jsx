import React, {useEffect, useState} from 'react';
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

const ItemPage = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.movies.items)

    const currentURL  = window.location.href;
    const id  = currentURL.split('_')[1]

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

    return (
        <div className={styles.Main}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/src/pages">
                    MUI
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/Item/ItemPage"
                >
                    Core
                </Link>
                <Typography color="text.primary">Breadcrumbs</Typography>
            </Breadcrumbs>

           <div className={styles.Wrapper}>
               <div className={styles.Preview}>
                   <img src={itemData.imgUrl} alt=""/>
               </div>
               <div className={styles.Settings}>
                   <h5>Index: <span>{currentItem ? currentItem.index : <Skeleton width={50} height={50} variant={"rounded"}/>}</span></h5>
                   <article style={{color: 'gray'}}>#
                       <span> {currentItem ? currentItem.PalletReceipt : <Skeleton width={50} height={50} variant={"rounded"}/>}</span>
                   </article>
                   <article style={{color: 'gray'}}>{itemData.name}</article>
                   <hr/>

                   <article>Add date:
                       <span> {currentItem ? currentItem.createdDate : <Skeleton width={50} height={50} variant={"rounded"}/>}</span>
                   </article>
                   <article>Created:
                       <span> {currentItem ? currentItem.Created : <Skeleton width={50} height={50} variant={"rounded"}/>}</span>
                   </article>
                   <article>Quantity:
                       <span> {currentItem ? currentItem.quantity : <Skeleton width={50} height={50} variant={"rounded"}/>}</span>
                   </article>
                   <article>Sender:
                       <span> {currentItem ? currentItem.Sender : <Skeleton width={50} height={50} variant={"rounded"}/>}</span>
                       <br/>
                       <span> || {itemData.from}</span>
                   </article>
                   <article>To:
                       <span> {currentItem ? currentItem.Recipient : <Skeleton width={50} height={50} variant={"rounded"}/>}</span>
                       <br/>
                       <span> || {itemData.to}</span>
                   </article>
                   <Barcode width={3} height={50} fontSize={16} value={currentItem ? currentItem.PalletReceipt : null} />
               </div>
               <div className={styles.Actions}>
                   <Button><AssignmentTurnedInIcon/></Button>
                   <Button><PrintIcon/></Button>
                   <Button><EditIcon/></Button>
                   <Button><DeleteIcon/></Button>
               </div>
           </div>
        </div>
    );
};

export default ItemPage;