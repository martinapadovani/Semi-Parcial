import { createContext, useState, useEffect } from "react"

//@ts-ignore
let productosInicial  = []

//@ts-ignore
export const ProductosContext = createContext (productosInicial)

export function ProductosProvider({children}: {children: React.ReactNode}){
    //@ts-ignore
    const [productos, setProductos] = useState(productosInicial)


    useEffect(() => {
        obtenerProductos()
    })

    async function obtenerProductos(){

        const response = await fetch ('https://fakestoreapi.com/products', {
            method: "GET",
            headers: {
                "Content-Type": "application/json", //Indico que vamos a enviar datos de tipo JSON
            },
        })

        const productos = await response.json()

        setProductos(productos)

        return productos
    }

    const filtrarProductos = (busqueda: string) => {
        
        const productosFiltrados = productos.filter((producto: any) => {

            const tituloEnMinusculas = producto.title.toLowerCase();
            const descripcionEnMinusculas = producto.description.toLowerCase();
        
            return tituloEnMinusculas.includes(busqueda) || descripcionEnMinusculas.includes(busqueda);
        })

        setProductos(productosFiltrados)
    }


    return(
        //@ts-ignore
        <ProductosContext.Provider value={{productos, setProductos, filtrarProductos}}>
            {children}
        </ProductosContext.Provider>
    )
}