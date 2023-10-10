"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import DetalleProducto from "./DetalleProducto";
import axios from "axios";

export default function DetalleCart({ params }) {
  const [products, setProducts] = useState([]);
  const [detalleProduct, setDetalleProduct] = useState(null);
  const [indexProduct, setIndexProduct] = useState(0);

  const detalle = (producto, index) => {
    setDetalleProduct(producto);
    setIndexProduct(index + 1);
  };

  useEffect(() => {
    const getSingleCart = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/carts/${params.id}`
        );
        const data = response.data;
        const productIds = data.products.map((producto) => producto.productId);
        const productDetails = await Promise.all(
          productIds.map(async (productId) => {
            const productResponse = await axios.get(
              `https://fakestoreapi.com/products/${productId}`
            );
            return productResponse.data;
          })
        );

        setProducts(productDetails);
      } catch (error) {
        console.log(error);
      }
    };

    getSingleCart();
  }, [params.id]);

  return (
    <section>
      <div className={styles.sectionProduct}>
        <h1>Id Carrito: {params.id}</h1>
        <div className={styles.productImages}>
          {products.map((producto, index) => (
            <img
              onClick={() => detalle(producto, index)}
              src={producto.image}
              alt={`Producto ${producto.id}`}
              key={producto.id}
              className={styles.productImage}
            />
          ))}
        </div>
        <div>
          {detalleProduct && (
            <div>
              <DetalleProducto
                index={indexProduct}
                detalleProduct={detalleProduct}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
