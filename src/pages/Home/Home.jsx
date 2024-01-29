import React, {useCallback, useEffect, useState} from 'react';
import styles from './Home.module.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchItems, fetchReadyItems} from "../../stores/async/fetchItems";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useNavigate} from "react-router-dom";
import {ADD_ITEM_ROUTE, ADD_PALLET_ROUTE, DATA_PAGE_ROUTE, ITEM_ROUTE} from "../../utils/consts";
import MyButton from "../../components/MyButton/MyButton";
import data from '../../utils/ItemsData.json'
import {fetchUsersActions} from "../../stores/async/fetchActions";
import {Button, Drawer} from "@mui/material";
import Box from "@mui/material/Box";


const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const items = useSelector(state => state.items.items)
    const readyItems = useSelector(state => state.items.readyItems)
    const user = useSelector(state => state.user.user)

    const [scrollY, setScrollY] = useState(0);

    const rootClasses = [styles.GoOnTop]

    const [actionsData, setActionsData] = useState([]);

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
            const responseReady = await dispatch(fetchReadyItems());
        }

        fetchData();
    }, []);

    const goOnTop = useCallback((event) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // добавьте это свойство для плавного скролла
        });
    }, []);

    const onAddItem = async (event) => {
        navigate(ADD_ITEM_ROUTE)
    };
    const onDataGridClick = async (event) => {
        navigate(DATA_PAGE_ROUTE)
    };
    const onItemClick = async (id) => {
        navigate(ITEM_ROUTE + '?_' + id)
    };

    console.log(readyItems);

    return (
        <div className={styles.Main}>
            <div className={rootClasses.join(' ')} onClick={goOnTop}>
                <KeyboardArrowUpIcon/>
            </div>
            <h4>Warehouse status | <span>Packed pallets ({readyItems.length})</span></h4>
            <div className={styles.Menu}>
                <MyButton click={onAddItem}>Add Item</MyButton>
                <MyButton click={() => navigate(ADD_PALLET_ROUTE)}>Add pallet</MyButton>
                <MyButton click={onDataGridClick}>Data grid</MyButton>
                <MyButton click={() => alert('Page in progress...')}>Add Plan</MyButton>
            </div>
            {data.length > 0
                ?
                <div className={styles.WarehouseWrapper}>
                    {data.map(e => {

                        let tempQta = 0;
                        let tempPalletsQta = 0;

                        const tempLast = []

                        if (items.length) {
                            items.map(item => {
                                if (item.index === e.index) {
                                    tempQta = tempQta + item.quantity
                                    tempPalletsQta++
                                    tempLast.push(item)
                                }
                            })
                        }

                        return (
                            <div className={styles.Item}>
                                <article>{e.index}</article>
                                <hr/>
                                <article>All have: {tempQta} {e.JM}</article>
                                <article>Pallets: ({tempPalletsQta})</article>
                                <br/>
                                <div style={{display: 'flex', gap: 14, flexWrap: 'wrap'}}>
                                    {tempLast.reverse().slice(0, 5).map(lastElement => {

                                        const tempClasses = [styles.LastItems]
                                        const tempStatus = lastElement.status

                                        switch (tempStatus) {
                                            case 'Hold':
                                                tempClasses.push(styles.Hold)
                                                break
                                            case 'Odzysk':
                                                tempClasses.push(styles.Odzysk)
                                                break
                                        }

                                        return (
                                            <div className={tempClasses.join(' ')}
                                                 onClick={() => onItemClick(lastElement.id)}>
                                                <article
                                                    style={{fontSize: 14}}>{lastElement.quantity} | {lastElement.JM}</article>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
                : null
            }
            <article>Current version 1.0.3</article>
        </div>
    );
};

export default Home;