import BasePage from "../BasePage.js";
import Navigation from "./garagePageComponents/Navigation.js";

export default class GaragePage extends BasePage{
    constructor(page) {
        super(page, '/panel/garage', '//button[@class="btn btn-primary"]');
        this.navigation = new Navigation(page)
    }

    async clickSettingsAndRedirect(){
        await this.navigation.settingsButton.click()
    }
}