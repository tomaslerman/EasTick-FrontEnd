'use client'
import Titulo from "@/components/Titulo/Titulo";
import { useTickets } from '@/hooks/useTickets';
import { useEffect } from "react";
import useTitle from "@/hooks/useTitle";

export default function verTicket() {
    const { setTitulo } = useTitle()

    useEffect(() => {
        setTitulo("Tickets")
    }, [])

  return (
    <div>
      <Titulo titulo={"Tus Tickets"} subtitulo={"Gestione sus tickets"} />
    </div>
  );
}
