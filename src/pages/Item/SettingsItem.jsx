import React from 'react';
import styles from './Item.module.css';
import { Skeleton } from '@mui/material';
import Barcode from 'react-barcode';

const renderSkeletonOrValue = (value, skeletonProps) => (
    value ? value : <Skeleton {...skeletonProps} />
);

const SettingsItem = ({ currentItem, itemData }) => {
    const renderMark = (label, value) => (
        <article className={styles.Mark}>
            {label}:
            <span> {renderSkeletonOrValue(value, { width: 250, height: 25, variant: 'rounded' })}</span>
        </article>
    );

    return (
        <div className={styles.Settings}>
            <h5>Index: <span>{renderSkeletonOrValue(currentItem?.index)}</span></h5>
            <article style={{ color: 'gray' }}>#
                <span> {renderSkeletonOrValue(currentItem?.PalletReceipt)}</span>
            </article>
            <article style={{ color: 'gray' }}>{itemData.name}</article>
            <hr />

            {renderMark('Add date', currentItem?.createdDate)}
            {renderMark('Created', currentItem?.Created)}
            {renderMark('Quantity', currentItem?.quantity + ' | ' + currentItem?.JM)}
            {renderMark('Status', currentItem?.status)}

            <article className={styles.Mark}>
                Sender:
                <span> {renderSkeletonOrValue(currentItem?.Sender)}</span>
                <br />
                <span> || {itemData.from}</span>
            </article>

            <article className={styles.Mark}>
                To:
                <span> {renderSkeletonOrValue(currentItem?.Recipient)}</span>
                <br />
                <span> || {itemData.to}</span>
            </article>

            {currentItem && <Barcode width={3} height={50} fontSize={16} value={currentItem.PalletReceipt} />}
        </div>
    );
};

export default SettingsItem;
