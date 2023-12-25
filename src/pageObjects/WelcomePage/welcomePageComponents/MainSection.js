import BaseComponent from "../../../components/BaseComponent.js";

export default class MainSection extends BaseComponent{
    constructor(page) {
        super(page, page.locator('//section[@class="section hero"]'));
        this.registerButton = this._container.locator('//button[@class="hero-descriptor_btn btn btn-primary"]')
    }
}