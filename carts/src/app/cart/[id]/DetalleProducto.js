"use client";
import { useEffect, useState } from "react"
import styles from './page.module.css'

export default function DetalleProducto({detalleProduct,index}){
    const [detalle,setDetalle]=useState()
    const [visible,setVisible]=useState(false)
    useEffect(()=>{
        setDetalle(detalleProduct)
        detalleProduct!=null?setVisible(true):setVisible(false)

    },[detalleProduct])

    return(
        <>
            {visible&&
            <div >
                <h2>Detalle Producto {index}</h2>
                <h4>Id del producto: {detalle.productId}</h4>
                <p>Cantidad: {detalle.quantity}</p>
            </div>
            }
            
        </>
    )
}