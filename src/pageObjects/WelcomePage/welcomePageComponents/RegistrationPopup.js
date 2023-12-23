import BaseComponent from "../../../components/BaseComponent.js";

export default class RegistrationPopup extends BaseComponent{
    constructor(page) {
        super(page, page.locator('//app-signup-modal'));
        this.header = this._container.locator('//h4')
        this.nameInput = this._container.locator('//input[@id="signupName"]')
        this.lastNameInput = this._container.locator('//input[@id="signupLastName"]')
        this.emailInput = this._container.locator('//input[@id="signupEmail"]')
        this.passwordInput = this._container.locator('//input[@id="signupPassword"]')
        this.repeatInput = this._container.locator('//input[@id="signupRepeatPassword"]')

        this.createButton = this._container.locator('//button[@class="btn btn-primary"]')

        this.labels = this._container.locator('//label')

        this.errorMessages = this._container.locator('//div[@class="invalid-feedback"]')
        this.errorMessageText = this.errorMessages.locator('//p')

        this.nameLabel = this._container.locator('//label[text()="Name"]')
        this.lastNameLabel = this._container.locator('//label[text()="Last name"]')
        this.emailLabel = this._container.locator('//label[text()="Email"]')
        this.passwordLabel = this._container.locator('//label[text()="Password"]')
        this.repeatLabel = this._container.locator('//label[text()="Re-enter password"]')
    }

    async fillForm(name, lastName, email, password, repeat){
        await this.nameInput.fill(name)
        await this.lastNameInput.fill(lastName)
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.repeatInput.fill(repeat)
    }

    async clickConfirmRegistrationButton(){
        await this.createButton.click()
    }

    async getListOfLabels(){
        const labelList = []
        const allLabels = await this.labels.all()
        for (const label of allLabels) {
            const labelText = await label.innerHTML()
            labelList.push(labelText)
        }
        return labelList
    }

    async getListOfMessages(){
        const messageList = []
        const allMessages = await this.errorMessageText.all()
        for (const mess of allMessages) {
            const messageText = await mess.innerText()
            messageList.push(messageText)
        }
        return messageList
    }

    async getInputValueOfName(){
        return await this.nameInput.inputValue()
    }
    async getInputValueOfLastName(){
        return await this.lastNameInput.inputValue()
    }
    async getInputValueOfEmail(){
        return await this.emailInput.inputValue()
    }
    async getInputValueOfPassword(){
        return await this.passwordInput.inputValue()
    }
    async getInputValueOfRepeat(){
        return await this.repeatInput.inputValue()
    }
}