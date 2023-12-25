import {test, expect} from "@playwright/test";
import WelcomePage from "../../src/pageObjects/WelcomePage/WelcomePage.js";
import {lastNameData} from "../../testData/registration/inputData.js";
import {expErrorMessagesLastName} from "../../testData/registration/errorMessages.js";

test.describe('Suite3. Last Name field validation',()=> {
    let page
    let welcomePage
    let registerPopup

    test.beforeEach(async ({browser})=>{

        page = await browser.newPage()
        welcomePage = new WelcomePage(page)
        await welcomePage.visit()
        registerPopup = await welcomePage.clickRegistrationButtonAndOpenPopup()

    })

    test('TC3.1. Positive fill', async () => {

        await registerPopup.lastNameInput.fill(lastNameData.positiveLastName)
        registerPopup.lastNameInput.blur()
        await expect(registerPopup.lastNameInput).toHaveValue(lastNameData.positiveLastName)
        await expect(registerPopup.errorMessages, 'error message is hidden').toBeHidden()

    })

    test('TC3.2. Fill by label',async ()=>{

        await registerPopup.lastNameLabel.fill(lastNameData.positiveLastName)
        await expect.soft(registerPopup.lastNameInput, 'input value is equal to filled value').toHaveValue(lastNameData.positiveLastName)

    })

    test('TC3.3. Fill with space',async ()=>{

        await registerPopup.lastNameInput.fill(lastNameData.spaceLastName)
        registerPopup.lastNameInput.blur()

        await expect(registerPopup.errorMessages, 'block with errors is visible').toBeVisible()

        const errorMessagesOnForm = await registerPopup.getListOfMessages()
        await expect(errorMessagesOnForm, 'error messages are equal to expected').toEqual([expErrorMessagesLastName.invalid, expErrorMessagesLastName.length])

    })

    test('TC3.4. Fill with out of range value',async ()=>{

        await registerPopup.lastNameInput.fill(lastNameData.lilLastName)
        registerPopup.lastNameInput.blur()

        await expect(registerPopup.errorMessages, 'block with errors is visible').toBeVisible()

        const errorMessagesOnForm = await registerPopup.getListOfMessages()
        await expect(errorMessagesOnForm, 'error messages are equal to expected').toEqual([expErrorMessagesLastName.length])

    })

    test('TC3.5. Fill with incorrect value',async ()=>{

        await registerPopup.lastNameInput.fill(lastNameData.withNumberLastName)
        registerPopup.lastNameInput.blur()

        await expect(registerPopup.errorMessages, 'block with errors is visible').toBeVisible()

        const errorMessagesOnForm = await registerPopup.getListOfMessages()
        await expect(errorMessagesOnForm, 'error messages are equal to expected').toEqual([expErrorMessagesLastName.invalid])

    })

    test('TC3.6. Empty',async ()=>{

        registerPopup.lastNameInput.focus()
        registerPopup.lastNameInput.blur()

        await expect(registerPopup.errorMessages, 'block with errors is visible').toBeVisible()

        const errorMessagesOnForm = await registerPopup.getListOfMessages()
        await expect(errorMessagesOnForm, 'error messages are equal to expected').toEqual([expErrorMessagesLastName.required])

    })
})