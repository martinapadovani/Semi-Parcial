import { createContext, useState } from "react"

type Product = {
    id: number
    title:string
    price:number
    category: string
    image: string
}

type Cart = {
    productos: Product[]
    precioTotal: number
}

let initialCart: Cart = {
    productos: [],
    precioTotal: 0
};

export const CarritoContext = createContext(initialCart)

export function CarritoProvider ({children}: {children: React.ReactNode}) {

    const [carrito, setCarrito] = useState(initialCart)

    return (
        //@ts-ignore
        <CarritoContext.Provider value={{carrito, setCarrito}}>
            {children}
        </CarritoContext.Provider>
    )
}