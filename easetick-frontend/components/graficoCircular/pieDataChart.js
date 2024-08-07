export const pieDataChart = {
    labels: ["Tickets resueltos", "Tickets no resueltos"],
    datasets: [
        {
            label: ["Tickets"],
            data: [60, 40],
            backgroundColor: [
                "rgba(54, 162, 235, 0.2)",
                "rgba(75, 192, 192, 0.2)"
            ],
            hoverOffset: 4,
        },
    ],
};
export { pieDataChart as PieDataChart };