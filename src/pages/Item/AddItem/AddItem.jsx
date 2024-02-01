import React, {useEffect, useState} from 'react';
import {writeUserItem} from "../../../utils/DataBase/ItemsDataBase";
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
import MyButton from "../../../components/MyButton/MyButton";
import data from '../../../utils/jsonData/ItemsData.json'
import Box from "@mui/material/Box";

const AddItem = () => {
    const user = useSelector(state => state.user.user)
    const items = useSelector(state => state.items.items)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error, setError]             = useState('');
    const [loader, setLoader]           = useState(false);
    const [ITEM_INDEX, setITEM_INDEX]   = useState([]);
    const [isBarrel, setIsBarrel]       = useState(false);

    const [formData, setFormData] = useState({
        index: '',
        type: '',
        description: '',
        FromDepartment: '',
        JM: '',
        ToDepartment: '',
        quantity: 0,
        status: '',
        batchNumber: 0,
    });



    useEffect(() => {
        getItemDetails({setFormData, formData})
    }, [formData.index]);


    useEffect(() => {

        if (formData.type.toLowerCase() === 'barrel') {
            try {
                const only_Barrel = items.filter(item => item.type.toLowerCase() === 'barrel')
                const maxObject = only_Barrel.reduce((max, current) => (current.batchNumber > max.batchNumber ? current : max));
                setFormData((prevData) => ({...prevData, batchNumber: maxObject.batchNumber + 1}))
            }catch (e) {
                console.error(e)
            }

            setIsBarrel(true)
        }else {
            setIsBarrel(false)
        }
    }, [formData.type]);


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
                type: formData.type,
                description: formData.description,
                ToDepartment: formData.ToDepartment,
                batchNumber: formData.batchNumber,
                JM: formData.JM,
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

    const departmentsIndex = [
        { title: 'PWT10', value: 1994 },
        { title: 'PWT30', value: 1972 },
        { title: 'PWT70', value: 1972 },
        { title: 'MSP', value: 1972 },
    ];

    const statusIndex = [
        { title: 'Available' },
        { title: 'Hold' },
        isBarrel ? { title: 'Odzysk' } : { title: '' },
    ];

    useEffect(() => {
        setITEM_INDEX([])

        data.map(e => {
            setITEM_INDEX(prevState => [...prevState, {title: e.index}])
        })
    }, [data]);

    return (
        <div className={styles.Main}>
            <div className={styles.Wrapper}>
                <h5 style={{marginTop: 4, color: 'red'}}>{error}</h5>
                <Loader value={loader} />
                <div className={styles.AutoCompleteWrapper}>
                    <div>
                        <Autocomplete
                            freeSolo
                            id="free-solo-2-demo"
                            disableClearable
                            onChange={(event, value) => handleInputChange('index', value, event)}
                            options={ITEM_INDEX.map((option) => option.title)}
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
                            selectOnFocus={false}
                            autoFocus={false}
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
                        selectOnFocus={false}
                        autoFocus={false}
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
                        selectOnFocus={false}
                        autoFocus={false}
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
                        selectOnFocus={false}
                        autoFocus={false}
                    />
                    <FormControl variant="outlined">
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            type={'number'}
                            value={formData.quantity}
                            onChange={(event) => handleInputChange('quantity', event.target.value)}
                            endAdornment={<InputAdornment position="end">{formData.JM}</InputAdornment>}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                'aria-label': 'Quantity',
                            }}
                            required={true} autoFocus={false}/>
                        {/*<FormHelperText id="outlined-weight-helper-text">Quantity</FormHelperText>*/}
                    </FormControl>
                    {isBarrel ?
                        <TextField
                            fullWidth
                            label="Batch N"
                            type={"Number"}
                            value={formData.batchNumber}
                            onChange={(event) => handleInputChange('batchNumber', event.target.value)}
                            id="outlined-start-adornment"
                            sx={{ width: '100%' }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">#</InputAdornment>,
                            }}
                        />
                        : null
                    }
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 14}}>
                    <MyButton click={addItem}>Add item</MyButton>
                </div>
                <div>
                    <article style={{color: "gray", margin: '4px 0'}}>From: {user ? user.email : null}</article>
                    {formData.description ? <article style={{color: "gray", margin: '4px 0'}}>Description: {formData.description}</article> : null}
                </div>
            </div>
        </div>
    );
};

export default AddItem;