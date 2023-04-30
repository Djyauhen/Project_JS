import {GetCategories} from "./getCategories.js";
import {CustomHttp} from "./custom-http.js";
import config from "../../config/config.js";
import {CategoriesPage} from "../components/incomes.js";

export class Popup {
    constructor(category) {
        const that = this;

        this.openPopup(that, category).then();
    }

    async openPopup(item, categories) {
        const urlRoute = window.location.hash.split('?')[0];
        const popup = document.getElementById('popup');
        const agree = document.getElementById('agree');
        const disagree = document.getElementById('disagree');
        const openBtns = document.getElementsByClassName('delete-category');
        let categoryId = '';
        let a = await new GetCategories(categories);

        function closePopup() {
            popup.style.display = 'none';
            categoryId = '';
        }

        for (let i = 0; i < openBtns.length; i++) {
            openBtns[i].onclick = function () {
                popup.style.display = 'flex';
                categoryId = a[i].id ;

                if (urlRoute === '#/incomes'){
                    agree.addEventListener("click", deleteInc);
                } if (urlRoute === '#/expenses') {
                    agree.addEventListener("click", deleteExp);
                }
            };
        }

        disagree.addEventListener("click", closePopup);

        function deleteExp() {
            item.deleteCategory('/categories/expense/'+ categoryId).then(() => closePopup()).then(() => new CategoriesPage())
        }
        function deleteInc() {
            item.deleteCategory('/categories/income/'+ categoryId).then(() => closePopup()).then(() => new CategoriesPage());
        }

    }

    async deleteCategory(urlRoute) {

        try {
            const result = await CustomHttp.request(config.host + urlRoute, 'DELETE')

            if (result) {
                if (!result) {
                    throw new Error(result.message);
                }
            }
        } catch (error) {
            return console.log(error);
        }
    }
}



