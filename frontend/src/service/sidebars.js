import {Auth} from "./auth.js";
import {CustomHttp} from "./custom-http.js";
import config from "../../config/config.js";

export class Sidebars {
    constructor() {
        const dropdownToggle = document.getElementById('dropdown-toggle');
        const dropdown = document.getElementsByClassName('dropdown')[0];
        const dropdownMenu = document.getElementById('dropdown-menu');
        const dropdownBtn = document.getElementById('dropdown-button');
        const mainBtn = document.getElementById('mainBtn');
        const incomesExpenseBtn = document.getElementById('incomesExpenseBtn');
        // const dropdownBtn = document.getElementById('dropdown-button');



        this.profileNameElement = document.getElementById('userName');
        this.balanceProfile = document.getElementById('balance');


        if (dropdown.classList.value.split(' ').find(item => item === 'active')) {
            dropdownMenu.style.display = 'flex';
            dropdownBtn.style.transform = 'rotate(0deg)';
        } else {
            dropdownMenu.style.display = 'none';
            dropdownBtn.style.transform = 'rotate(-90deg)';
        }

        function minimize() {
            if (dropdownMenu.style.display === 'flex') {
                dropdownMenu.style.display = 'none';
                dropdownBtn.style.transform = 'rotate(-90deg)';
            } else {
                dropdownMenu.style.display = 'flex';
                dropdownBtn.style.transform = 'rotate(0deg)';
            }
        }

        dropdownToggle.addEventListener("click", minimize);

        let url = '';

        mainBtn.click()

        if (mainBtn.onclick) {
           return url = '#/main';
        } if (incomesExpenseBtn.onclick) {
            url = '#/incomes';
        }
        function changePage(url) {
            location.href = url;
        }

        // if (mainBtn.onclick) {
        //     changePage('#/main');
        // } if (incomesExpenseBtn.onclick) {
        //     changePage('#/incomes');
        // }

        mainBtn.addEventListener('click', changePage);




        const userInfo = Auth.getUserInfo();
        const accessToken = localStorage.getItem(Auth.accessTokenKey);

        if (userInfo && accessToken) {
            this.profileNameElement.innerText = userInfo.fullName;
        }
        const that = this;
        this.getBalance().then(data => {
            that.balanceProfile.innerText = data.balance;
        });

    }

    async getBalance() {
        return await CustomHttp.request(config.host + '/balance');
    }
}