import React, {useEffect, useState} from 'react';

import styles from './Home.module.css'
import {ITEM_ROUTE} from "../../utils/consts";
import {useNavigate} from "react-router-dom";
import MyButton from "../../components/MyButton/MyButton";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import MyModal from "./MyModal";
import {addToUsed, addToUsedItem} from "../../utils/DataBase/ItemsDataBase";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../components/Loader/Loader";

const WarehouseItem = ({ key, card, tempQta, tempPalletsQta, tempLast }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user.user)

    const INDEX = card.index
    const JM = card.JM

    const [data, setData] = useState([]);
    const [isModal, setIsModal] = useState(false);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const reverse_array = tempLast.reverse();
        console.log('work...')
        setData(reverse_array)
    }, [tempLast]);

    const onItemClick = async (id) => {
        navigate(ITEM_ROUTE + '?_' + id)
    };


    function promptWithYes({event, lastElement}) {
        event.stopPropagation();

        const answer = prompt('Вы уверены? (yes/no)').toLowerCase();

        if (answer === 'yes') {
            console.log('Отлично, продолжаем!');
            addToUsed({lastElement})
        } else if (answer === 'no') {
            console.log('Окей, прерываем выполнение.');
            return null
            // Ваш код для случая "No" здесь
        } else {
            console.log('Пожалуйста, введите "yes" или "no".');
            promptWithYes(); // Повторяем промпт при некорректном вводе
        }
    }

    const addToUsed = ({lastElement}) => {
        const id = lastElement.id
        try {
            setLoader(true)
            const response = addToUsedItem({id, lastElement, user})

            if (response) {
                setTimeout(() => {
                    setLoader(false)
                    dispatch({type: 'REMOVE_ITEM', payload: id})
                }, 500)
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div key={key} className={styles.Item}>
            <Loader value={loader} />
            <MyModal visible={isModal} setVisible={setIsModal}>
                <h5>{INDEX}</h5>
                {data.length > 0
                    ?
                    <div style={{display: 'flex', gap: 14, flexWrap: 'wrap'}}>
                        {data.map(lastElement => {

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
                                <div className={tempClasses.join(' ')} onClick={() => onItemClick(lastElement.id)}>
                                    <article style={{fontSize: 14, padding: '4px 14px'}}>Created: {lastElement.Created}</article>
                                    <article style={{fontSize: 14, padding: '4px 14px'}}>Date: {lastElement.createdDate}</article>
                                    <article style={{fontSize: 14, padding: '4px 14px'}}>Quantity: {lastElement.quantity} | {lastElement.JM}</article>
                                    <MyButton click={(event) => promptWithYes({event, lastElement})}>Used</MyButton>
                                </div>
                            )
                        })}
                    </div>
                    :
                    <div>
                        <h5>We don't have any item here...</h5>
                    </div>
                }
            </MyModal>
            <article
                style={{
                    display: "flex",
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 14
            }}>{INDEX} <DoubleArrowIcon onClick={() => setIsModal(true)} style={{cursor: 'pointer'}}/></article>
            <hr/>
            <article>All have: {tempQta} {JM}</article>
            <article>Pallets: ({tempPalletsQta})</article>
            <br/>
            <div style={{display: 'flex', gap: 14, flexWrap: 'wrap'}}>
                {data.slice(0, 3).map(lastElement => {

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
    );
};

export default WarehouseItem;