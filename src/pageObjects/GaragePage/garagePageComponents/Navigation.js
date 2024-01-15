import BaseComponent from "../../../components/BaseComponent.js";

export default class Navigation extends BaseComponent{
    constructor(page) {
        super(page, page.locator('//nav[@class="sidebar d-flex flex-column"]'))
        this.settingsButton = this._container.locator('//a[@routerlink="settings"]')
        this.fuelExpensesButton = this._container.locator('//a[@routerlink="expenses"]')
        this.profileButton = this._container.locator('//a[@routerlink="profile"]')
    }
}