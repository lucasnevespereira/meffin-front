<script setup lang="ts">

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import AmountCard from "@/components/cards/AmountCard.vue";
import DoughnutChart from "@/components/charts/DoughnutChart.vue";


const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet",
    "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];
const currentDate = new Date();
const currentMonth = monthNames[currentDate.getMonth()] + ' ' + currentDate.getFullYear();


</script>

<template>
    <div class="container flex flex-col p-10">
        <div class="flex justify-between items-center text-primary">
            <h2 class="text-3xl p-5 text-accent font-bold">Dashboard</h2>
            <div class="flex items-center">
                <p class="p-5 text-lg text-center">{{ currentMonth }}</p>
                <font-awesome-icon icon="calendar-alt" class="ml-2 text-primary w-6 h-8"/>
            </div>
        </div>

        <div class="flex flex-grow w-full space-x-5 pt-5">
            <AmountCard label="Entrées" amount="2000,00"/>
            <AmountCard label="Sorties" amount="1500,00"/>
            <AmountCard label="Solde" amount="500,00"/>
        </div>


        <div class="max-w-full">
            <DoughnutChart />
        </div>



    </div>

</template>

<style scoped>

</style>