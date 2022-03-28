import React, { useEffect, useState } from 'react';
import { Table, Dialog } from 'ui-neumorphism';
import { addDocument, deleteDocument, updateDocument } from '../firebase/service'
import useFirestore from '../firebase/hook';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import dayjs from 'dayjs';

const mb = 2;
const headers = [
    { text: 'Tên', align: 'left', value: 'user' },
    { text: 'Sản phẩm', align: 'left', value: 'product' },
    { text: 'Số lượng', align: 'right', value: 'count' },
    { text: 'Thương hiệu', align: 'right', value: 'nameBrand' },
    { text: 'Tỷ lệ đường', align: 'right', value: 'sugar' },
    { text: 'Tỷ lệ đá', align: 'right', value: 'ice' },
    { text: 'Loại', align: 'right', value: 'size' },
    { text: 'Thời gian', align: 'right', value: 'timer' },
    { text: '', align: 'right', value: 'button' },
    { text: '', align: 'right', value: 'edit' },
];

const brandData = [
    { id: 'TAY', text: 'The Alley' },
    { id: 'GCA', text: 'Gongcha' },
    { id: 'KOI', text: 'KOI' },
    { id: 'NOW', text: 'NOW' },
    { id: 'PLG', text: 'Phúc Long' },
    { id: 'TCO', text: 'Toco Toco' }
]

const Home = (props) => {
    const [productName, setProductName] = useState('')
    const [userName, setUserName] = useState('')
    const [count, setCount] = useState(1)
    const [typeBrand, setTypeBrand] = useState('KOI')
    const [typeSugar, setTypeSugar] = useState('100')
    const [typeIce, setTypeIce] = useState('100')
    const [isAlert, setAlert] = useState(false)
    const [messageError, setMessageError] = useState('')
    const [arrData, setArrData] = useState([])
    const [size, setSize] = useState('M')
    const [id, setId] = useState(null)
    const messages = useFirestore('orders');

    const handleTextInputName = event => {

        setProductName(event.target.value)
    }
    const handleTextInputUser = event => {

        setUserName(event.target.value)
    }
    const handleTextInputCount = event => {
        setCount(event.target.value)
    }

    const handleDelete = (item) => {
        deleteDocument('orders', item.id)
    }

    const handleEdit = (item) => {
        setCount(item.count ? item.count : '1')
        setUserName(item.user ? item.user : '')
        setTypeBrand(item.brand ? item.brand : 'KOI')
        setTypeIce(item.ice ? item.ice : '100')
        setTypeSugar(item.sugar ? item.sugar : '100')
        setProductName(item.product)
        setSize(item.size ? item.size : 'M')
        setId(item.id)
    }

    useEffect(() => {
        if (messages) {

            setArrData(messages ? messages.map((item) => {
                let nameBrand = ''
                if(item.brand) {
                    nameBrand = brandData.find(db => db.id === item.brand).text
                }

                return {
                    ...item,
                    nameBrand,
                    timer: dayjs(item.createdAt?.toDate().toString()).format('DD/MM/YY HH:mm'),
                    button: <Button onClick={() => handleDelete(item)} color='error'>Xoá</Button>,
                    edit: <Button onClick={() => handleEdit(item)} color='info' variant='contained'>Sửa</Button>,
                }
            }) : [])
        }

    }, [messages])

    const onSelectBrand = (e) => {
        setTypeBrand(e.target.value)
    }

    const onSelectSugar = (e) => {
        setTypeSugar(e.target.value)
    }

    const onSelectIce = e => {
        setTypeIce(e.target.value)
    }

    const onSelectSize = e => {
        setSize(e.target.value)
    }

    const handleSave = () => {
        if (!userName) {
            setAlert(true)
            setMessageError('User not emty')
            return
        }
        if (!productName) {
            setAlert(true)
            setMessageError('Production not emty')
            return
        }

        const milkData = {
            user: userName,
            product: productName,
            count: count ? count : 1,
            brand: typeBrand,
            sugar: typeSugar,
            ice: typeIce,
            size: size
        }
        
        if (id) {
            updateDocument('orders', id, milkData)
        } else {
            addDocument('orders', milkData)
        }

        setId(null)
    }

    return (
        <div>
            <Card sx={{ minWidth: 275 }}>
                <CardHeader title="Thông tin đặt món" sx={{ backgroundColor: '#687889', color: '#FFF', backgroundImage: '../../public/logo512.png' }} />
                <CardContent>
                    <Dialog maxWidth={300} visible={isAlert} onClose={() => setAlert(false)}>
                        <h2>{messageError ? messageError : ''}</h2>
                        <Button onClick={() => setAlert(false)}>
                            Đóng
                        </Button>
                    </Dialog>
                    <div className='row'>
                        <div className='col'>
                            <FormControl fullWidth sx={{ marginBottom: mb }}>
                                <TextField
                                    value={userName}
                                    onChange={handleTextInputUser}
                                    id="outlined-basic-user"
                                    label="Họ tên"
                                    variant="outlined" />
                            </FormControl>
                            <FormControl fullWidth sx={{ marginBottom: mb }}>
                                <TextField
                                    value={productName}
                                    onChange={handleTextInputName}
                                    id="outlined-basic-product"
                                    label="Sản phẩm"
                                    variant="outlined" />
                            </FormControl>
                            <FormControl fullWidth sx={{ marginBottom: mb }}>
                                <TextField
                                    value={count}
                                    onChange={handleTextInputCount}
                                    id="outlined-basic-count"
                                    label="Số lượng"
                                    variant="outlined" />
                            </FormControl>
                            <Button onClick={() => handleSave()} color="success" variant="contained" style={{ width: '100%' }}>Xác nhận đặt món</Button>
                        </div>
                        <div className='col'>
                            <div className='row'>
                                <div className='col'>
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label">Thương hiệu</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name="radio-buttons-group"
                                            value={typeBrand}
                                            onChange={onSelectBrand}
                                        >
                                            {
                                                brandData.map((item) => {
                                                    return (
                                                        <FormControlLabel value={item.id} control={<Radio />} label={item.text} />
                                                    )
                                                })
                                            }
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className='col'>
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label">Tỷ lệ đường</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name="radio-buttons-group"
                                            value={typeSugar}
                                            onChange={onSelectSugar}
                                        >
                                            <FormControlLabel value="0" control={<Radio />} label="0%" />
                                            <FormControlLabel value="30" control={<Radio />} label="30%" />
                                            <FormControlLabel value="50" control={<Radio />} label="50%" />
                                            <FormControlLabel value="70" control={<Radio />} label="70%" />
                                            <FormControlLabel value="100" control={<Radio />} label="100%" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className='col'>
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label">Tỷ lệ đá</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name="radio-buttons-group"
                                            value={typeIce}
                                            onChange={onSelectIce}
                                        >
                                            <FormControlLabel value="0" control={<Radio />} label="0%" />
                                            <FormControlLabel value="30" control={<Radio />} label="30%" />
                                            <FormControlLabel value="50" control={<Radio />} label="50%" />
                                            <FormControlLabel value="70" control={<Radio />} label="70%" />
                                            <FormControlLabel value="100" control={<Radio />} label="100%" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className='col'>
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label">Loại</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name="radio-buttons-group"
                                            value={size}
                                            onChange={onSelectSize}
                                        >
                                            <FormControlLabel value="M" control={<Radio />} label="Medium" />
                                            <FormControlLabel value="L" control={<Radio />} label="Large" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className='row' style={{ marginBottom: 50 }}>
                <div className='col'>
                    <Table flat items={arrData} headers={headers} />
                </div>
            </div>
        </div>
    )
}

export default Home;