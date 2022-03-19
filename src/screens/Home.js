import React, {useEffect, useState} from 'react';
import { Table, Button, TextField,RadioGroup, Radio, Dialog } from 'ui-neumorphism';
import { addDocument, deleteDocument } from '../firebase/service'
import useFirestore from '../firebase/hook';


const headers = [
    { text: 'User order', align: 'left', value: 'user' },
    { text: 'Product name', align: 'left', value: 'product' },
    { text: 'Count', align: 'right', value: 'count' },
    { text: 'Option ice',align: 'right', value: 'ice' },
    { text: 'Option sugar',align: 'right', value: 'sugar' },
    { text: 'Action', align: 'right', value: 'button' },
]

const Home = () => {
    const [productName, setProductName] = useState('')
    const [userName, setUserName] = useState('')
    const [count, setCount] = useState(1)
    const [typeSugar, setTypeSugar] = useState('100')
    const [typeIce, setTypeIce] = useState('100')
    const [isAlert, setAlert]= useState(false)
    const [messageError, setMessageError] = useState('')
    const [arrData, setArrData] = useState([])

    
   
    const handleTextInputName = event => {
        setProductName(event.value)
    }
    const handleTextInputUser = event => {
        setUserName(event.value)
    }
    const handleTextInputCount = event => {
        setCount(event.value)
    }

    const handleDelete = (item) => {
        deleteDocument('orders',item.id)
    }
    const messages = useFirestore('orders');

    useEffect(() => {
        if(messages) {
            
            setArrData(messages ? messages.map((item) => {
                return{
                    ...item,
                    button: <Button onClick={() => handleDelete(item)}>Delete</Button>
                }
            }) : [])
        }
        
    },[messages])
    const onSelectSugar = (e) => {
        setTypeSugar(e.value)
    }
    const onSelectIce = e => {
        setTypeIce(e.value)
    }
    const handleSave = () => {
        if(!userName) {
            setAlert(true)
            setMessageError('User not emty')
            return
        } 
        if(!productName) {
            setAlert(true)
            setMessageError('Production not emty')
            return
        }
        
        const milkData  = {
            user: userName,
            product: productName,
            count: count ? count : 1 ,
            sugar: typeSugar,
            ice: typeIce
        }
        addDocument('orders',milkData)
    }
    return(
        <div className="container">
            <h2>List order</h2>
            <Dialog maxWidth={300} visible={isAlert} onClose={() => setAlert(false)}>
                    
                        <h2>{messageError ? messageError: ''}</h2>
                        <Button onClick={() => setAlert(false)}>
                            Close
                        </Button>
                </Dialog>
            
            <div className='row'>
                <div className='col'>
                    <p>Tên người order</p>
                    <TextField 
                        onChange={handleTextInputUser}
                        label='Text' 
                        className='my-3'
                        value={userName}
                    >
                        </TextField>
                    <p>Tên sản phẩm order</p>
                    <TextField 
                        value={productName}
                        onChange={handleTextInputName}
                        label='Text' 
                        className='my-3'></TextField>
                    <p>Số lượng</p>
                    <TextField 
                        value={count.toString()}
                        onChange={handleTextInputCount}
                        type='number'
                        label='Number' className='my-3'></TextField>
                    <div className='row'>
                        <div className='col'>
                            <p>Tỷ lệ đường</p>
                            <RadioGroup vertical={true} value={typeSugar} onChange={onSelectSugar} color='var(--primary)'>
                                <Radio value='0' label='0%' checked={typeSugar === '0'} />
                                <Radio value='30' label='30%' checked={typeSugar === '30'} />
                                <Radio value='50' label='50%' checked={typeSugar === '50'} />
                                <Radio value='70' label='70%' checked={typeSugar === '70'}/>
                                <Radio value='100' label='100%' checked={typeSugar === '100'} />
                            </RadioGroup>
                        </div>
                        <div className='col'>
                            <p>Tỷ lệ đá</p>
                            <RadioGroup vertical={true} value={typeIce} onChange={onSelectIce} color='var(--primary)'>
                                <Radio value='0' label='0%' />
                                <Radio value='30' label='30%' />
                                <Radio value='50' label='50%' />
                                <Radio value='70' label='70%' />
                                <Radio value='100' label='100%' />
                            </RadioGroup>
                        </div>
                    </div>
                    <Button onClick={() =>handleSave()} color='var(--primary)'>Save</Button>
                </div>
                <div className='col'>
                    <Table items={arrData} headers={headers} />
                </div>
            </div>
            
        </div>
    )
}

export default Home;