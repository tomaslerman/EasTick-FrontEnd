// pieDataChart.js
'use client';

export const PieDataChart = (data) => ({
    labels: ["Tickets resueltos", "Tickets no resueltos"],
    datasets: [
        {
            label: "Tickets",
            data: [data.Realizados || 0, data.NoRealizados || 0],  // Utiliza los datos pasados como props
            backgroundColor: [
                "rgba(54, 162, 235, 0.2)",
                "rgba(75, 192, 192, 0.2)"
            ],
            hoverOffset: 4,
        },
    ],
});
