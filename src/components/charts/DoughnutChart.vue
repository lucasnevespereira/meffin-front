<script setup>

import {Doughnut} from "vue-chartjs";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import {ref} from "vue";
import { useCurrency } from '@/composables/use-currency';

ChartJS.register(ArcElement, Tooltip, Legend)
const { currency } = useCurrency();

const isMobile = ref(window.innerWidth <= 768);

const props = defineProps({
  expenses: {
    type: Array,
    required: true
  },
})

// Calculate the total expenses for each category
const categoryTotals = {};
props.expenses.forEach((expense) => {
  const category = expense.category;
  const amount = expense.amount;
  if (categoryTotals[category]) {
    categoryTotals[category] += amount;
  } else {
    categoryTotals[category] = amount;
  }
});


// Generate colors based on the palette
const generateColors = (numColors, palette) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    colors.push(palette[i % palette.length]);
  }
  return colors;
};

const palette = ['#32CBFF', '#FECEF1', '#00A5E0', '#89A1EF', '#EF9CDA', '#1E5782', '#526FCC'];

const chartData = {
  labels: Object.keys(categoryTotals),
  datasets: [
    {
      backgroundColor: generateColors(Object.keys(categoryTotals).length, palette),
      data: Object.values(categoryTotals),
      hoverOffset:  isMobile.value ? 10 : 30,
      spacing:  isMobile.value ? 10 : 30,
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
      position: isMobile.value ? "bottom" : "right",
      align: 'center',
      labels: {
        boxWidth:  isMobile.value ? 20 : 30,
        color: '#193346',
        font: {
          weight: '300',
          size: isMobile.value ? 14 : 20
        },
        padding:  isMobile.value ? 20 : 30,
        // usePointStyle: true,
      },
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          return `${context.parsed.toLocaleString()} ${currency}`;
        },
      },
      backgroundColor: "#3D97D9",
      bodyFont: {
        color: "#193346",
        size: isMobile.value ? 12 : 18, // Set the font size for the tooltip text
      },
      bodyAlign: "center",
      borderWidth: 2, // Add a border to the tooltip
      borderColor: "#ECF6FA", // Set the border color
      titleAlign: "center", // Align the title text to the center
      titleFont: {
        size: isMobile.value ? 12 : 18, // Set the font size for the tooltip title
        color: "#193346",
      },
      displayColors: false, // Hide color boxes in the tooltip
      padding:  isMobile.value ? 10 : 20,
      position: "average",
    },
  },

  layout: {
    padding: {
      left: isMobile.value ? 10 : 10, // Add left margin to the chart
      right: isMobile.value ? 10 : 10, // Add right margin to the chart to make room for the legends
    },
  },
}
</script>

<template>
  <div class="container chart-container flex justify-center mx-auto">
    <Doughnut :options="chartOptions" :data="chartData"/>
  </div>
</template>
<style>
.chart-container {
  max-width: 55%;
}

@media screen and (max-width: 768px) {
  .chart-container {
    padding-top: 10px ;
    max-width: 100%;
  }
}
</style>
