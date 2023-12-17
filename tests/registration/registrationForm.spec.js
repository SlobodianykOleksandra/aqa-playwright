import {test, expect} from "@playwright/test";

test.describe('Suite1. Registration form validation',()=> {
    test.beforeEach(async ({page}) => {
        await page.goto('/')
    })
    test('TC1.1. Sign up button. Registration form opening check', async ({ page }) => {
          const registrBtn = page.locator('//button[@class="hero-descriptor_btn btn btn-primary"]')
          const modalRegistr = page.locator('//app-signup-modal')

          await registrBtn.click()
          await expect(modalRegistr).toBeVisible()
  })

    test('TC1.2. Sign in - registration. Registration form opening check',async ({page})=>{
        const signinBtn = page.locator('//button[@class="btn btn-outline-white header_signin"]')
        const modalSignin = page.locator('//div[@class="modal-content"]')
        const registrBtn = modalSignin.locator('//button', {hasText:'Registration'})
        const modalRegistr = page.locator('//app-signup-modal')

        await signinBtn.click()
        await expect(modalSignin).toBeVisible()
        await registrBtn.click()
        await expect(modalRegistr).toBeVisible()
    })
    test('TC1.3. Check visibility and state of elements on the form',async ({page})=>{
        const modalRegistr = page.locator('//app-signup-modal')
        const header = modalRegistr.locator('//h4')

        const nameLabel = modalRegistr.locator("//label").nth(0)
        const nameInput = nameLabel.locator('//following-sibling::input')
        const lastNameLabel = modalRegistr.locator("//label").nth(1)
        const lastNameInput = lastNameLabel.locator("//following-sibling::input")
        const emailLabel = modalRegistr.locator("//label").nth(2)
        const emailInput = emailLabel.locator("//following-sibling::input")
        const passwordLabel = modalRegistr.locator("//label").nth(3)
        const passwordInput = passwordLabel.locator("//following-sibling::input")
        const reEnterLabel = modalRegistr.locator("//label").nth(4)
        const reEnterInput = reEnterLabel.locator("//following-sibling::input")

        const selectedLabels = modalRegistr.locator('//label')
        const expectedList = ['Name','Last name','Email','Password','Re-enter password']
        const labelList = []

        const registerBtn = modalRegistr.locator('//button', {hasText:'Register'})
        const closeBtn = modalRegistr.locator('//button[@class="close"]')

        await page.locator('//button[@class="hero-descriptor_btn btn btn-primary"]').click()
        // await expect(modalRegistr).toBeVisible() //Retried step from other test in the Test Suite
        await expect(header).toHaveText('Registration')

        const allLabels = await selectedLabels.all()

        for (const label of allLabels) {
            const labelText = await label.innerHTML()
            labelList.push(labelText)
        }

        await expect(labelList).toEqual(expectedList)
        console.log(expectedList)

        await expect(nameInput).toBeEditable()
        await expect(lastNameInput).toBeEditable()
        await expect(emailInput).toBeEditable()
        await expect(passwordInput).toBeEditable()
        await expect(reEnterInput).toBeEditable()

        await expect(registerBtn).toBeDisabled()
        await expect(closeBtn).toBeEnabled()
    })
})