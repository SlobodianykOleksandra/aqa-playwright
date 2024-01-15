import BasePage from "../BasePage.js";
import Navigation from "./garagePageComponents/Navigation.js";
import AddCarPopup from "./garagePageComponents/AddCarPopup.js";
import FuelPage from "../FuelPage/FuelPage.js";
import ProfilePage from "../ProfilePage/ProfilePage.js";

export default class GaragePage extends BasePage{
    constructor(page) {
        super(page, '/panel/garage', '//button[@class="btn btn-primary"]');
        this.navigation = new Navigation(page)
        this.addCarButton = this._container.locator('button', {hasText:'Add car'})
    }

    async clickSettingsAndRedirect(){
        await this.navigation.settingsButton.click()
    }

    async clickFuelExpensesAndRedirect(){
        await this.navigation.fuelExpensesButton.click()
        return new FuelPage(this._page)
    }
    async clickProfileAndRedirect(){
        await this.navigation.profileButton.click()
        return new ProfilePage(this._page)
    }

    async openAddCarPopup(){
        await this.addCarButton.click()
        return new AddCarPopup(this._page)
    }
}