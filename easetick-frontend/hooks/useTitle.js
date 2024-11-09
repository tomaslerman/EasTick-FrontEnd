'use client'
import { TitleContext } from "@/context/title"
import { useContext } from "react"

export default function useTitle(){
    const title = useContext(TitleContext)

    if(title === undefined){
        throw new Error("useTitle must be used within a TitleProvider")
    }

    return {
        ...title,
        titulo: title.titulo ? <span style={{color: 'white'}}>{title.titulo}</span> : null
    }
}
