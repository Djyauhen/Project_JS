import {Sidebars} from "../service/sidebars.js";
// import {GetCategories} from "../service/getCategories.js";
import {GetOperations} from "../service/getOperations.js";
import moment from "moment/moment";
import {Chart} from "chart.js/auto";
// import {CustomHttp} from "../service/custom-http";
// import config from "../../config/config";

export class Main {
    constructor() {
        const today = document.getElementById('today');
        const week = document.getElementById('week');
        const month = document.getElementById('month');
        const year = document.getElementById('year');
        const all = document.getElementById('all');
        // const dateFrom = document.getElementById('dateFrom');
        // const dateTo = document.getElementById('dateTo');


        today.onclick = () => {
            this.clickBtn(this).then()
        };
        week.onclick = () => {
            this.clickBtn(this, 'week').then()
        };
        month.onclick = () => {
            this.clickBtn(this, 'month').then()
        };
        year.onclick = () => {
            this.clickBtn(this, 'year').then();
        };
        all.onclick = () => {
            this.clickBtn(this, 'all').then()
        };

        this.clickBtn(this).then()

        new Sidebars();
    }

    async clickBtn(that, period, from, to) {
        const incomes = document.getElementById('canvasIncomes');
        const expenses = document.getElementById('canvasExpense');

        let expenseChart = document.getElementById('catExpenses');
        let incomesChart = document.getElementById('catIncomes');

        if (incomesChart) {
            incomesChart.remove();
            incomesChart = document.createElement("canvas");
            incomesChart.id = 'catIncomes';
        } else {
            incomesChart = document.createElement("canvas");
            incomesChart.id = 'catIncomes';
        }

        if (expenseChart) {
            expenseChart.remove();
            expenseChart = document.createElement("canvas");
            expenseChart.id = 'catExpenses';
        } else {
            expenseChart = document.createElement("canvas");
            expenseChart.id = 'catExpenses';
        }
        incomes.appendChild(incomesChart);
        expenses.appendChild(expenseChart);

        let operations = await that.getDateOperations(period, from, to).then(f1);

        let operationsByCategories = that.getOperationsByCategory(operations);
        let [incomesOperations, expenseOperations] = operationsByCategories;

        let incomesCategories = that.getCategoriseOperations(incomesOperations);

        let expenseCategories = that.getCategoriseOperations(expenseOperations);

        let incomesData = that.getAmountOperations(incomesOperations, incomesCategories);

        let expensesData = that.getAmountOperations(expenseOperations, expenseCategories);

        let configIncomes = {
            type: 'pie',
            data: {
                labels: incomesCategories,
                datasets: [{
                    data: incomesData,
                    label: "$",
                    borderWidth: 1
                }]
            },
            options: {
                radius: 180
            }
        }

        let configExpenses = {
            type: 'pie',
            data: {
                labels: expenseCategories,
                datasets: [{
                    data: expensesData,
                    label: "$",
                    borderWidth: 1
                }]
            },
            options: {
                radius: 180
            }
        }

        new Chart(incomesChart, configIncomes);
        new Chart(expenseChart, configExpenses);

        function f1(data) {
            return data;
        }
    }

    async getDateOperations(period, from, to) {
        let dateFrom = moment(from).format('YYYY-MM-DD');
        let dateTo = moment(to).format('YYYY-MM-DD');
        let operations = await new GetOperations('period=' + period + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo);
        if (operations) return operations;
    }

    getOperationsByCategory(operations) {
        let incomesOperations = [];
        let expenseOperations = [];
        operations.forEach(operation => {
            if (operation.type === 'income') {
                incomesOperations.push(operation);
            }
            if (operation.type === 'expense') {
                expenseOperations.push(operation);
            }
        })
        return [incomesOperations, expenseOperations];
    }

    unique(arr) {
        let result = [];
        for (let str of arr) {
            if (!result.includes(str)) {
                result.push(str);
            }
        }
        return result;
    }

    getCategoriseOperations(operations) {
        return this.unique(operations.map(({category}) => category));
    }

    getAmountOperations(operationsArray, categories) {
        let categoryData = [];
        categories.forEach(category => {
            let array = operationsArray.filter(operation => operation.category === category);
            let operationsAmount = array.map(({amount}) => amount);
            let max = 0;
            for (let sum of operationsAmount) {
                max = max + sum;
            }
            categoryData.push(max);
        })
        return categoryData;
    }

}




