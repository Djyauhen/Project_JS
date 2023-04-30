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
        const incomesBtn = document.getElementById('catIncomesBtn');
        const expenseBtn = document.getElementById('catExpenseBtn');
        const allBtn = document.getElementsByClassName('nav-link');
        const incExpBtn = document.getElementById('incomesExpenseBtn');
        this.profileNameElement = document.getElementById('userName');
        const img = document.getElementById('user-image');
        const logout = document.getElementById('logout');
        this.balanceProfile = document.getElementById('balance');
        const urlRoute = window.location.hash.split('?')[0];

        delClass();
        dropdownMenu.style.display = 'none';
        dropdownBtn.style.transform = 'rotate(-90deg)';
        logout.style.display = 'none';

        if (urlRoute === "#/main") {
            mainBtn.classList.add('active');
        } if (urlRoute === "#/incexp") {
            incExpBtn.classList.add('active');
        } if (urlRoute === "#/incomes") {
            dropdownMenu.style.display = 'flex';
            dropdownBtn.style.transform = 'rotate(0)';
            dropdownToggle.classList.add('active');
            incomesBtn.classList.add('active');
        } if (urlRoute === "#/expenses") {
            dropdownMenu.style.display = 'flex';
            dropdownBtn.style.transform = 'rotate(0)';
            dropdownToggle.classList.add('active');
            expenseBtn.classList.add('active');
        }


        if (dropdownToggle.classList.contains('active')) {
            dropdownMenu.style.display = 'flex';
            dropdownBtn.style.transform = 'rotate(0deg)';
        } else {
            dropdownMenu.style.display = 'none';
            dropdownBtn.style.transform = 'rotate(-90deg)';
        }


        const userInfo = Auth.getUserInfo();
        const accessToken = localStorage.getItem(Auth.accessTokenKey);

        if (userInfo && accessToken) {
            this.profileNameElement.innerText = userInfo.fullName;
        }
        const that = this;
        this.getBalance().then(data => {
            that.balanceProfile.innerText = data.balance;
        });

        function mainBtnClick() {
            location.href = '#/main';
        }

        function incExpBtnClick() {
            location.href = '#/incexp';
        }

        function incomesBtnClick() {
            location.href = '#/incomes';
        }

        function expenseBtnClick() {
            location.href = '#/expenses';
        }

        function minimize() {
            if (dropdownMenu.style.display === 'flex') {
                dropdownToggle.classList.remove('active');
                dropdownMenu.style.display = 'none';
                dropdownBtn.style.transform = 'rotate(-90deg)';
            }
            else {
                dropdownToggle.classList.add('active');
                dropdownMenu.style.display = 'flex';
                dropdownBtn.style.transform = 'rotate(0deg)';
            }
        }

        function delClass() {
            for (let i = 0; i < allBtn.length; i++) {
                if (allBtn[i].classList.contains('active')) {
                    allBtn[i].classList.remove("active");
                }
            }
        }

        img.onclick = () => {logout.style.display = 'flex'}

        logout.onclick = () => {location.href = '#/logout'}

        mainBtn.addEventListener('click', mainBtnClick);
        incomesBtn.addEventListener('click', incomesBtnClick);
        expenseBtn.addEventListener('click', expenseBtnClick);
        incExpBtn.addEventListener('click', incExpBtnClick);
        dropdownToggle.addEventListener("click", minimize);
    }

    async getBalance() {
        return await CustomHttp.request(config.host + '/balance');
    }
}