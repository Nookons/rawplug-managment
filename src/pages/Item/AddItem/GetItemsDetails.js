
const getDescription = ({index}) => {
    switch (index) {
        case 'OZ-U-255-164-295':
            return 'Packaging for Chemical injection system 255X165X295MM, 5-layer cardboard'
        case 'KRP-ST-CART-310-B':
            return 'Blue cartridges for products'
        case 'Q-C-CART-ZKK-385ML':
            return 'White 385ml bottle for 1 machine'
        case 'KRP-ST-PISTON':
            return 'Bottle corks'
        case 'KRP-ST-PISTON-B':
            return 'Blue bottle corks'
        case 'Q-C-HDK-S13':
            return 'Synthetic, hydrophilic, amorphous silica, produced via flame hydrolysis'
        default:
            return  'Unknown items 😥'
    }
}

export const getItemDetails = ({setFormData, formData}) => {
    const index = formData.index

    switch (index) {
        case 'KRP-ST-CART-310-B' :
            setFormData((prevData) => ({
                ...prevData,
                quantity: 936,
                FromDepartment: 'MSP',
                ToDepartment: 'PWT70',
                status: 'Available',
                description: getDescription({index}),
            }));
            break
        case 'OZ-U-255-164-295' :
            setFormData((prevData) => ({
                ...prevData,
                quantity: 400,
                FromDepartment: 'MSP',
                ToDepartment: 'PWT70',
                description: getDescription({index}),
                status: 'Available',
            }));
            break
        case 'Q-C-CART-ZKK-385ML' :
            setFormData((prevData) => ({
                ...prevData,
                quantity: 0,
                FromDepartment: 'MSP',
                ToDepartment: 'PWT70',
                description: getDescription({index}),
                status: 'Available',
            }));
            break
        case 'KRP-ST-PISTON' :
            setFormData((prevData) => ({
                ...prevData,
                quantity: 0,
                FromDepartment: 'MSP',
                ToDepartment: 'PWT70',
                description: getDescription({index}),
                status: 'Available',
            }));
            break
        case 'KRP-ST-PISTON-B' :
            setFormData((prevData) => ({
                ...prevData,
                quantity: 0,
                FromDepartment: 'MSP',
                ToDepartment: 'PWT70',
                description: getDescription({index}),
                status: 'Available',
            }));
            break
        case 'Q-C-HDK-S13' :
            setFormData((prevData) => ({
                ...prevData,
                quantity: 0,
                FromDepartment: 'MSP',
                ToDepartment: 'PWT70',
                description: getDescription({index}),
                status: 'Available',
            }));
            break
        default:
            setFormData({
                index: '',
                FromDepartment: '',
                ToDepartment: '',
                quantity: 0,
                status: '',
                description: getDescription({index}),
            })
    }
}