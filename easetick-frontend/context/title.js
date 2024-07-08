'use client'
import { createContext, useState } from "react";

export const TitleContext = createContext("")

export function TitleProvider({children}) {
    const [titulo, setTitulo] = useState("")

    return(
        <TitleContext.Provider value={{titulo, setTitulo}}>
            {children}
        </TitleContext.Provider>
    )
}