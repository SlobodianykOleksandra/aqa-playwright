import {test, expect} from "@playwright/test";
import WelcomePage from "../../src/pageObjects/WelcomePage/WelcomePage.js";
import GaragePage from "../../src/pageObjects/GaragePage/GaragePage.js";
import {correctUserData} from "../../testData/registration/inputData.js";
import SettingsPage from "../../src/pageObjects/SettingsPage/SettingsPage.js";

test.describe('Suite7. User creation',()=> {
    let page
    let welcomePage
    let garagePage
    let settingsPage

    test.beforeEach(async ({browser})=>{
        page = await browser.newPage()
        welcomePage = new WelcomePage(page)
        await welcomePage.visit()

        garagePage = new GaragePage(page)
        settingsPage = new SettingsPage(page)
    })

    test('TC7.1. Create valid user', async () => {

        const registerPopup = await welcomePage.clickRegistrationButtonAndOpenPopup()
        await registerPopup.fillForm(correctUserData.name, correctUserData.lastName, `aqa-${correctUserData.email}`, correctUserData.password, correctUserData.repeat)

        await expect(registerPopup.createButton, 'create button should be enabled').toBeEnabled()

        await registerPopup.clickConfirmRegistrationButton()
        await garagePage.waitLoaded()

        await expect(page, 'page has expected URL').toHaveURL('/panel/garage')

    })

    test('TC7.2. Sign in and remove user',async ()=>{

        const signInPopup = await welcomePage.clickSigningButtonAndOpenPopup()
        await signInPopup.fillForm(`aqa-${correctUserData.email}`, correctUserData.password)

        await expect(signInPopup.loginButton, 'login button should be enabled').toBeEnabled()

        await signInPopup.clickLoginButton()
        await garagePage.waitLoaded()

        await garagePage.clickSettingsAndRedirect()
        await settingsPage.waitLoaded()

        const removePopup = await settingsPage.clickRemoveButtonAndOpenPopup()
        await removePopup.clickConfirmRemoveButtonAndRedirect()

        await welcomePage.waitLoaded()
    })
})