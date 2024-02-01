import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getItemDetails, getPalletDetails} from "../AddItem/GetItemsDetails";
import {writeUserItem} from "../../../utils/DataBase/ItemsDataBase";
import {HOME_ROUTE} from "../../../utils/consts";
import data from "../../../utils/jsonData/PalletsData.json";
import styles from "./AddPallet.module.css";
import Loader from "../../../components/Loader/Loader";
import {Autocomplete, FormControl, InputAdornment, OutlinedInput, TextField} from "@mui/material";
import MyButton from "../../../components/MyButton/MyButton";
import {writeUserPallet} from "../../../utils/DataBase/ReadyPalletsDataBase";

const AddPallet = () => {
    const user = useSelector(state => state.user.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error, setError] = useState('');
    const [loader, setLoader] = useState(false);
    const [ITEM_INDEX, setITEM_INDEX] = useState([]);

    const [formData, setFormData] = useState({
        index: '',
        description: '',
        FromDepartment: '',
        JM: '',
        imgUrl: '',
        ToDepartment: '',
        quantity: 0,
        status: '',
    });



    useEffect(() => {
        getPalletDetails({setFormData, formData})
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
                JM: formData.JM,
                quantity: formData.quantity,
                status: formData.status,
            }

            const [response, item] = await writeUserPallet({data, user});

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

    useEffect(() => {
        setITEM_INDEX([])

        data.map(e => {
            setITEM_INDEX(prevState => [...prevState, {title: e.index}])
        })
    }, [data]);

    return (
        <div className={styles.Main}>
            <div className={styles.Wrapper}>
                <h5 style={{marginTop: 14, color: 'red'}}>{error}</h5>
                <Loader value={loader} />
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <article style={{color: "gray", margin: '4px 0'}}>From: {user ? user.email : null}</article>
                        <article style={{color: "gray", margin: '4px 0'}}>Description: {formData.description}</article>
                    </div>
                    <div>
                        <img style={{maxWidth: 135}} src={formData.imgUrl} alt=""/>
                    </div>
                </div>
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
                </div>
                <MyButton click={addItem}>Add item</MyButton>
            </div>
        </div>
    );
};

export default AddPallet;