import React, {useCallback, useEffect, useState} from 'react';
import styles from './Home.module.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchItems} from "../../stores/async/fetchItems";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useNavigate} from "react-router-dom";
import {ADD_ITEM_ROUTE, DATA_PAGE_ROUTE, ITEM_ROUTE} from "../../utils/consts";
import MyButton from "../../components/MyButton/MyButton";
import data from '../../utils/ItemsData.json'
import {fetchUsersActions} from "../../stores/async/fetchActions";



const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const items = useSelector(state => state.items.items)
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
    const onItemClick = async(id) => {
        navigate(ITEM_ROUTE + '?_' + id)
    };




    return (
        <div className={styles.Main}>
            <div className={rootClasses.join(' ')} onClick={goOnTop}>
                <KeyboardArrowUpIcon/>
            </div>
            <article>Current version 1.0.3</article>
            <div className={styles.Menu}>
                <MyButton click={onAddItem}>Add Item</MyButton>
                <MyButton click={onDataGridClick}>Data grid</MyButton>
                <MyButton click={() => alert('Page in progress...')}>Add Plan</MyButton>
            </div>
            <h4>Warehouse status</h4>
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
                                    tempPalletsQta ++
                                    tempLast.push(item)
                                }
                            })
                        }

                        return (
                            <div style={{
                                background: tempQta < 3000 ? 'linear-gradient(270deg, rgba(255,115,115,0.5) 0%, #ffffff 75%)' : null,
                                filter: !user ? 'blur(5px)' : 'none',
                                pointerEvents: !user ? 'none' : 'auto',
                            }}>
                                <article>{e.index} &#129760;</article>
                                <hr/>
                                <article>All have: {tempQta} {e.JM}</article>
                                <article>Pallets: ({tempPalletsQta}) </article>
                                <br/>
                                <div style={{display: 'flex', gap: 14, flexWrap: 'wrap'}}>
                                    {tempLast.reverse().slice(0, 3).map(lastElement => {

                                        return (
                                            <div style={{backgroundColor: lastElement.status === 'Hold' ? '#ff7373' : null }} onClick={() => onItemClick(lastElement.id)} className={styles.LastItem}>
                                                <article style={{fontSize: 14}}>Quantity: {lastElement.quantity}</article>
                                                <article style={{fontSize: 14}}>Add Date: {lastElement.createdDate}</article>
                                                <article style={{fontSize: 14}}>Receipt: {lastElement.PalletReceipt}</article>
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
        </div>
    );
};

export default Home;