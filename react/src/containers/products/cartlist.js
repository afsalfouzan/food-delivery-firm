import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from './components/customernavbar';
import {  Button } from "@mui/material";
import { ButtonGroup } from "@mui/material";
import "./products.css";
import { useDispatch } from "react-redux";
import { useCookies } from 'react-cookie';
import { confirm } from "react-confirm-box";
import { v4 as uuid } from 'uuid';
import { useNavigate } from "react-router-dom";


export default function CartList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [cookies, setCookie] = useCookies(['auth_cookie']);

    const [product, setProducts] = useState([]);
    const [Total,setTotal] = useState(0)
    const [count,setCounter] = useState(0)

    useEffect(() =>{
    
    Cartlistitem();
    },[])
    let params = { user_id: cookies.auth_cookie.users.id}
    async function Cartlistitem(){
      let tot = 0,c = 0
        const cartitems =  await dispatch.cartmodel.cartview(params)
        console.log(cartitems,"daaaaaaaaaaaash")
        setProducts(cartitems.cart.rows)
        cartitems
        .cart.rows.map((item, index) => {
          c = c + item.count
          tot = tot + item.count * item.product.price;
          setTotal(tot)
          return (
            setCounter(c)
          )
    
        })    
    }


    //delete product
    const confirmbuttons = {
      labels: {
        confirmable: "Confirm",
        cancellable: "Cancel"
      }
    }
    const deleteCartrow = async (item) => {
     let result = await confirm(`Are you sure to delete  ${item.product_name}`, confirmbuttons)
      if(result){
        let params = {id:item.id}
        await dispatch.cartmodel.removeitem(params)
      }
      let params = {user_id:item.user_id}
      Cartlistitem(params)
    }
  

    const incrementCount = async (index, item) =>{
      let productCopy = [...product];
      const itemCount = productCopy[index].count;
      productCopy[index].count = itemCount ? (itemCount + 1) : 1;
      setProducts(productCopy);
      setCounter(count+1);
      let cartit = {
        params:{
          id:item.id,
          user_id: cookies.auth_cookie.users.id
        },
       value : { count : 1 }
      }
      await dispatch.cartmodel.updateCart(cartit)
      setTotal(Total+item.product.price)
    }

    const decrementCount = async (index,item) => {
      let productCopy = [...product];
      const itemCount = productCopy[index].count
      productCopy[index].count = itemCount ? (itemCount - 1) : 0;
      setProducts(productCopy)
      if (count == 0) {
        setCounter(count)
      }
      else {  
      setTotal(Total-item.product.price)
      }
      let cartitem = {
        params:{
          id: item.id,
          user_id: cookies.auth_cookie.users.id
        },
        value:{ count : -1 }
      }
      await dispatch.cartmodel.updateCart(cartitem)
    }

    const buyOrder = async () =>{
      console.log(product,Total,"buy proooooo")
      console.log(Total,"proooooo")

      product.map(async item => {
      let refe= uuid();
      let  order = {
          reference_id : refe,
          user_id: item.user_id,
          product_id: item.product_id,
          item_count: item.count,
          amount: item.product.price * item.count
  
        }
        await dispatch.cartmodel.addorder(order)
        let params = { user_id: cookies.auth_cookie.id };
        await dispatch.cartmodel.removeitem(params)
        navigate('/products/order')
      })
    }
  return (
    <div className='cart_div'>
    <div className="side_nav">
        <Navbar />
    </div>
    <div className='table_div'>
    <TableContainer  component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ fontWeight: 'bold' }} colSpan={4}>
              Selected Products
            </TableCell>
          </TableRow>
          <TableRow >
            <TableCell style={{ fontWeight: 'bold' }}>Product Name</TableCell>
            <TableCell align="center" style={{ fontWeight: 'bold' }}>Price</TableCell>
            <TableCell align="center" style={{ fontWeight: 'bold' }}>Quantity</TableCell>
            <TableCell align="center" style={{ fontWeight: 'bold' }}>Sub Total</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Remove?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product.map((row,index) => (
            <TableRow >
              <TableCell>{row.product_name}</TableCell>
              <TableCell align="center">{row.product.price}</TableCell>
              <TableCell align="right">
              <ButtonGroup
              style={{textAlign:"center"}}
                    >
                      <Button onClick={() => { decrementCount(index,row) }}>-</Button>
                      <input className="input_count" value={row.count ? row.count : 0} />
                      <Button onClick={() => { incrementCount(index,row) }}>+</Button>
                    </ButtonGroup>
              </TableCell>
              <TableCell align="center">{row.count * row.product.price}</TableCell>
              <TableCell><Button onClick={(e)=>deleteCartrow(row)}>Remove</Button></TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={4} />            
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} align ="center" style={{ fontWeight: 'bold' }}>Total</TableCell>
            <TableCell align="center" style={{ fontWeight: 'bold' }}>{Total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    <div className='buy_button'>
        <Button variant="contained" onClick={buyOrder}>Buy</Button>
    </div>
    </div>
  );
}
