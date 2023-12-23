import BasePage from "../BasePage.js";
import RegistrationPopup from "./welcomePageComponents/RegistrationPopup.js";
import MainSection from "./welcomePageComponents/MainSection.js";
import SignInPopup from "./welcomePageComponents/SignInPopup.js";

export default class WelcomePage extends BasePage{
    constructor(page) {
        super(page, '/', '//button[@class="btn btn-outline-white header_signin"]')
        this.mainSection = new MainSection(page)
    }
    async clickRegistrationButtonAndOpenPopup(){
        await this.mainSection.registerButton.click()
        return new RegistrationPopup(this._page)
    }

    async clickSigningButtonAndOpenPopup(){
        await this.header.signInBtn.click()
        return new SignInPopup(this._page)
    }
}