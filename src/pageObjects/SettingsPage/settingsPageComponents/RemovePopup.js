import BaseComponent from "../../../components/BaseComponent.js";

export default class RemovePopup extends BaseComponent{
    constructor(page) {
        super(page, page.locator('//app-remove-account-modal'));
        this.confirmRemoveButton = this._container.locator('//button[@class="btn btn-danger"]')
    }

    async clickConfirmRemoveButtonAndRedirect(){
        await this.confirmRemoveButton.click()
    }
}