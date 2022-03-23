import { useEffect, useState } from 'react'
import {Card,CardContent,Body2,Button,CardAction,CardMedia} from 'ui-neumorphism'
import useFirestore from '../firebase/hook';
import { addDocument } from '../firebase/service'
const Menu = () => {
    const [productName, setProductName] = useState([])

    const products = useFirestore('productToco');
    useEffect(() => {
        if(products) {
            setProductName(products ? products : [])
        }else {
            setProductName([])
        }
    },[products])
    console.log(products)
    const handleChoose = (product) => {
        const milkData  = {
            product: product.name
        }
        addDocument('orders',milkData)
        return alert('Bạn đã chọn thành công.')
    }
    if(!productName) return <div>No item</div>
    return(
        <div style={{display: 'grid',gridTemplateColumns:'auto auto auto auto'}}>
            {
                productName ? productName.map((product,index) => {
                    return(
                        <Card key={index} elevation={4}  style={{margin:10}}>
                            <CardMedia
                                src={product.img}
                            />
                            <CardContent>
                                
                                <Body2>
                                    {product?.name}
                                </Body2>
                            </CardContent>
                            <CardAction>
                                <Button onClick={() => handleChoose(product)} text color='var(--primary)'>
                                Chọn
                                </Button>
                                
                            </CardAction>
                        </Card>
                    )
                }) : null
            }
            
            
            
            
            
        </div>
    )
}

export default Menu;