export const PieDataChart = (data) => ({
    labels: ["Tickets resueltos", "Tickets no resueltos"],
    datasets: [
        {
            label: "Tickets",
            data: [data.Realizados || 0, data.NoRealizados || 0],
            backgroundColor: [
                "rgba(75, 192, 192, 0.8)",  // Azul claro
                "rgba(54, 162, 235, 1)",  // Rojo claro
            ],
            borderWidth: 2,
            hoverOffset: 8,
        },
    ],
});
