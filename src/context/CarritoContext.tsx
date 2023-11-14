import { createContext, useState } from "react"


let initialCart = {

    productos: [],
    precioTotal: 0
}

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