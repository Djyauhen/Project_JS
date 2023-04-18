import {Chart} from "chart.js/auto"

export class Main {
    constructor() {


        const ctx1 = document.getElementById('catIncomes');
        const ctx2 = document.getElementById('catExpenses');
        const category = ['Red', 'Blue', 'Yellow', 'Green', 'Purple'];
        const categoryData = [1123, 243, 456, 789, 90];

        new Chart(ctx1, {
            type: 'pie',
            data: {
                labels: category,
                datasets: [{
                    data: categoryData,
                    label: "$",
                    borderWidth: 1
                }]
            },
            options: {
                radius: 180
            }
        });

        new Chart(ctx2, {
            type: 'pie',
            data: {
                labels: category,
                datasets: [{
                    data: categoryData,
                    label: "$",
                    borderWidth: 1
                }]
            },
            options: {
                radius: 180
            }
        });
    }
}




