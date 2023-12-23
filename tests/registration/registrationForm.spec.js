import {test, expect} from "@playwright/test";
import WelcomePage from "../../src/pageObjects/WelcomePage/WelcomePage.js";
import {expectedLabelsList} from "../../testData/registration/inputData.js";

test.describe('Suite1. Registration form validation',()=> {
    let page
    let welcomePage

    test.beforeEach(async ({browser})=>{

        page = await browser.newPage()
        welcomePage = new WelcomePage(page)
        await welcomePage.visit()

    })
    test('TC1.1. Sign up button. Registration form opening check', async () => {

        const registerPopup = await welcomePage.clickRegistrationButtonAndOpenPopup()
        await expect(registerPopup._container, 'registration popup is visible').toBeVisible()

  })

    test('TC1.2. Sign in button - registration. Registration form opening check',async ()=>{

        const signInPopup = await welcomePage.clickSigningButtonAndOpenPopup()
        await expect(signInPopup._container, 'sign in popup is visible').toBeVisible()
        const registerPopup = await signInPopup.clickRegistrationButtonAndRedirectToPopup()
        await expect(registerPopup._container, 'registration popup is visible').toBeVisible()

    })
    test('TC1.3. Check visibility and state of elements on the form',async ()=>{

        const registerPopup = await welcomePage.clickRegistrationButtonAndOpenPopup()
        const labelsOnForm = await registerPopup.getListOfLabels()

        await expect(registerPopup.header, 'header has text').toHaveText('Registration')

        await expect(labelsOnForm, 'labels are equal to expected list').toEqual(expectedLabelsList)

        await expect(registerPopup.nameInput).toBeEditable()
        await expect(registerPopup.lastNameInput).toBeEditable()
        await expect(registerPopup.emailInput).toBeEditable()
        await expect(registerPopup.passwordInput).toBeEditable()
        await expect(registerPopup.repeatInput).toBeEditable()

        await expect(registerPopup.createButton).toBeDisabled()

    })
})