export async function buscarProductos(busqueda: string){

    async function obtenerProductos(){

        const response = await fetch ('https://fakestoreapi.com/products', {
            method: "GET",
            headers: {
                "Content-Type": "application/json", //Indico que vamos a enviar datos de tipo JSON
            },
        })

        const productos = await response.json()

        return productos
    }

    let productos = await obtenerProductos()

    console.log(productos)
    console.log(busqueda)

    const resultadosBusqueda = productos.filter((producto: any) => {

        const tituloEnMinusculas = producto.title.toLowerCase();
        const descripcionEnMinusculas = producto.description.toLowerCase();
    
        return tituloEnMinusculas.includes(busqueda) || descripcionEnMinusculas.includes(busqueda);
    })

    console.log(resultadosBusqueda)

    return resultadosBusqueda
}