import {Form} from "./components/form.js";
import {Main} from "./components/main.js";
import {Auth} from "./service/auth.js";
import {CategoriesPage} from "./components/incomes.js";
import {CreateCategory} from "./components/createCategory.js";
import {Incexp} from "./components/incexp.js";
import {CreateOperation} from "./components/createOperation.js";

export class Router {
    constructor() {
        this.contentElement = document.getElementById('content');
        this.stylesElementOne = document.getElementById('stylesOne');
        this.stylesElementTwo = document.getElementById('stylesTwo');
        this.titleElement = document.getElementById('titleUp');


        this.routes = [
            {
                route: '#/',
                title: 'Вход',
                template: 'templates/login.html',
                styleOne: 'styles/login.css',
                styleTwo: '',
                load: () => {
                    new Form('login');
                }
            },
            {
                route: '#/signup',
                title: 'Регистрация',
                template: 'templates/signup.html',
                styleOne: 'styles/login.css',
                styleTwo: '',
                load: () => {
                    new Form('signup');
                }
            },

            {
                route: '#/main',
                title: 'Главная',
                template: 'templates/main.html',
                styleOne: 'styles/generalStyle.css',
                styleTwo: 'styles/main.css',
                load: () => {
                    new Main();
                }
            },

            {
                route: '#/incexp',
                title: 'Доходы & Расходы',
                template: 'templates/incexp.html',
                styleOne: 'styles/generalStyle.css',
                styleTwo: 'styles/main.css',
                load: () => {
                    new Incexp();
                }
            },

            {
                route: '#/incomes',
                title: 'Доходы',
                template: 'templates/income.html',
                styleOne: 'styles/generalStyle.css',
                styleTwo: 'styles/income.css',
                load: () => {
                    new CategoriesPage();
                }
            },

            {
                route: '#/expenses',
                title: 'Расходы',
                template: 'templates/income.html',
                styleOne: 'styles/generalStyle.css',
                styleTwo: 'styles/income.css',
                load: () => {
                    new CategoriesPage();
                }
            },
            {
                route: '#/createIncCat',
                title: 'Создать категорию доходов',
                template: 'templates/createCat.html',
                styleOne: 'styles/generalStyle.css',
                styleTwo: 'styles/income.css',
                load: () => {
                    new CreateCategory();
                }
            },
            {
                route: '#/createExpCat',
                title: 'Создать категорию расходов',
                template: 'templates/createCat.html',
                styleOne: 'styles/generalStyle.css',
                styleTwo: 'styles/income.css',
                load: () => {
                    new CreateCategory();
                }
            },
            {
                route: '#/createIncExp',
                title: 'Создать категорию доходов/расходов',
                template: 'templates/createIncomesExpenses.html',
                styleOne: 'styles/generalStyle.css',
                styleTwo: 'styles/income.css',
                load: () => {
                    new CreateOperation();
                }
            },
        ]
    }

    async openRoute() {
        const urlRoute = window.location.hash.split('?')[0];

        if (urlRoute === '#/logout') {
            await Auth.logout();
            window.location.href = '#/';
            return;
        }


        const newRoute = this.routes.find(item => {
            return item.route === urlRoute;
        })

        if (!newRoute) {
            window.location.href = '#/';
            return;
        }

        this.contentElement.innerHTML = await fetch(newRoute.template).then(response => response.text());
        this.stylesElementOne.setAttribute('href', newRoute.styleOne);
        this.stylesElementTwo.setAttribute('href', newRoute.styleTwo);
        this.titleElement.innerText = newRoute.title;

        newRoute.load();
    }
}