import React, {useState} from 'react';
import styles from './Item.module.css';
import {FormControl, InputAdornment, OutlinedInput, Skeleton} from '@mui/material';
import Barcode from 'react-barcode';

const renderSkeletonOrValue = (value, skeletonProps) => (
    value ? value : <Skeleton {...skeletonProps} />
);

const getSmileType = (type) => {
    switch (type) {
        case "Barrel" :
            return '🛢️'
        case "Carton" :
            return '📦'
        case "Cartridge" :
            return '🍾'
        case "Chemical" :
            return '🚰'
        default:
            break
    }
}

const SettingsItem = ({currentItem, itemData, change}) => {
    const renderMark = (label, value) => (
        <article className={styles.Mark}>
            {label}:
            <span> {renderSkeletonOrValue(value, {width: 250, height: 25, variant: 'rounded'})}</span>
        </article>
    );

    const [formData, setFormData] = useState({
        index: '',
        description: '',
        FromDepartment: '',
        JM: '',
        ToDepartment: '',
        quantity: 0,
        status: '',
    });

    const handleInputChange = (type, value, event) => {
        setFormData((prevData) => ({...prevData, [type]: value}));
    };

    return (
        <div className={styles.Settings}>
            <h3>Index: <span>{renderSkeletonOrValue(currentItem?.index)} {getSmileType(currentItem.type)}</span></h3>
            <article style={{color: 'gray'}}>#
                <span> {renderSkeletonOrValue(currentItem?.PalletReceipt)}</span>
            </article>
            <article style={{color: 'gray'}}>{itemData.name}</article>
            <br/>
            {renderMark('Add date', currentItem?.createdDate)}
            {renderMark('Last change date', currentItem?.lastChange)}
            {renderMark('Created', currentItem?.Created)}
            {renderMark('Quantity', currentItem?.quantity + ' | ' + currentItem?.JM)}
            {renderMark('Status', currentItem?.status)}
            {currentItem.batchNumber ? renderMark('Batch Number', currentItem?.batchNumber) : null}


            <article className={styles.Mark}>
                Sender:
                <span> {renderSkeletonOrValue(currentItem?.Sender)}</span>
                <br/>
                <span> || {itemData.from}</span>
            </article>

            <article className={styles.Mark}>
                To:
                <span> {renderSkeletonOrValue(currentItem?.Recipient)}</span>
                <br/>
                <span> || {itemData.to}</span>
            </article>
        </div>
    );
};

export default SettingsItem;
