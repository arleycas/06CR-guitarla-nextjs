import { useEffect, useState } from "react"
import Image from "next/image"
import Layout from "~/components/Layout"
import styles from '../styles/Carrito.module.css'

export default function Carrito({ arrCarrito, updateCantidad, deleteGuitarra }) {

  const [ total, setTotal ] = useState(0);

  useEffect(() => {
    const calculoTotal = arrCarrito.reduce( (total, producto) => total + (producto.cantidad * producto.precio), 0);
    setTotal(calculoTotal);
  }, [arrCarrito]);

  return (
    <Layout
      title={'Guitar LA - Carrito de compras'}
      description={'Blog de musica, venta de guitarras, consejos, GuitarLA'} >
        
        <main className='contenedor'>
          <h1 className="heading">Carrito</h1>
          
          <div className={styles.contenido}>
            <div className={styles.carrito}>
              <h2>Articulos</h2>

              { arrCarrito?.length === 0 ? 'Carrito vacio' : (
                arrCarrito?.map(producto => (
                  <div key={producto.id} className={styles.producto}>
                    <div>
                      <Image width={250} height={480} src={producto.imagen} alt={producto.nombre}/>
                    </div>
                  
                    <div>
                      <p className={styles.nombre}>{producto.nombre}</p>

                      <div className={styles.cantidad}>
                        <select 
                          className={styles.select}
                          value={producto.cantidad}
                          onChange={e => updateCantidad({
                            id: producto.id,
                            cantidad: e.target.value
                          })}>
                          <option value='1'>1</option>
                          <option value='2'>2</option>
                          <option value='3'>3</option>
                          <option value='4'>4</option>
                          <option value='5'>5</option>
                        </select>
                      </div>

                      <p className={styles.precio}>$<span>{producto.precio}</span></p>
                      <p className={styles.subtotal}>Subtotal: $<span>{producto.cantidad * producto.precio}</span></p>
                    </div>

                    <button
                      className={styles.eliminar}
                      type='button'
                      onClick={() => deleteGuitarra(producto.id)}>
                      X
                    </button>
                  </div>
                ))
              )}

            </div>

            <aside className={styles.resumen}>
              <h1>Resumen del pedido</h1>
              <p>Total a pagar: ${total} </p>
            </aside>
          </div>

        </main>
      </Layout>
  )
}
