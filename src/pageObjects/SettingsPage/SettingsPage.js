import BasePage from "../BasePage.js";
import RemoveAccountBlock from "./settingsPageComponents/RemoveAccountBlock.js";
import RemovePopup from "./settingsPageComponents/RemovePopup.js";

export default class SettingsPage extends BasePage{
    constructor(page) {
        super(page, '/panel/settings', '//button[@class="btn btn-info-bg"]')
        this.removeAccount = new RemoveAccountBlock(page)
    }

    async clickRemoveButtonAndOpenPopup(){
        await this.removeAccount.removeButton.click()
        return new RemovePopup(this._page)
    }

}