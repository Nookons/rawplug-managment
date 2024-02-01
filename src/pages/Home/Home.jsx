import React, {useCallback, useEffect, useState} from 'react';
import styles from './Home.module.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchItems, fetchReadyItems} from "../../stores/async/fetchItems";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useNavigate} from "react-router-dom";
import {ADD_ITEM_ROUTE, ADD_PALLET_ROUTE, DATA_PAGE_ROUTE} from "../../utils/consts";
import MyButton from "../../components/MyButton/MyButton";
import data from '../../utils/jsonData/ItemsData.json'
import WarehouseItem from "./WarehouseItem";
import HomeNavigate from "./HomeNavigate/HomeNavigate";


const Home = () => {
    const dispatch      = useDispatch();
    const navigate      = useNavigate();
    const scrollEvent   = window.addEventListener('scroll', () => setScrollY(window.scrollY));


    const { items, readyItems } = useSelector(state => state.items)  // When deleted, no items are displayed to the user.

    const rootClasses = [styles.GoOnTop]

    const [scrollY, setScrollY] = useState(0);
    const [navigate_menu_status, setNavigate_menu_status] = useState(false);



    if (scrollY > 250) {
        rootClasses.push(styles.GoOnTopActive)
    }

    useEffect(() => {
        async function fetchData() {
            await dispatch(fetchItems());
            await dispatch(fetchReadyItems());
        }

        fetchData();
    }, []);


    const goOnTop = useCallback((event) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, []);


    return (
        <div className={styles.Main}>
            <div className={rootClasses.join(' ')} onClick={goOnTop}>
                <KeyboardArrowUpIcon/>
            </div>
            <div>
                <MyButton click={() => setNavigate_menu_status(true)}>menu</MyButton>
            </div>
            <div>
                <HomeNavigate
                    navigate_menu_status={navigate_menu_status}
                    setNavigate_menu_status={setNavigate_menu_status}
                />
            </div>
            <h4>Warehouse status | <span>Packed pallets ({readyItems.length})</span></h4>
            <div className={styles.WarehouseWrapper}>
                {data.map((card, index) => {

                    let tempQta         = 0;
                    let tempPalletsQta  = 0;
                    let tempLast        = []

                    if (items.length) {
                        items.map(item => {
                            if (item.index === card.index) {
                                tempQta = tempQta + item.quantity
                                tempPalletsQta++
                                tempLast.push(item)
                            }
                        })
                    }

                    if (tempPalletsQta > 0) {
                        return (
                            <WarehouseItem
                                key={index}
                                card={card}
                                tempQta={tempQta}
                                tempPalletsQta={tempPalletsQta}
                                tempLast={tempLast}
                            />
                        )
                    }
                })}
            </div>
        </div>
    );
};

export default Home;