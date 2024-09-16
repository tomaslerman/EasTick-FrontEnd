'use client';

export default function Ticket()
{
    const { setTitulo } = useTitle()

    useEffect(() => {
        setTitulo("Ticket")
    }, [])
    return(
        <div>
        
        </div>


    );
}