import ProductosCard from '@/components/ProductosCard'

//Establezco un tipo para productos
type Product = {

    title:string
    price:number
    image: string
}

export default function Productos({ productos }: { productos: Product[] }) {

    return (

        <section className= " bg-fondoMain my-12 m-auto h-3/4 w-10/12 text-gray-600 body-font">
        
            <div className="container px-5 py-24 mx-auto">

                <div className="flex flex-wrap -m-4">
                {productos.map((producto:Product, index:number) => ( 
                    <ProductosCard 
                        key={index}
                        titulo={producto.title}
                        precio={producto.price}
                        imagen={producto.image }
                    />
                ))}
                </div>

            </div>
        </section>

    )

}

//Establezco este componente para obtener propiedades desde el servidor (antes de que la pag cargue) y enviarlos al componente
export async function getServerSideProps(context: any){
    //Le paso por parametro el contexto de la llamada a la página, que contiene metadatos, entre ellos los parametros

    const categoria = context.params.categoria
    //A traves del contexto obtengo los parámetros que contienen la categoria

    const response = await fetch(`https://fakestoreapi.com/products/category/${categoria}`, {
        //Indico la ruta y configuracion de mi peticion
        method: "GET",
        headers: {
          //metadatos de la peticion que brindan un contexto 
          "Content-Type": "application/json", //Indico que vamos a enviar datos de tipo JSON
        },
    })
    
    const productos = await response.json()

    //Devuelvo un objeto con el atributo props y dentro, los datos que quiero enviar al componente
    return { props: {productos} }
}

