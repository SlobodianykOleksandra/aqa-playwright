import BaseComponent from "../../../components/BaseComponent.js";

export default class AddCarPopup extends BaseComponent{
    constructor(page) {
        super(page, page.locator('//app-add-car-modal'));
        this.brandSelect = this._container.locator('//select[@id="addCarBrand"]')
        this.modelSelect = this._container.locator('//select[@id="addCarModel"]')
        this.mileageInput = this._container.locator('//input[@id="addCarMileage"]')

        this.addButton = this._container.locator('//button[@class="btn btn-primary"]')
    }

    async fillFormAndSubmit(brand,model,mileage){
        await this.brandSelect.selectOption({label:brand})
        await this.modelSelect.selectOption({label:model})
        await this.mileageInput.fill(mileage.toString())
        await this.addButton.click()
    }

}