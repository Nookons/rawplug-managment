import data from '../../utils/ItemsData.json'

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
            setItemData((prevData) => ({...prevData, to: 'Mixery Prod. test'}))
            break
        case 'MSP':
            setItemData((prevData) => ({...prevData, from: 'Magazyn centralny (CMD)'}))
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
        case 'PWT70':
            setItemData((prevData) => ({...prevData, to: 'Mixery Prod. Chemiczna'}))
            break
        default:
            setItemData((prevData) => ({...prevData, from: 'Unknown items 😥'}))
            break
    }
}
