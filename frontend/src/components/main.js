import {Sidebars} from "../service/sidebars.js";
import {GetCategories} from "../service/getCategories.js";
import {Chart} from "chart.js/auto";

export class Main {
    constructor() {
        const ctx2 = document.getElementById('catExpenses');
        const ctx1 = document.getElementById('catIncomes');
        const categoryData = [123, 321, 321, 345, 123, 321, 321, 345, 1231];

        this.charts('income', categoryData, ctx1).then();
        this.charts('expense', categoryData, ctx2).then();

        new Sidebars();
    }

    async charts(categories, categoryData, ctx) {
        let category = await new GetCategories(categories);
        let categoryTitles = category.map(({title}) => title);

        await new Chart(ctx, {
            type: 'pie',
            data: {
                labels: categoryTitles,
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




