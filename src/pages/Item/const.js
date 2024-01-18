
export const getName = ({index, setItemData}) => {
    switch (index) {
        case 'OZ-U-255-164-295':
            setItemData((prevData) => ({...prevData, name: 'Packaging for Chemical injection system \n' +
                    '255X165X295MM, 5-layer cardboard'}))
            break
        case 'KRP-ST-CART-310-B':
            setItemData((prevData) => ({...prevData, name: 'Blue bottle for products'}))
            break
        case 'Q-C-CART-ZKK-385ML':
            setItemData((prevData) => ({...prevData, name: 'White 385ml bottle for 1 machine'}))
            break
        case 'KRP-ST-PISTON':
            setItemData((prevData) => ({...prevData, name: 'Bottle corks'}))
            break
        default:
            setItemData((prevData) => ({...prevData, name: 'Unknown items 😥'}))
            break
    }
}
export const getImg = ({index, setItemData}) => {
    switch (index) {
        case 'OZ-U-255-164-295':
            setItemData((prevData) => ({...prevData, imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5DSOHJcSmSc5fJdsdUKuB7bdUyw1Ikr0Y-26I9mfXHO5DybgDDcH00I-TxcZFJj_SdXA&usqp=CAU'}))
            break
        case 'KRP-ST-CART-310-B':
            setItemData((prevData) => ({...prevData, imgUrl: 'https://cdn.orbitvu.co/share/hYZrSm4DEiKrvmuPsB4Bf/5849818/still/view.png'}))
            break
        case 'Q-C-CART-ZKK-385ML':
            setItemData((prevData) => ({...prevData, imgUrl: 'https://static.loombard.pl/library/2023/5/19/7/md_MP0gSyzQlHcL7kSm5PsvGMACP9jRz5x4xE5YUP6F.webp'}))
            break
        case 'KRP-ST-PISTON':
            setItemData((prevData) => ({...prevData, imgUrl: 'https://www.silgancls.com/wp-content/uploads/2020/09/2020-07-Silgan-KS2800X561px.jpg'}))
            break
        default:
            setItemData((prevData) => ({...prevData, imgUrl: 'Unknown items 😥'}))
            break
    }
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