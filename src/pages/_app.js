import { useState, useEffect } from 'react'
import '~/styles/globals.css'

export default function App({ Component, pageProps }) {

  // con esto nos aseguramos que esto solo se ejecute en la parte del cliente y no del servidor
  const INITIAL = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('arrCarrito')) ?? [] : [];
  const [arrCarrito, setArrCarrito] = useState(INITIAL);
  const [paginaLista, setPaginaLista] = useState(false);

  useEffect(() => {
    // esperamos a que el documento esté listo
    setPaginaLista(true)
  }, []);

  useEffect(() => {
    //* nota: Lo que esté dentro de un useEffect en nextjs se ejecuta en la parte del cliente no en el servidor
    // si localstorage se pone fuera del useEffect, se ejecuta tanto en el cliente como en el servidor
    localStorage.setItem('arrCarrito', JSON.stringify(arrCarrito));
  }, [arrCarrito])


  const addCarrito = guitarra => {
    // verificar si una guitarra igual ya está en el carrito
    if (arrCarrito.some(guitarraState => guitarraState.id === guitarra.id)) {

      // iterar sobre el arreglo e indentificar el elemento duplicado
      const arrCarritoActualizado = arrCarrito.map(guitarraState => {
        if (guitarraState.id === guitarra.id) guitarraState.cantidad = guitarra.cantidad; // Reescribir la cantidad
        return guitarraState;
      });

      setArrCarrito(arrCarritoActualizado);

    } else {
      setArrCarrito([...arrCarrito, guitarra]) // agrega nuevo elemento a carrito
    }
  }

  const updateCantidad = guitarra => {
    const arrCarritoActualizado = arrCarrito.map(guitarraState => {
      if (guitarraState.id === guitarra.id) guitarraState.cantidad = guitarra.cantidad;
      return guitarraState;
    })

    setArrCarrito(arrCarritoActualizado)
  }

  const deleteGuitarra = id => {
    const arrCarritoActualizado = arrCarrito.filter(guitarraState => guitarraState.id !== id);
    setArrCarrito(arrCarritoActualizado);
  }

  return paginaLista ? <Component {...pageProps}
    arrCarrito={arrCarrito}
    addCarrito={addCarrito}
    deleteGuitarra={deleteGuitarra}
    updateCantidad={updateCantidad} /> : null
}
