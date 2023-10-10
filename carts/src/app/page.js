"use client";
import styles from './page.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Home() {
  const router = useRouter();
  const [carts, setCarts] = useState([]); 

  const detalle = (id) => {
    router.push('/cart/' + id);
  };

  const cargarProductos = () => {
    axios
      .get('https://fakestoreapi.com/carts')
      .then((response) => {
        setCarts(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los productos:', error);
      });
  };
  useEffect(() => {
    cargarProductos();
  }, []); 

  return (
    <>
      <section className={styles.sectionCard}>
        {carts.map((e) => (
          <div key={e.id} className={styles.card}>
            <img class="img" src="/carrito.png" alt="Descripción de la imagen" />
            <p>userId: {e.userId}</p>
            <p>date: {e.date.split('T')[0]}</p>
            <p><button onClick={() => detalle(e.id)} className={styles.btnCart}>Abrir carrito</button></p>
          </div>
        ))}
      </section>
    </>
  )
}
