import {Form} from "./components/form.js";
import {Main} from "./components/main.js";
// import {Choice} from "./components/choice.js";
// import {Test} from "./components/test.js";
// import {Result} from "./components/result.js";
// import {Answers} from "./components/answers.js";
// import {Auth} from "./service/auth.js";

export class Router {
    constructor() {
        this.contentElement = document.getElementById('content');
        this.stylesElement = document.getElementById('style');
        this.stylesElementOne = document.getElementById('stylesOne');
        this.stylesElementTwo = document.getElementById('stylesTwo');
        this.titleElement = document.getElementById('titleUp');
        // this.profileElement = document.getElementById('profile');
        // this.profileFullNameElement = document.getElementById('profile-full-name');


        this.routes = [
            {
                route: '#/',
                title: 'Вход',
                template: 'templates/login.html',
                style: 'styles/login.css',
                styleOne: '',
                styleTwo: '',
                load: () => {
                    new Form('login');
                }
            },
            {
                route: '#/signup',
                title: 'Регистрация',
                template: 'templates/signup.html',
                style: 'styles/login.css',
                styleOne: '',
                styleTwo: '',
                load: () => {
                    new Form('signup');
                }
            },

            {
                route: '#/main',
                title: 'Главная',
                template: 'templates/main.html',
                style: 'styles/generalStyle.css',
                styleOne: 'styles/sidebars.css',
                styleTwo: 'styles/main.css',
                load: () => {
                    new Main();
                }
            },

            // {
            //     route: '#/choice',
            //     title: 'Выбор теста',
            //     template: 'templates/choice.html',
            //     styles: 'styles/choice.css',
            //     load: () => {
            //         new Choice();
            //     }
            // },
            // {
            //     route: '#/test',
            //     title: 'Тест',
            //     template: 'templates/test.html',
            //     styles: 'styles/test.css',
            //     load: () => {
            //         new Test();
            //     }
            // },
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
        // if (urlRoute === '#/') {
        //     Auth.logout();
        //     window.location.href = '#/';
        //     return;
        // }


        const newRoute = this.routes.find(item => {
            return item.route === urlRoute;
        })

        if (!newRoute) {
            window.location.href = '#/';
            return;
        }

        this.contentElement.innerHTML = await fetch(newRoute.template).then(response => response.text());
        this.stylesElement.setAttribute('href', newRoute.style);
        this.stylesElementOne.setAttribute('href', newRoute.styleOne);
        this.stylesElementTwo.setAttribute('href', newRoute.styleTwo);
        this.titleElement.innerText = newRoute.title;

        // const userInfo = Auth.getUserInfo();
        // const accessToken = localStorage.getItem(Auth.accessTokenKey);

        // if (userInfo && accessToken) {
        //     this.profileElement.style.display = 'flex';
        //     this.profileFullNameElement.innerText = userInfo.fullName;
        // } else {
        //     this.profileElement.style.display = 'none';
        // }

        newRoute.load();
    }
}