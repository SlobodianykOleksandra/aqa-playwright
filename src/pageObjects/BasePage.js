import BaseComponent from "../components/BaseComponent.js";
import Header from "../components/Header.js";

export default class BasePage extends BaseComponent{
    constructor(page, url, waitPageSelector = 'html') {
        super(page, page.locator('html'));
        this._page = page
        this._url = url
        this._waitPageSelector = waitPageSelector
        this.header = new Header(page)
    }

    get page(){
        return this._page
    }

    async waitLoaded(){
        await this._page.locator(this._waitPageSelector).waitFor()
    }
    async visit(){
        await this._page.goto(this._url)
        await this.waitLoaded()
    }
}