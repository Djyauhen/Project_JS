

export class ChartJS {
    constructor(chart, categories, categoryData, ctx) {
        if (chart !== null) {
            chart.destroy();
        }
        this.charts(chart, categories, categoryData, ctx);
    }
}
