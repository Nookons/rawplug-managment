import React, {useState} from 'react';
import styles from "./Home.module.css";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import {useNavigate} from "react-router-dom";
import {FILM_ROUTE, ITEM_ROUTE} from "../../utils/consts";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import Barcode from "react-barcode";


const ItemCard = ({items}) => {
    const navigate = useNavigate();



    async function getFilm(id) {
        navigate(ITEM_ROUTE + '?_'+ id)
    }

    return (
        <div className={styles.Wrapper}>
            {items.reverse().map((element, index) => {

                let imgLoad = false;

                const imgLoaded = () => {
                    imgLoad = true
                }

                return (
                    <div onClick={() => getFilm(element.id)} className={styles.Item}>
                        {/*<div className={styles.ItemIndex}>
                            <h5>{index + 1}</h5>
                        </div>*/}
                        <article>Creator: {element.Created}</article>
                        <article>Index: {element.index}</article>
                        <article>To: {element.Recipient}</article>
                        <article>Quantity: {element.quantity.toLocaleString()}</article>
                        <article>Pallet Receipt: {element.PalletReceipt}</article>
                        <Barcode width={1.35} height={50} fontSize={0} value={element.PalletReceipt} />
                    </div>
                )
            })}
        </div>
    );
};

export default ItemCard;