import BaseComponent from "../../../components/BaseComponent.js";
import RegistrationPopup from "./RegistrationPopup.js";
import GaragePage from "../../GaragePage/GaragePage.js";

export default class SignInPopup extends BaseComponent{
    constructor(page) {
        super(page, page.locator('//app-signin-modal'));
        this.emailInput = this._container.locator('//input[@id="signinEmail"]')
        this.passwordInput = this._container.locator('//input[@id="signinPassword"]')

        this.loginButton = this._container.locator('//button[@class="btn btn-primary"]')
        this.registrationButton = this._container.locator('//button',{hasText: 'Registration'})
        // this.errorMessage = this._container.locator('//div[@class="invalid-feedback"]/p')
    }

    async fillForm(email, password){
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
    }

    async clickLoginButton(){
        await this.loginButton.click()
    }

    async clickRegistrationButtonAndRedirectToPopup(){
        await this.registrationButton.click()
        return new RegistrationPopup(this._page)
    }

    async loginWithCredentials(email, password){
        await this.fillForm(email, password)
        await this.loginButton.click()
        return new GaragePage(this._page)
    }
}