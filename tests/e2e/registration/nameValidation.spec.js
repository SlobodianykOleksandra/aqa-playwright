import {test, expect} from "@playwright/test";
import WelcomePage from "../../../src/pageObjects/WelcomePage/WelcomePage.js";
import {nameData} from "../../../src/data/inputData.js";
import {expErrorMessagesName} from "../../../src/data/errorMessages.js";

test.describe('Suite2. Name field validation',()=> {
    let page
    let welcomePage
    let registerPopup

    test.beforeEach(async ({browser})=>{

        page = await browser.newPage()
        welcomePage = new WelcomePage(page)
        await welcomePage.visit()
        registerPopup = await welcomePage.clickRegistrationButtonAndOpenPopup()

    })

    test('TC2.1. Positive fill', async () => {

        await registerPopup.nameInput.fill(nameData.positiveName)
        registerPopup.nameInput.blur()
        await expect(registerPopup.nameInput, 'input value is equal to filled value').toHaveValue(nameData.positiveName)
        await expect(registerPopup.errorMessages, 'error message is hidden').toBeHidden()

    })

    test('TC2.2. Fill by label',async ()=>{

        await registerPopup.nameLabel.fill(nameData.positiveName)
        await expect.soft(registerPopup.nameInput, 'input value is equal to filled value').toHaveValue(nameData.positiveName)

    })

    test('TC2.3. Fill with space',async ()=>{

        await registerPopup.nameInput.fill(nameData.spaceName)
        registerPopup.nameInput.blur()

        await expect(registerPopup.errorMessages, 'block with errors is visible').toBeVisible()

        const errorMessagesOnForm = await registerPopup.getListOfMessages()
        await expect(errorMessagesOnForm, 'error messages are equal to expected').toEqual([expErrorMessagesName.invalid, expErrorMessagesName.length])

    })

    test('TC2.4. Fill with out of range value',async ()=>{

        await registerPopup.nameInput.fill(nameData.bigName)
        registerPopup.nameInput.blur()

        await expect(registerPopup.errorMessages, 'block with errors is visible').toBeVisible()

        const errorMessagesOnForm = await registerPopup.getListOfMessages()
        await expect(errorMessagesOnForm, 'error messages are equal to expected').toEqual([expErrorMessagesName.length])

    })

    test('TC2.5. Fill with incorrect value',async ()=>{

        await registerPopup.nameInput.fill(nameData.withSymbName)
        registerPopup.nameInput.blur()

        await expect(registerPopup.errorMessages, 'block with errors is visible').toBeVisible()

        const errorMessagesOnForm = await registerPopup.getListOfMessages()
        await expect(errorMessagesOnForm, 'error messages are equal to expected').toEqual([expErrorMessagesName.invalid])

    })

    test('TC2.6. Empty',async ()=>{

        registerPopup.nameInput.focus()
        registerPopup.nameInput.blur()

        await expect(registerPopup.errorMessages, 'block with errors is visible').toBeVisible()

        const errorMessagesOnForm = await registerPopup.getListOfMessages()
        await expect(errorMessagesOnForm, 'error messages are equal to expected').toEqual([expErrorMessagesName.required])

    })
})