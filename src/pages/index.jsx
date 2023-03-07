import Layout from "~/components/Layout"
import Guitarra from "~/components/Guitarra";
import Post from "~/components/Post";
import Curso from "~/components/Curso";
import styles from '../styles/grid.module.css'

export default function Home({ arrGuitarras, arrPosts, dataCurso }) {

  // console.table(arrGuitarras);
  // console.table(arrPosts);
  // console.log(arrCurso);
  return (
    <>
      <Layout
        title={'Guitar LA - Inicio'}
        description={'Sobre nosotros, venta de guitarras y más'} >

        <main className="contenedor">
          <h1 className="heading">Nuestra colección</h1>
          <div className={styles.grid}>
            {arrGuitarras?.map(guitarra => (
              <Guitarra
                key={guitarra.id}
                guitarra={guitarra.attributes} />
            ))}
          </div>
        </main>

        <Curso curso={dataCurso}/>

        <section className="contenedor">
          <h2 className="heading">Blog</h2>

          <div className={styles.grid}>
          {
            arrPosts.map(post => (
              <Post 
                key={post.id}
                post={post.attributes}/>

            ))
          }
        </div>

        </section>

      </Layout>
    </>
  )
}

export async function getStaticProps() {

  const urlGuitarras = `${process.env.API_URL}/guitarras?populate=imagen`;
  const urlPosts = `${process.env.API_URL}/posts?populate=imagen`;
  const urlCurso = `${process.env.API_URL}/curso?populate=imagen`;

  const [resGuitarras, resPosts, resCurso] = await Promise.all([
    fetch(urlGuitarras),
    fetch(urlPosts),
    fetch(urlCurso)
  ]);

  const [{ data: arrGuitarras }, { data: arrPosts }, { data: dataCurso }] = await Promise.all([
    resGuitarras.json(),
    resPosts.json(),
    resCurso.json(),
  ]);

  // Es necesario que retorne un objeto con la propiedad "props"
  return {
    props: {
      arrGuitarras,
      arrPosts,
      dataCurso
    }

  }
}