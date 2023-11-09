import { useRouter } from "next/router";
import { useState } from "react";
import ProductosCard from '@/components/ProductosCard'

export default function Productos(){

    const [productos, setProductos] = useState([])

    // Obtén el objeto router
    const router = useRouter();

    // Accede al valor de la variable de ruta [categorias]
    const {categoria}  = router.query;
    //router.query me da acceso al valor de la variable de ruta en el componente.
    
    async function obtenerProductosCategoria (){

        const response = await fetch(`https://fakestoreapi.com/products/category/${categoria}`, {
            //Indico la ruta y configuracion de mi peticion
            method: "GET",
            headers: {
              //metadatos de la peticion que brindan un contexto 
              "Content-Type": "application/json", //Indico que vamos a enviar datos de tipo JSON
            },
        })
        
        const productos = await response.json()

        setProductos(productos)

        return productos
    }

    obtenerProductosCategoria()

    return (

        <section className= " bg-fondoMain my-12 m-auto h-3/4 w-10/12 text-gray-600 body-font">
        
            <div className="container px-5 py-24 mx-auto">

                <div className="flex flex-wrap -m-4">
                {productos.map((producto:any, index:any) => ( 
                    <ProductosCard 
                        key={index}
                        titulo={producto.title}
                        precio={producto.price}
                        descripcion={producto.descripcion}
                        imagen={producto.image }
                    />
                ))}
                </div>

            </div>
        </section>

    )

}