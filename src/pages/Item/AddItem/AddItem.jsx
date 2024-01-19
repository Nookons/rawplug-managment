import React, {useEffect, useState} from 'react';
import {writeUserItem} from "../../../utils/ItemsDataBase";
import {useDispatch, useSelector} from "react-redux";
import {
    Autocomplete,
    Button,
    FormControl,
    FormHelperText,
    InputAdornment,
    OutlinedInput,
    TextField
} from "@mui/material";
import styles from './AddItem.module.css'
import {useNavigate} from "react-router-dom";
import {HOME_ROUTE} from "../../../utils/consts";
import { Alert } from '@mui/material';
import Loader from "../../../components/Loader/Loader";
import {findAllInRenderedTree} from "react-dom/test-utils";
import {getItemDetails} from "./GetItemsDetails";

const AddItem = () => {
    const user = useSelector(state => state.user.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error, setError] = useState('');
    const [loader, setLoader] = useState(false);

    const [formData, setFormData] = useState({
        index: '',
        description: '',
        FromDepartment: '',
        ToDepartment: '',
        quantity: 0,
        status: '',
    });



    useEffect(() => {
        getItemDetails({setFormData, formData})
        console.log(formData);
    }, [formData.index]);


    const handleInputChange = (type, value, event) => {
        setFormData((prevData) => ({ ...prevData, [type]: value }));
    };



    const addItem = async () => {
        try {
            setLoader(true)

            if (!formData.index || !formData.FromDepartment || !formData.ToDepartment || !formData.quantity) {
                throw new Error('Please fill in all required fields.');
            }

            const data = {
                index: formData.index,
                FromDepartment: formData.FromDepartment,
                description: formData.description,
                ToDepartment: formData.ToDepartment,
                quantity: formData.quantity,
                status: formData.status,
            }

            const [response, item] = await writeUserItem({data, user});

            if (response) {
                dispatch({type: 'ADD_ITEM', payload: item})
                setTimeout(() => {
                    setLoader(false)
                    navigate(HOME_ROUTE)
                }, 500)
            }
        }catch (error) {
            setError(error.toString())
            setLoader(false)
        }
    }


    const itemsIndex = [
        { title: 'KRP-ST-CART-310-B', value: 1994 },
        { title: 'Q-C-CART-ZKK-385ML', value: 1972 },
        { title: 'OZ-U-255-164-295', value: 1972 },
        { title: 'KRP-ST-PISTON', value: 1972 },
        { title: 'KRP-ST-PISTON-B', value: 1972 },
        { title: 'Q-C-BN-20-SE', value: 1972 },
        { title: 'Q-C-EPOXY-EP320', value: 1972 },
        { title: 'Q-C-HDK-S13', value: 1972 },
        { title: 'Q-C-DOLGRAN63', value: 1972 },
    ];
    const departmentsIndex = [
        { title: 'PWT10', value: 1994 },
        { title: 'PWT70', value: 1972 },
        { title: 'MSP', value: 1972 },
    ];
    const statusIndex = [
        { title: 'Available', value: 1994 },
        { title: 'Hold', value: 1972 },
        { title: 'Odzysk', value: 1972 },
    ];


    return (
        <div className={styles.Main}>
            <div className={styles.Wrapper}>
                <h5 style={{marginTop: 14, color: 'red'}}>{error}</h5>
                <Loader value={loader} />

                <article style={{color: "gray", margin: '4px 0'}}>From: {user ? user.email : null}</article>
                <article style={{color: "gray", margin: '4px 0'}}>Description: {formData.description}</article>
                <hr/>

                <div className={styles.AutoCompleteWrapper}>
                    <div>
                        <Autocomplete
                            freeSolo
                            id="free-solo-2-demo"
                            disableClearable
                            onChange={(event, value) => handleInputChange('index', value, event)}
                            options={itemsIndex.map((option) => option.title)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Index"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                            )}
                        />
                    </div>
                    <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        value={formData.FromDepartment}
                        onChange={(event, value) => handleInputChange('FromDepartment', value)}
                        options={departmentsIndex.map((option) => option.title)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='From'
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                }}
                            />
                        )}
                    />
                    <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        value={formData.ToDepartment}
                        onChange={(event, value) => handleInputChange('ToDepartment', value)}
                        options={departmentsIndex.map((option) => option.title)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="To"
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                }}
                            />
                        )}
                    />
                    <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        value={formData.status}
                        onChange={(event, value) => handleInputChange('status', value)}
                        options={statusIndex.map((option) => option.title)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Status"
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                }}
                            />
                        )}
                    />
                    <FormControl variant="outlined">
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            type={'number'}
                            value={formData.quantity}
                            onChange={(event) => handleInputChange('quantity', event.target.value)}
                            endAdornment={<InputAdornment position="end">sht</InputAdornment>}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                'aria-label': 'Quantity',
                            }}
                        />
                        {/*<FormHelperText id="outlined-weight-helper-text">Quantity</FormHelperText>*/}
                    </FormControl>
                </div>
                <Button onClick={addItem}>Add item</Button>
            </div>
        </div>
    );
};

export default AddItem;