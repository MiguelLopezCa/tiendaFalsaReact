"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './page.module.css';

function ListaProductos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    cargarProductos();
  }, []); 

  return (
    <div>
      <h1 class="h1">Lista de Productos</h1>
      <div className={styles['product-list']}>
        {productos.map((producto) => (
          <div key={producto.id} className={styles['product-card']}>
            <div className={styles['product-details']}>
              <div className={styles['product-image']}>
                <img src={producto.image} alt="Imagen del Producto" />
              </div>
              <div className={styles['product-info']}>
                <h2>{producto.title}</h2>
                <p>Precio: ${producto.price}</p>
                <p>Descripción: {producto.description}</p>
                <p>Categoría: {producto.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaProductos;
