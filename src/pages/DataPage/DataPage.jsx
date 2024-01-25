import React, {useEffect, useState} from 'react';
import MyDataGrid from "./MyDataGrid";
import {ITEM_ROUTE} from "../../utils/consts";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchItems} from "../../stores/async/fetchItems";

const DataPage = () => {
    const NAVIGATE = useNavigate();
    const DISPATCH = useDispatch();
    const items = useSelector(state => state.items.items)

    const [data, setData] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);


    useEffect(() => {
        DISPATCH({type: 'FETCH_MOVIES', payload: []});

        async function fetchData() {
            const response = await DISPATCH(fetchItems());

            if (!response) {
                setIsEmpty(true)
            }else {
                setData([...items.reverse()])
            }
        }

        fetchData();
    }, []);

    const handleIndexClick = (e) => {
        NAVIGATE(ITEM_ROUTE + '?_' + e)
    }

    return (
        <div style={{
            minHeight: 'calc(100dvh - 174px)',
           padding: 14
        }}>
            <h4>Data table</h4>
            <hr/>
            {!isEmpty
            ?   <MyDataGrid data={data} handleIndexClick={handleIndexClick}/>
            :   <h5>Not item here...</h5>
            }
        </div>
    );
};

export default DataPage;