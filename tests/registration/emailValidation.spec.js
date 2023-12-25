import {test, expect} from "@playwright/test";
import WelcomePage from "../../src/pageObjects/WelcomePage/WelcomePage.js";
import {emailData} from "../../testData/registration/inputData.js";
import {expErrorMessagesEmail} from "../../testData/registration/errorMessages.js";

test.describe('Suite4. Email field validation',()=> {
    let page
    let welcomePage
    let registerPopup

    test.beforeEach(async ({browser})=>{

        page = await browser.newPage()
        welcomePage = new WelcomePage(page)
        await welcomePage.visit()
        registerPopup = await welcomePage.clickRegistrationButtonAndOpenPopup()

    })

    test('TC4.1. Positive fill', async () => {

        await registerPopup.emailInput.fill(emailData.positiveEmail)
        registerPopup.emailInput.blur()
        const valueOfEmail = await registerPopup.getInputValueOfEmail()

        await expect(valueOfEmail, 'input value is equal to filled value').toEqual(emailData.positiveEmail)
        await expect(registerPopup.errorMessages, 'error message is hidden').toBeHidden()

    })

    test('TC4.2. Fill by label',async ()=>{

        await registerPopup.emailLabel.fill(emailData.positiveEmail)
        const valueOfEmail = await registerPopup.getInputValueOfEmail()

        await expect(valueOfEmail, 'input value is equal to filled value').toEqual(emailData.positiveEmail)

    })

    test('TC4.3. Fill with incorrect value',async ()=>{

        await registerPopup.emailInput.fill(emailData.wrongFormatEmail)
        registerPopup.emailInput.blur()

        await expect(registerPopup.errorMessages, 'block with errors is visible').toBeVisible()

        const errorMessagesOnForm = await registerPopup.getListOfMessages()
        await expect(errorMessagesOnForm, 'error messages are equal to expected').toEqual([expErrorMessagesEmail.invalid])

    })

    test('TC4.4. Empty',async ()=>{

        await registerPopup.emailInput.focus()
        registerPopup.emailInput.blur()

        await expect(registerPopup.errorMessages, 'block with errors is visible').toBeVisible()

        const errorMessagesOnForm = await registerPopup.getListOfMessages()
        await expect(errorMessagesOnForm, 'error messages are equal to expected').toEqual([expErrorMessagesEmail.required])

    })
})