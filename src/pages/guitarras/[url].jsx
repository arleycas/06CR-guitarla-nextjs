import { useState } from "react";
import Image from "next/image";
import styles from '../../styles/Guitarras.module.css'
import Layout from "~/components/Layout";

export default function Producto({guitarra, addCarrito }) {

  const [ cantidad, setCantidad ] = useState(0);
  const { nombre, descripcion, imagen, precio } = guitarra[0].attributes;

  const handleSubmit = e => {
    e.preventDefault();

    if (cantidad < 1) return alert('Cantidad no valida');

    // Construir objeto
    const guitarraSeleccionada = {
      id: guitarra[0].id,
      imagen: imagen.data.attributes.url,
      nombre,
      precio,
      cantidad
    }    

    // Pasando la información al context
    addCarrito(guitarraSeleccionada);
  }

  return (
    <Layout
      title={`Guitarra ${nombre}`}>
      <div className={styles.guitarra}>
        <Image 
          src={imagen.data.attributes.url} 
          width={600} 
          height={400} 
          alt={`Guitarra ${nombre}`} />

          <div className={styles.contenido}>
            <h3>{nombre}</h3>
            <p className={styles.descripcion}>{descripcion}</p>
            <p className={styles.precio}>${precio}</p>

            <form 
              onSubmit={handleSubmit}
              className={styles.formulario}>
              <label htmlFor="cantidad">Cantidad:</label>

              <select
                onChange={e => setCantidad(+e.target.value)}
                id="cantidad">
                <option value="0">-- Seleccione --</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>

              <input 
                type='submit'
                value='Agregar al carrito' />
            </form>
          </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const respuesta = await fetch(`${process.env.API_URL}/guitarras`);
  const { data } = await respuesta.json();

  const paths = data.map(guitarra => ({
      params: {
        url: guitarra.attributes.url
      }
    }))

  return {
    paths,
    fallback: false // si es false y hago una consulta que no existe, se genera una pag 404, si se deja como true me toca a mi manualmente validar el 404
  }
}

export async function getStaticProps({params}) {

  const respuesta = await fetch(`${process.env.API_URL}/guitarras?filters[url]=${params.url}&populate=imagen`);
  const { data: guitarra } = await respuesta.json();

  // console.log(data);
  // Es necesario que retorne un objeto con la propiedad "props"
  return {
    props:{
      guitarra
    }
  }
}

// export async function getServerSideProps({query}) {

//   const respuesta = await fetch(`${process.env.API_URL}/guitarras?filters[url]=${query.url}&populate=imagen`);
//   const { data: guitarra } = await respuesta.json();

//   // console.log(data);
//   // Es necesario que retorne un objeto con la propiedad "props"
//   return {
//     props:{
//       guitarra
//     }
//   }
// }