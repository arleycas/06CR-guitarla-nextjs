import Image from "next/image"
import Layout from "~/components/Layout"
import styles from '../styles/Nosotros.module.css'

export default function Nosotros() {
  return (
    <Layout
      title={'Guitar LA - Nosotros'}
      description={'Blog de musica, venta de guitarras y más'} >

      <main className="contenedor">
        <h1 className="heading">Nosotros</h1>

        <div className={styles.contenido}>
          <Image src='/img/nosotros.jpg' alt='Imagen about us' width={1000} height={800}/>

          <div>
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquam et odio et vestibulum. Mauris efficitur sit amet mauris non accumsan. Sed porta viverra tortor, id scelerisque purus laoreet id. Nam mollis id odio vel pharetra.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquam et odio et vestibulum. Mauris efficitur sit amet mauris non accumsan. Sed porta viverra tortor, id scelerisque purus laoreet id. Nam mollis id odio vel pharetra.</p>
          </div>

        </div>

      </main>
      
    </Layout>
  )
}
