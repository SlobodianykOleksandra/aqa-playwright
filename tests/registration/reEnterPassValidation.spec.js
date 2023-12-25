import {test, expect} from "@playwright/test";
import WelcomePage from "../../src/pageObjects/WelcomePage/WelcomePage.js";
import {repeatData} from "../../testData/registration/inputData.js";
import {expErrorMessagesRepeat} from "../../testData/registration/errorMessages.js";



test.describe('Suite6. Re-enter password field validation',()=> {
    let page
    let welcomePage
    let registerPopup

    test.beforeEach(async ({browser})=>{

        page = await browser.newPage()
        welcomePage = new WelcomePage(page)
        await welcomePage.visit()
        registerPopup = await welcomePage.clickRegistrationButtonAndOpenPopup()
        await registerPopup.passwordInput.fill(repeatData.positiveRepeat)

    })

    test('TC6.1. Positive fill', async () => {

        await registerPopup.repeatInput.fill(repeatData.positiveRepeat)
        registerPopup.repeatInput.blur()

        const valueOfRepeat = await registerPopup.getInputValueOfRepeat()

        await expect(valueOfRepeat, 'input value is equal to filled value').toEqual
        await expect(registerPopup.errorMessages, 'error message is hidden').toBeHidden()

    })

    test('TC6.2. Fill by label',async ()=>{

        await registerPopup.repeatLabel.fill(repeatData.positiveRepeat)
        const valueOfRepeat = await registerPopup.getInputValueOfRepeat()
        await expect(valueOfRepeat, 'input value is equal to filled value').toEqual

    })

    test('TC6.3. Does not match password',async ()=>{

        await registerPopup.repeatInput.fill(repeatData.notMatchRepeat)
        registerPopup.repeatInput.blur()

        await expect(registerPopup.errorMessages, 'block with errors is visible').toBeVisible()

        const errorMessagesOnForm = await registerPopup.getListOfMessages()
        await expect(errorMessagesOnForm, 'error messages are equal to expected').toEqual([expErrorMessagesRepeat.notMatch])

    })

    test('TC6.4. Fill with incorrect value',async ()=>{

        await registerPopup.repeatInput.fill(repeatData.incorrectRepeat)
        registerPopup.repeatInput.blur()

        await expect(registerPopup.errorMessages, 'block with errors is visible').toBeVisible()

        const errorMessagesOnForm = await registerPopup.getListOfMessages()
        await expect(errorMessagesOnForm, 'error messages are equal to expected').toEqual([expErrorMessagesRepeat.invalid])

    })

    test('TC6.5. Empty',async ()=>{

        await registerPopup.repeatInput.focus()
        registerPopup.repeatInput.blur()

        await expect(registerPopup.errorMessages, 'block with errors is visible').toBeVisible()

        const errorMessagesOnForm = await registerPopup.getListOfMessages()
        await expect(errorMessagesOnForm, 'error messages are equal to expected').toEqual([expErrorMessagesRepeat.required])

    })
})