import React, {useEffect, useState} from 'react';
import { Table, Button,RadioGroup, Radio, Dialog } from 'ui-neumorphism';
import { addDocument, deleteDocument, updateDocument } from '../firebase/service'
import useFirestore from '../firebase/hook';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import dayjs from 'dayjs';
const headers = [
    { text: 'Tên', align: 'left', value: 'user' },
    { text: 'Sản phẩm', align: 'left', value: 'product' },
    { text: 'Số lượng', align: 'right', value: 'count' },
    { text: 'Loại', align: 'right', value: 'size' },
    { text: 'Tỷ lệ đá',align: 'right', value: 'ice' },
    { text: 'Tỷ lệ đường',align: 'right', value: 'sugar' },
    { text: 'Thời gian',align: 'right', value: 'timer' },
    { text: '', align: 'right', value: 'button' },
    { text: '', align: 'right', value: 'edit' },
]

const Home = (props) => {
    const [productName, setProductName] = useState('')
    const [userName, setUserName] = useState('')
    const [count, setCount] = useState(1)
    const [typeSugar, setTypeSugar] = useState('100')
    const [typeIce, setTypeIce] = useState('100')
    const [isAlert, setAlert]= useState(false)
    const [messageError, setMessageError] = useState('')
    const [arrData, setArrData] = useState([])
    const [size, setSize] = useState('M')
    const [id, setId] = useState(null)
   
    const handleTextInputName =  event => {
    
        setProductName(event.target.value )
    }
    const handleTextInputUser  = event => {
        
        setUserName(event.target.value )
    }
    const handleTextInputCount = event => {
        setCount(event.target.value )
    }

    const handleDelete = (item) => {
        deleteDocument('orders',item.id)
    }
   
    
    const messages = useFirestore('orders');
    const handleEdit = (item) => {
        setCount(item.count ? item.count : '1')
        setUserName(item.user ? item.user : '')
        setTypeIce(item.ice ? item.ice : '100')
        setTypeSugar(item.sugar ? item.sugar : '100')
        setProductName(item.product)
        setSize(item.size ? item.size : 'M')
        setId(item.id)
    }
    useEffect(() => {
        if(messages) {
            
            setArrData(messages ? messages.map((item) => {
                return{
                    ...item,
                    timer: dayjs(item.createdAt?.toDate().toString()).format('DD/MM/YY HH:mm'),
                    button: <Button onClick={() => handleDelete(item)}>Xoá</Button>,
                    edit: <Button onClick={() => handleEdit(item)}>Sửa</Button>,
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
    const onSelectSize = e => {
        console.log(e.value)
        setSize(e.value)
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
            ice: typeIce,
            size: size
        }
        console.log(milkData)
        if(id) {
            updateDocument('orders',id,milkData)
        }else {
            addDocument('orders',milkData)
        }

        setId(null)
    }
    console.log(messages)
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
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField
                            value={userName}
                            onChange={handleTextInputUser} 
                            id="outlined-basic-user" 
                            label="Tên người order" 
                            variant="outlined" />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField
                                value={productName}
                                onChange={handleTextInputName} 
                                id="outlined-basic-product" 
                                label="Tên sản phẩm order" 
                                variant="outlined" />
                    </FormControl>
                    
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField
                                value={count}
                                onChange={handleTextInputCount} 
                                id="outlined-basic-count" 
                                label="Số lượng" 
                                variant="outlined" />
                    </FormControl>

                   
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
                        <div className='col'>
                            <p>Loại</p>
                            <RadioGroup vertical={true} value={size} onChange={onSelectSize} color='var(--primary)'>
                                <Radio value='M' label='M' />
                                <Radio value='L' label='L' />
                                
                            </RadioGroup>
                        </div>
                    </div>
                    <Button style={{marginBottom: 50}} onClick={() =>handleSave()} color='var(--primary)'>Save</Button>
                </div>
                
            </div>
            <div className='row' style={{marginBottom: 50}}>
                    <Table items={arrData} headers={headers} />
            </div>
        </div>
    )
}

export default Home;