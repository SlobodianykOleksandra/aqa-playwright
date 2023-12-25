import BaseComponent from "./BaseComponent.js";

export default class Header extends BaseComponent{
    constructor(page) {
        super(page, page.locator('//header[@class="header bg-basic-dark"]'))
        this.signInBtn = this._container.locator('//button[@class="btn btn-outline-white header_signin"]')
    }
}