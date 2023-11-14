import ProductoCard from "@/components/ProductoCard"

type Product = {
    id: number
    title:string
    description: string
    price:number
    category: string
    image: string

}

export default function Producto({ producto }: { producto: Product}){
    return(

        <ProductoCard
        key={producto.id}
        id={producto.id}
        titulo={producto.title}
        descripcion={producto.description}
        categoria={producto.category}
        precio={producto.price}
        imagen={producto.image}
        ></ProductoCard>
    )
}

export async function getServerSideProps(context: any){

    const id = context.params.producto

    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        //Indico la ruta y configuracion de mi peticion
        method: "GET",
        headers: {
          //metadatos de la peticion que brindan un contexto 
          "Content-Type": "application/json", //Indico que vamos a enviar datos de tipo JSON
        },
    })

    const producto = await response.json()

    console.log(producto)

    return {props: {producto}}
}