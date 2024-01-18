import React, {useCallback, useEffect, useState} from 'react';
import {Button, Modal, Pagination, Rating, Skeleton, Typography} from "@mui/material";
import styles from './Home.module.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchItems} from "../../stores/async/fetchItems";
import ItemCard from "./ItemCard";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {writeUserData} from "../../utils/ItemsDataBase";
import {useNavigate} from "react-router-dom";
import {ADD_ITEM_ROUTE} from "../../utils/consts";


const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const items = useSelector(state => state.movies.items)
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const user = useSelector(state => state.user.user)

    const [isEmpty, setIsEmpty] = useState(false);

    const [totalItems, setTotalItems] = useState(0);

    const [scrollY, setScrollY] = useState(0);

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
            const response = await dispatch(fetchItems({page}));
            console.log(response);

            if (!response) {
                setIsEmpty(true)
            }
        }

        fetchData();
    }, [page, dispatch, setTotalItems, setPage]);



    const goOnTop = useCallback((event) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // добавьте это свойство для плавного скролла
        });
    }, []);

    const onAddItem = async(event) => {
        navigate(ADD_ITEM_ROUTE)
    };

    return (
        <div className={styles.Main}>
            <div className={rootClasses.join(' ')} onClick={goOnTop}>
                <KeyboardArrowUpIcon/>
            </div>
            <div className={styles.Menu}>
                    <Button onClick={onAddItem}>Add item</Button>
                    <Button onClick={onAddItem}>Find item</Button>
                    <Button onClick={onAddItem}>Delete item</Button>
            </div>
            {isEmpty
                ? <h5>Not any item here...</h5>
                :
                <div className={styles.List}>
                    {items.length
                        ?
                        <ItemCard items={items}/>
                        :
                        <div className={styles.Wrapper}>
                            {Array.from({length: 40}).map((_, index) => (
                                <Skeleton key={index} variant="rounded" width={305} height={270}/>
                            ))}
                        </div>
                    }
                </div>
            }
        </div>
    );
};

export default Home;