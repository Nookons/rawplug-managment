import React, {useCallback, useEffect, useState} from 'react';
import {Button, Modal, Pagination, Rating, Skeleton, Typography} from "@mui/material";
import styles from './Home.module.css'
import global from '../../index.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchItems} from "../../stores/async/fetchItems";
import ItemCard from "./ItemCard";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useNavigate} from "react-router-dom";
import {ADD_ITEM_ROUTE} from "../../utils/consts";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';



const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const items = useSelector(state => state.movies.items)
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const user = useSelector(state => state.user.user)

    const [isEmpty, setIsEmpty] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    const rootClasses = [styles.GoOnTop]

    useEffect(() => {
        console.log('test')
        setData([...items.reverse()])
    }, [items]);

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
    }, [page, dispatch, setPage]);



    const goOnTop = useCallback((event) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // добавьте это свойство для плавного скролла
        });
    }, []);

    const onAddItem = async(event) => {
        navigate(ADD_ITEM_ROUTE)
    };

    const columns = [
        { field: 'index' , headerName: 'index', width: 200 },
        {
            field: 'Accepted',
            headerName: 'Accepted by',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            editable: true,
            width: 200,
            valueGetter: (params) => `${params.row.Created}`,
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            editable: true,
            width: 100,
            valueGetter: (params) => `${Number(params.row.quantity.toLocaleString())}`,
        },
        {
            field: 'JM',
            headerName: 'JM',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            editable: true,
            width: 100,
            valueGetter: (params) => `${params.row.JM.toLowerCase()}`,
        },
        {
            field: 'status',
            headerName: 'Status',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 150,
            valueGetter: (params) =>
                `${params.row.status}`,
        },
        {
            field: 'Sender',
            headerName: 'Sender',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 150,
            valueGetter: (params) =>
                `${params.row.Sender}`,
        },
        {
            field: 'Recipient',
            headerName: 'Recipient',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 150,
            valueGetter: (params) =>
                `${params.row.Recipient}`,
        },
        {
            field: 'createdDate',
            headerName: 'createdDate',
            width: 250,
            editable: false,
        },
        {
            field: 'PalletReceipt',
            headerName: 'PalletReceipt',
            width: 250,
            editable: false,
        },
    ];

    return (
        <div className={styles.Main}>
            <div className={rootClasses.join(' ')} onClick={goOnTop}>
                <KeyboardArrowUpIcon/>
            </div>
            <div className={styles.Menu}>
                    <Button onClick={onAddItem} variant={"contained"} color={"success"}>Add item</Button>
            </div>

            {isEmpty
                ? <h5>Not any item here...</h5>
                :
                <div className={styles.List}>
                    {items.length
                        ?
                        /*<ItemCard items={items}/>*/
                        <Box sx={{ height: 'auto', width: '100%' }}>
                            <DataGrid
                                rows={data}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 10,
                                        },
                                    },
                                }}
                                pageSizeOptions={[10]}
                                checkboxSelection
                                disableRowSelectionOnClick
                            />
                        </Box>
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