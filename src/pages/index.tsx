
import { Inter } from 'next/font/google'
import CategoriaCard from '@/components/CategoriaCard'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

type Categoria = {
  nombre: string
  imagen: string
}

export default function Home( {categorias}: {categorias: Categoria[]}) {

  const [productos, setProductos] = useState([])

  return (
    <section className="bg-fondoMain my-12 m-auto h-3/4 w-10/12">
      <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
        <div className="grid w-full grid-cols-1 gap-6 mx-auto lg:grid-cols-4">

        {categorias.map((categoria:Categoria, index:number) => (
          <CategoriaCard  
            key={index}
            categoria={categoria.nombre}
            imagen={categoria.imagen }
          />
        ))}

        </div>
      </div>
    </section>
  )

}

export async function getServerSideProps(context: any){

  const response = await fetch("https://fakestoreapi.com/products/categories", {
    //Indico la ruta y configuracion de mi peticion
    method: "GET",
    headers: {
      //metadatos de la peticion que brindan un contexto 
      "Content-Type": "application/json", //Indico que vamos a enviar datos de tipo JSON
    },
  })

  const categoriasAPI = await response.json()

  console.log(categoriasAPI)

  const imagenesPredeterminadas: any = {
    electronics: '/electronics.jpg',
    jewelry: '/jewelry (2).jpeg',
    'men\'s clothing': '/men-clothing.webp',
    'women\'s clothing': '/women-clothing.jpg',
  };

  //Asigno imágenes a cada categoría
  // Suponiendo que categoriasAPI es un arreglo de cadenas
  const categorias = categoriasAPI.map((categoria: string) => ({
    nombre: categoria,
    imagen: imagenesPredeterminadas[categoria] || '', // Proporciona una cadena vacía si la imagen es undefined
  }));


  return {props: {categorias}}
}
