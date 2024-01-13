import BasePage from "../BasePage.js";

export default class ProfilePage extends BasePage{
    constructor(page) {
        super(page, '/panel/profile', '//button[@class="btn btn-primary"]');
        this.userName = this._container.locator('//p[@class="profile_name display-4"]')
    }
}