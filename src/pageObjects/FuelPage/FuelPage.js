import BasePage from "../BasePage.js";
import AddExpensePopup from "./fuelPageComponents/AddExpensePopup.js";

export default class FuelPage extends BasePage{
    constructor(page) {
        super(page, '/panel/expenses', '//button[@class="btn btn-primary"]');
        this.addExpenseButton = this._container.locator('//button[@class="btn btn-primary"]')
    }

    async openAnExpensePopup(){
        await this.addExpenseButton.click()
        return new AddExpensePopup(this._page)
    }
}