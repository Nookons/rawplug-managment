import data from '../../utils/jsonData/ItemsData.json'

export const getItem = ({index, setItemData}) => {

    data.map(element => {
        if (element.index === index) {
            setItemData((prevData) => ({
                ...prevData,
                name: element.description,
                imgUrl: element.ImageUrl
            }))
        }
    })
}

export const getRecipient = ({Recipient, setItemData}) => {

    switch (Recipient) {
        case 'PWT70':
            setItemData((prevData) => ({...prevData, to: 'Mixery Prod. Chemiczna'}))
            break
        case 'PWT10':
            setItemData((prevData) => ({...prevData, to: 'Truskarki'}))
            break
        case 'MSP':
            setItemData((prevData) => ({...prevData, to: 'Magazyn centralny (CMD)'}))
            break
        default:
            setItemData((prevData) => ({...prevData, to: 'Unknown items 😥'}))
            break
    }
}
export const getSender = ({Sender, setItemData}) => {
    switch (Sender) {
        case 'MSP':
            setItemData((prevData) => ({...prevData, from: 'Magazyn centralny (CMD)'}))
            break
        case 'PWT10':
            setItemData((prevData) => ({...prevData, from: 'Truskarki'}))
            break
        case 'PWT70':
            setItemData((prevData) => ({...prevData, from: 'Mixery Prod. Chemiczna'}))
            break
        default:
            setItemData((prevData) => ({...prevData, from: 'Unknown items 😥'}))
            break
    }
}
