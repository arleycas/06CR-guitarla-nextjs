import Layout from "~/components/Layout"
import Guitarra from "~/components/Guitarra"
import styles from '../styles/grid.module.css'

export default function Tienda({arrGuitarras}) {

  return (
    <Layout
      title={'Guitar LA - Nosotros'}
      description={'Tienda virtual, venta de guitarras, instrumentos y más'} >

      <main className="contenedor">
        <h1 className="heading">Nuestra colección</h1>
        
        <div className={styles.grid}>
          {arrGuitarras?.map(guitarra => (
            <Guitarra 
              key={guitarra.id}
              guitarra={guitarra.attributes}/>
          ))}
        </div>

      </main>
      
    </Layout>
  )
}

export async function getServerSideProps() {
  const respuesta = await fetch(`${process.env.API_URL}/guitarras?populate=imagen`);
  const { data: arrGuitarras } = await respuesta.json();

  // console.log(arrGuitarras);
  // Es necesario que retorne un objeto con la propiedad "props"
  return {
    props:{
      arrGuitarras
    }
  }
}