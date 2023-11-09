import Image from 'next/image'
import { Inter } from 'next/font/google'
import CategoriaCard from '@/components/CategoriaCard'
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })


export default function Home() {

  const [categorias, setCategorias] = useState([]);

  async function obtenerCategorias(){

    const response = await fetch("https://fakestoreapi.com/products/categories", {
      //Indico la ruta y configuracion de mi peticion
      method: "GET",
      headers: {
        //metadatos de la peticion que brindan un contexto 
        "Content-Type": "application/json", //Indico que vamos a enviar datos de tipo JSON
      },
    })

    const categoriasAPI = await response.json()

    const imagenesPredeterminadas = {
      electronics: '/electronics.jpg',
      jewelry: '/jewelry.jpeg',
      'men\'s clothing': '/men-clothing.webp',
      'women\'s clothing': '/women-clothing.jpg',
    };

    //Asigno imágenes a cada categoría
    const categorias = categoriasAPI.map(categoria => ({
      nombre: categoria,
      imagen: imagenesPredeterminadas[categoria],
    }));

    setCategorias(categorias)

    return categorias
  } 
  
  obtenerCategorias()


  return (

    <section className="bg-fondoMain my-12 m-auto h-3/4 w-10/12">
      <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
        <div className="grid w-full grid-cols-1 gap-6 mx-auto lg:grid-cols-4">

        {categorias.map((categoria:any, index:any) => (
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
