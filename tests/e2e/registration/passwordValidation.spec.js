import {test, expect} from "@playwright/test";
import WelcomePage from "../../../src/pageObjects/WelcomePage/WelcomePage.js";
import {passwordData} from "../../../src/data/inputData.js";
import {expErrorMessagesPassword} from "../../../src/data/errorMessages.js";



test.describe('Suite5. Password field validation',()=> {
    let page
    let welcomePage
    let registerPopup

    test.beforeEach(async ({browser})=>{

        page = await browser.newPage()
        welcomePage = new WelcomePage(page)
        await welcomePage.visit()
        registerPopup = await welcomePage.clickRegistrationButtonAndOpenPopup()

    })

    test('TC5.1. Positive fill', async () => {

        await registerPopup.passwordInput.fill(passwordData.positivePass)
        registerPopup.passwordInput.blur()
        await expect(registerPopup.passwordInput, 'input value is equal to filled value').toHaveValue(passwordData.positivePass)
        await expect(registerPopup.errorMessages, 'error message is hidden').toBeHidden()

    })

    test('TC5.2. Fill by label',async ()=>{

        await registerPopup.passwordLabel.fill(passwordData.positivePass)
        await expect(registerPopup.passwordInput, 'input value is equal to filled value').toHaveValue(passwordData.positivePass)

    })

    test('TC5.3. Fill with out of range value',async ()=>{

        await registerPopup.passwordLabel.fill(passwordData.lilPass)
        registerPopup.passwordInput.blur()

        await expect(registerPopup.errorMessages, 'block with errors is visible').toBeVisible()

        const errorMessagesOnForm = await registerPopup.getListOfMessages()
        await expect(errorMessagesOnForm, 'error messages are equal to expected').toEqual([expErrorMessagesPassword.invalid])

    })

    test('TC5.4. Fill with incorrect value',async ()=>{

        await registerPopup.passwordLabel.fill(passwordData.incorrectPass)
        registerPopup.passwordInput.blur()

        await expect(registerPopup.errorMessages, 'block with errors is visible').toBeVisible()

        const errorMessagesOnForm = await registerPopup.getListOfMessages()
        await expect(errorMessagesOnForm, 'error messages are equal to expected').toEqual([expErrorMessagesPassword.invalid])

    })

    test('TC5.5. Empty',async ()=>{

        await registerPopup.passwordLabel.focus()
        registerPopup.passwordInput.blur()

        await expect(registerPopup.errorMessages, 'block with errors is visible').toBeVisible()

        const errorMessagesOnForm = await registerPopup.getListOfMessages()
        await expect(errorMessagesOnForm, 'error messages are equal to expected').toEqual([expErrorMessagesPassword.required])

    })
})