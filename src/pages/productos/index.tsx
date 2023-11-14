import ProductosCard from "@/components/ProductosCard"
import { ProductosContext } from "@/context/ProductosContext"
import { useContext } from "react"

type Product = {
    id: number
    title:string
    price:number
    category: string
    image: string
}

export default function Productos(){
    
    //@ts-ignore
    const {productos} = useContext(ProductosContext) 

    console.log(productos)

    return(
        <section className= " bg-fondoMain my-12 m-auto h-3/4 w-10/12 text-gray-600 body-font">
        
            <div className="container px-5 py-24 mx-auto">

                <div className="flex flex-wrap -m-4">
                {productos.map((producto:Product, index:number) => ( 
                    <ProductosCard 
                        key={index}
                        id={producto.id}
                        titulo={producto.title}
                        precio={producto.price}
                        categoria={producto.category}
                        imagen={producto.image}
                    />
                ))}
                </div>

            </div>
        </section>
    )
}