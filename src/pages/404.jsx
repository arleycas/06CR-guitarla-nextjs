import Link from "next/link"
import Layout from "~/components/Layout"

export default function Pagina404() {
  return (
    <Layout
      title="Página no encontrada 🥺">
        <p className="error">Página no encontrada</p>
        <Link href='/' className="error-enlace">Ir a inicio 🏠</Link>
    </Layout>
  )
}
