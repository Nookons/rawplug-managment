import data from '../../../utils/jsonData/ItemsData.json'
import dataPallets from '../../../utils/jsonData/PalletsData.json'

export const getItemDetails = ({setFormData, formData}) => {
    const index = formData.index

    data.map(e => {
        if (index === e.index) {
            setFormData((prevData) => ({
                ...prevData,
                quantity: Number(e.palletQta),
                JM: e.JM,
                type: e.type,
                FromDepartment: 'MSP',
                ToDepartment: 'PWT70',
                description: e.description,
                status: 'Available',
            }));
        }
    })
}
export const getPalletDetails = ({setFormData, formData}) => {
    const index = formData.index

    dataPallets.map(e => {
        if (index === e.index) {
            setFormData((prevData) => ({
                ...prevData,
                quantity: Number(e.palletQta * e.atBox),
                JM: e.JM,
                imgUrl: e.imageUrl,
                type: e.type,
                FromDepartment: 'MSP',
                ToDepartment: 'PWT70',
                description: e.description,
                status: 'Available',
            }));
        }
    })
}