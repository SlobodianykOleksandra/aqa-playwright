import BaseComponent from "../../../components/BaseComponent.js";

export default class RemoveAccountBlock extends BaseComponent{
    constructor(page) {
        super(page, page.locator('//div[@class="user-settings_item -form -remove-account"]'))
        this.removeButton = this._container.locator('//button[@class="btn btn-danger-bg"]')
    }
}