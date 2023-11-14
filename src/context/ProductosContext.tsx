import { createContext, useState, useEffect } from "react"

//@ts-ignore
let productosInicial  = []

//@ts-ignore
export const ProductosContext = createContext (productosInicial)

export function ProductosProvider({children}: {children: React.ReactNode}){

    //@ts-ignore
    const [productos, setProductos] = useState(productosInicial)

    // useEffect(() => {
    //     obtenerProductos();
    // }, []); 
    // El array vacío indica que este useEffect solo se ejecuta una vez al montar el componente
    /*Si le das un array vacío como segundo argumento, significa que no tiene dependencias, y por lo tanto, la función de efecto se ejecutará solo una vez cuando el componente se monte. */    

    async function obtenerProductos(){

        const response = await fetch ('https://fakestoreapi.com/products', {
            method: "GET",
            headers: {
                "Content-Type": "application/json", //Indico que vamos a enviar datos de tipo JSON
            },
        })

        const productos = await response.json()

        //setProductos(productos)
        console.log("funcion obtenerProuctos")
        return productos
    }

    async function filtrarProductos(busqueda: string) {

        const productosSinFiltrar = await obtenerProductos()
        
        const productosFiltrados = productosSinFiltrar.filter((producto: any) => {

            const tituloEnMinusculas = producto.title.toLowerCase();
            const descripcionEnMinusculas = producto.description.toLowerCase();
        
            return tituloEnMinusculas.includes(busqueda) || descripcionEnMinusculas.includes(busqueda);
        })

        console.log("funcion filtrarProductos")

        console.log(productosFiltrados)

        setProductos(productosFiltrados)
    }


    return(
        //@ts-ignore
        <ProductosContext.Provider value={{productos, setProductos, filtrarProductos}}>
            {children}
        </ProductosContext.Provider>
    )
}