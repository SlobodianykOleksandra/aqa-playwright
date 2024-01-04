import BaseComponent from "../../../components/BaseComponent.js";

export default class AddExpensePopup extends BaseComponent{
    constructor(page) {
        super(page, page.locator('//app-add-expense-modal'));
        this.vehicleSelect = this._container.locator('//select[@id="addExpenseCar"]')
        this.mileageInput = this._container.locator('//input[@id="addExpenseMileage"]')
        this.litersInput = this._container.locator('//input[@id="addExpenseLiters"]')
        this.totalCostInput = this._container.locator('//input[@id="addExpenseTotalCost"]')
        this.addButton = this._container.locator('//button[@class="btn btn-primary"]')
    }

    async fillExpensesAndConfirm(vehicle, mileage, liters, total) {
        await this.vehicleSelect.selectOption({label: vehicle})
        await this.mileageInput.fill(mileage.toString())
        await this.litersInput.fill(liters.toString())
        await this.totalCostInput.fill(total.toString())
        await this.addButton.click()
    }
}