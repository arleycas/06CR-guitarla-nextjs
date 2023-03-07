import Layout from "~/components/Layout"
import Post from "~/components/Post";
import styles from '../styles/grid.module.css'

export default function Blog({arrPosts}) {

  return (
    <Layout
      title={'Guitar LA - Nosotros'}
      description={'Blog de musica, venta de guitarras, consejos, GuitarLA'} >

      <main className="contenedor">
        <h1 className="heading">Blog</h1>

        <div className={styles.grid}>
          {
            arrPosts.map(post => (
              <Post 
                key={post.id}
                post={post.attributes}/>

            ))
          }
        </div>
      </main>
      
    </Layout>
  )
}

export async function getStaticProps() {

  const respuesta = await fetch(`${process.env.API_URL}/posts?populate=imagen`);
  const { data: arrPosts } = await respuesta.json();

  // console.log(data);
  // Es necesario que retorne un objeto con la propiedad "props"
  return {
    props:{
      arrPosts
    }
  }
}
