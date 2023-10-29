<script setup >

import {Doughnut} from "vue-chartjs";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const chartData = {
    labels: ['Logement', 'Nourriture', 'Loisirs', 'Santé', 'Impots', 'Cadeaux', 'Divers'],
    datasets: [
        {
            backgroundColor: ['#32CBFF', '#FECEF1', '#00A5E0', '#89A1EF', '#EF9CDA', '#1E5782', '#526FCC'],
            data: [944, 120, 50, 80, 76, 344, 435],
            hoverOffset: 30,
            spacing: 20,
        }
    ],
}
const chartOptions = {
    responsive: true,
    elements: {
        arc: {
            hoverCursor: 'pointer',
        }
    },
    plugins: {
        legend: {
            display: true,
            position: "right",
            align: 'center',
            labels: {
                boxWidth: 30,
                color: '#193346',
                font: {
                    weight: '300',
                    size: 25
                },
                padding: 50,
                // usePointStyle: true,
            },
        },
        tooltip: {
            callbacks: {
                label: (context) => {
                    return `${context.parsed.toLocaleString()} €`;
                },
            },
            backgroundColor: "#3D97D9",
            bodyFont: {
                color: "#193346",
                size: 18, // Set the font size for the tooltip text
            },
            bodyAlign: "center",
            borderWidth: 2, // Add a border to the tooltip
            borderColor: "#ECF6FA", // Set the border color
            titleAlign: "center", // Align the title text to the center
            titleFont: {
                size: 18, // Set the font size for the tooltip title
                color: "#193346",
            },
            displayColors: false, // Hide color boxes in the tooltip
            padding: 20,
            position: "average",
        },
    },

    layout: {
        padding: {
            left: 20, // Add left margin to the chart
            right: 40, // Add right margin to the chart to make room for the legends
        },
    },
}
</script>

<template>
    <div class="container chart-container flex justify-center mx-auto">
        <Doughnut  :options="chartOptions" :data="chartData"/>
    </div>
</template>
<style>
.chart-container {
    max-width: 55%;
}
</style>
