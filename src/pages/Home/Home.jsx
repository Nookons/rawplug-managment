import React, {useCallback, useEffect, useState} from 'react';
import {Button, Modal, Pagination, Rating, Skeleton, Typography} from "@mui/material";
import styles from './Home.module.css'
import global from '../../index.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchItems} from "../../stores/async/fetchItems";
import ItemCard from "./ItemCard";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useNavigate} from "react-router-dom";
import {ADD_ITEM_ROUTE, DATA_PAGE_ROUTE, ITEM_ROUTE} from "../../utils/consts";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import MyButton from "../../components/MyButton/MyButton";
import {columns} from "../DataPage/Columns";
import MyDataGrid from "../DataPage/MyDataGrid";



const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const items = useSelector(state => state.movies.items)
    const user = useSelector(state => state.user.user)

    const [isEmpty, setIsEmpty] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    const [OZ_295, setOZ_295] = useState(0);
    const [OZ_295_PALLET, setOZ_295_PALLET] = useState(0);

    const [KRP_310, setKRP_310] = useState(0);
    const [KRP_310_PALLET, setKRP_310_PALLET] = useState(0);

    const rootClasses = [styles.GoOnTop]

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    if (scrollY > 250) {
        rootClasses.push(styles.GoOnTopActive)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        dispatch({type: 'FETCH_MOVIES', payload: []});

        async function fetchData() {
            const response = await dispatch(fetchItems());
            console.log(response);

            if (!response) {
                setIsEmpty(true)
            }
        }

        fetchData();
    }, []);

    const goOnTop = useCallback((event) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // добавьте это свойство для плавного скролла
        });
    }, []);

    const onAddItem = async(event) => {
        navigate(ADD_ITEM_ROUTE)
    };
    const onDataGridClick = async(event) => {
        navigate(DATA_PAGE_ROUTE)
    };

    useEffect(() => {
        setOZ_295(0)
        setKRP_310(0)

        items.map(e => {
            const INDEX = e.index

            switch (INDEX) {
                case 'OZ-U-255-164-295':
                    setOZ_295((prev) => prev + Number(e.quantity))
                    break;
                case 'KRP-ST-CART-310-B':
                    setKRP_310((prev) => prev + Number(e.quantity))
                    break;
                default:
                    break
            }
        })
    }, []);

    useEffect(() => {
        setKRP_310_PALLET(Math.round(KRP_310 / 936));
        setOZ_295_PALLET(Math.round(OZ_295 / 400));
    }, [KRP_310, OZ_295]);

    return (
        <div className={styles.Main}>
            <div className={rootClasses.join(' ')} onClick={goOnTop}>
                <KeyboardArrowUpIcon/>
            </div>
            <div className={styles.Menu}>
                <MyButton click={onAddItem}>Add Item</MyButton>
                <MyButton click={onDataGridClick}>Data grid</MyButton>
            </div>
            <h4>Warehouse status</h4>
            <div className={styles.WarehouseWrapper}>
                <div>
                    <article>OZ-U-255-164-295 🤖</article>
                    <hr/>
                    <article>Quantity: {OZ_295.toLocaleString()} (sht)</article>
                    <article>Pallet: {OZ_295_PALLET.toLocaleString()} (sht)</article>
                </div>
                <div>
                    <article>KRP-ST-CART-310-B 🤖</article>
                    <hr/>
                    <article>Quantity: {KRP_310.toLocaleString()} (sht)</article>
                    <article>Pallet: {KRP_310_PALLET.toLocaleString()} (sht)</article>
                </div>
            </div>
        </div>
    );
};

export default Home;