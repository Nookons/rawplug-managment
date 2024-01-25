import React from 'react';
import Barcode from "react-barcode";
import dayjs from "dayjs";


const SettingsToPrint = ({isActive, currentItem, itemData }) => {
    const PRINT_DATE = dayjs().toDate().toDateString()
    const ACTION_ID = Date.now();

    const HOUR      = dayjs().get('hour')
    const MINUTES   = dayjs().get('minute')

    let myMinutes = '00'

    if (MINUTES.toString().length < 2) {
        myMinutes = '0' + MINUTES;
    }else {
        myMinutes = MINUTES
    }

    return (
        <div style={{
            position: 'fixed',
            left: 0,
            right: 0,
            padding: '3vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '100dvh',
            zIndex: '-12'
        }}>
            <div>
                <h4>ORIGINAL ☑</h4>
                <h6 style={{fontSize: '14px'}}>
                    ul.Kwidzyncka 6 51-416 Wroclaw
                </h6>
                <br/>
                <article style={{fontSize: '14px', color: 'gray'}}>Pallet Barcode:</article>
                {currentItem && <Barcode width={3.5} height={50} fontSize={12} value={currentItem.PalletReceipt} />}
                <br/>
                <br/>
                <h5 style={{fontSize: '44px'}}>Index: <span>{currentItem?.index}</span></h5>
                <article style={{ color: 'gray' }}>{itemData.name}</article>
                <article style={{ color: 'gray' }}>Action ID: {ACTION_ID}</article>

                <hr />
            </div>

            <div>
                <article style={{fontSize: '24px', marginTop: 14}}>
                    Item created date:
                    <span> {currentItem?.createdDate}</span>
                </article>
                <article style={{fontSize: '24px', marginTop: 14}}>
                    Last change date:
                    <span> {currentItem?.lastChange}</span>
                </article>
                <article style={{fontSize: '24px', marginTop: 14}}>
                    Created by:
                    <span> {currentItem?.Created} (Dmytro)</span>
                </article>
                <article style={{fontSize: '24px', marginTop: 14}}>
                    Quantity:
                    <span> {currentItem?.quantity} (sht)</span>
                </article>
                <article style={{fontSize: '24px', marginTop: 14}}>
                    Status:
                    <span> {currentItem?.status} </span>
                </article>
            </div>
            <div>
                <article style={{fontSize: '34px'}}>
                    Sender:
                    <span> {currentItem?.Sender}</span>
                    <br />
                    <span> || {itemData.from}</span>
                </article>
                <br/>
                <article style={{fontSize: '34px'}}>
                    To:
                    <span> {currentItem?.Recipient}</span>
                    <br />
                    <span> || {itemData.to}</span>
                </article>
            </div>
            <div>
                <h4>Remarks:</h4>
                <hr/>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '0.3fr 1fr',
                    gap: 4
                }}>
                    <div style={{border: '1px solid black', borderRadius: 4, minHeight: 50, display: 'flex', alignItems: 'center', paddingLeft: 14}}>Name:</div>
                    <div style={{border: '1px solid black', borderRadius: 4, minHeight: 50}}></div>
                    <div style={{border: '1px solid black', borderRadius: 4, minHeight: 50, display: 'flex', alignItems: 'center', paddingLeft: 14}}>Name:</div>
                    <div style={{border: '1px solid black', borderRadius: 4, minHeight: 50}}></div>
                </div>
            </div>
            <div>
                <h6>Print date: {PRINT_DATE} at: {HOUR}:{myMinutes}</h6>
                <h6 style={{fontSize: '14px', color: 'gray'}}>Created by <span style={{color: '#464eff'}}>Rawplug Managmnet®</span></h6>
            </div>
        </div>
    );
};

export default SettingsToPrint;