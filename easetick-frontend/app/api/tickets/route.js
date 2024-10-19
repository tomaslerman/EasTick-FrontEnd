import axios from 'axios';

export async function POST(req) {
  const { asunto, mensaje, idCliente, idEmpresa, tipo, prioridad } = await req.json();

  try {
    // Hacer la solicitud al backend de Node.js
    const response = await axios.post('http://localhost:5000/tickets/crear', {
      asunto,
      mensaje,
      idCliente,
      idEmpresa,
      tipo,
      prioridad
    });

    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al crear ticket' }), { status: 500 });
  }
}
