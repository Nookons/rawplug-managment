import data from '../../../utils/ItemsData.json'

export const getItemDetails = ({setFormData, formData}) => {
    const index = formData.index

    data.map(e => {
        if (index === e.index) {
            setFormData((prevData) => ({
                ...prevData,
                quantity: Number(e.palletQta),
                JM: e.JM,
                FromDepartment: 'MSP',
                ToDepartment: 'PWT70',
                description: e.description,
                status: 'Available',
            }));
        }
    })
}