import {Form} from "./components/form.js";
import {Main} from "./components/main.js";
import {Auth} from "./service/auth.js";
import {CategoriesPage} from "./components/incomes.js";

export class Router {
    constructor() {
        this.contentElement = document.getElementById('content');
        this.stylesElement = document.getElementById('style');
        this.stylesElementOne = document.getElementById('stylesOne');
        this.stylesElementTwo = document.getElementById('stylesTwo');
        this.titleElement = document.getElementById('titleUp');
        // this.profileElement = document.getElementById('profile');
        // this.profileFullNameElement = document.getElementById('profile-full-name');
        this.sidebar = document.getElementById('sidebar');


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
                route: '#/incomes',
                title: 'Выбор теста',
                template: 'templates/income.html',
                styleOne: 'styles/generalStyle.css',
                styleTwo: 'styles/income.css',
                load: () => {
                    new CategoriesPage();
                }
            },

            {
                route: '#/expenses',
                title: 'Выбор теста',
                template: 'templates/income.html',
                styleOne: 'styles/generalStyle.css',
                styleTwo: 'styles/income.css',
                load: () => {
                    new CategoriesPage();
                }
            },
            {
                route: '#/createincomes',
                title: 'Тест',
                template: 'templates/createIncomes.html',
                styleOne: 'styles/generalStyle.css',
                styleTwo: 'styles/income.css',
                load: () => {

                }
            },
            // {
            //     route: '#/result',
            //     title: 'Результаты теста',
            //     template: 'templates/result.html',
            //     styles: 'styles/result.css',
            //     load: () => {
            //         new Result();
            //     }
            // },
            // {
            //     route: '#/answers',
            //     title: 'Ответы теста',
            //     template: 'templates/answers.html',
            //     styles: 'styles/answers.css',
            //     load: () => {
            //         new Answers();
            //     }
            // }
        ]
    }

    async openRoute() {
        const urlRoute = window.location.hash.split('?')[0];

        if (urlRoute === '#/logout') {
            Auth.logout();
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

        const userInfo = Auth.getUserInfo();
        const accessToken = localStorage.getItem(Auth.accessTokenKey);

        this.contentElement.innerHTML = await fetch(newRoute.template).then(response => response.text());
        this.stylesElementOne.setAttribute('href', newRoute.styleOne);
        this.stylesElementTwo.setAttribute('href', newRoute.styleTwo);
        this.titleElement.innerText = newRoute.title;

        // if (userInfo && accessToken) {
        //     this.profileElement.style.display = 'flex';
        //     this.profileFullNameElement.innerText = userInfo.name;
        // } else {
        //     this.profileElement.style.display = 'none';
        // }

        newRoute.load();
    }
}