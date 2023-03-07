import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Header.module.css'

export default function Header() {

  const router = useRouter();
  
  const isLinkActive = (pathname) => {
    if (router.pathname === pathname) return styles.active
  }

  return (
    <header className={styles.header}>
      <div className={`contenedor ${styles.barra}`}>
        <Link href='/'>
          <Image src='/img/logo.svg' alt="Imagen logotipo" width={300} height={40} />
        </Link>

        <nav className={styles.navegacion}>
          <Link className={isLinkActive('/')} href='/'>Inicio</Link>
          <Link className={isLinkActive('/nosotros')} href='/nosotros'>Nosotros</Link>
          <Link className={isLinkActive('/tienda')} href='/tienda'>Tienda</Link>
          <Link className={isLinkActive('/blog')} href='/blog'>Blog</Link>
          <Link className={isLinkActive('/carrito')} href='/carrito'>
            <Image src='/img/carrito.png' width={30} height={25} alt='Carrito de compras'/>
          </Link>
        </nav>

      </div>
    </header>
  )
}
