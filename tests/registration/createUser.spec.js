import {test, expect} from "@playwright/test";

const correctUserData = {
    name: 'Tony',
    lastName: 'Pepperony',
    email: 'tony_pepper@test.ua',
    password: 'T0ny_P3pp3r*ny',
    repeat: 'T0ny_P3pp3r*ny'
}
const toRemoveUserData = {
    name: 'Iki',
    lastName: 'Hiyori',
    email: 'iki-hiyori@test.ua',
    password: '1kiHiy0ry',
    repeat: '1kiHiy0ry'
}

test.describe('Suite7. User creation',()=> {

    test.beforeEach(async ({page}) => {
        await page.goto('/')
    })

    test('TC7.1. Create valid user', async ({ page }) => {
        const registerBtn = page.locator('//button[@class="hero-descriptor_btn btn btn-primary"]')
        const modalRegistr = page.locator('//app-signup-modal')
        const createBtn = modalRegistr.locator('//button', {hasText:'Register'})

        const nameInput = modalRegistr.locator('//input[@id="signupName"]')
        const lastNameInput = modalRegistr.locator('//input[@id="signupLastName"]')
        const emailInput = modalRegistr.locator('//input[@id="signupEmail"]')
        const passwordInput = modalRegistr.locator('//input[@id="signupPassword"]')
        const reEnterInput = modalRegistr.locator('//input[@id="signupRepeatPassword"]')

        await registerBtn.click()

        await nameInput.fill(correctUserData.name)
        await lastNameInput.fill(correctUserData.lastName)
        await emailInput.fill(`aqa-${correctUserData.email}`)
        await passwordInput.fill(correctUserData.password)
        await reEnterInput.fill(correctUserData.repeat)

        await expect(createBtn).toBeEnabled()
        await createBtn.click()
    })

    test('TC7.2. Remove user manually',async ({page})=>{
        const registerBtn = page.locator('//button[@class="hero-descriptor_btn btn btn-primary"]')
        const modalRegistr = page.locator('//app-signup-modal')
        const createBtn = modalRegistr.locator('//button', {hasText:'Register'})

        const nameInput = modalRegistr.locator('//input[@id="signupName"]')
        const lastNameInput = modalRegistr.locator('//input[@id="signupLastName"]')
        const emailInput = modalRegistr.locator('//input[@id="signupEmail"]')
        const passwordInput = modalRegistr.locator('//input[@id="signupPassword"]')
        const reEnterInput = modalRegistr.locator('//input[@id="signupRepeatPassword"]')

        await registerBtn.click()

        await nameInput.fill(toRemoveUserData.name)
        await lastNameInput.fill(toRemoveUserData.lastName)
        await emailInput.fill(`aqa-${toRemoveUserData.email}`)
        await passwordInput.fill(toRemoveUserData.password)
        await reEnterInput.fill(toRemoveUserData.repeat)

        await createBtn.click()

        // await page.waitForEvent('popup')

        // await expect(createBtn).toBeEnabled()
        // await createBtn.click()
        //
        // await page.getByText('Register').click();
        // await page.waitForURL('**/api/auth/signup')
        // await expect(page).toHaveURL('/panel/garage')

        // const settingsBtn = page.locator('a',{hasText:'Settings'})
        // await settingsBtn.click()
        //
        // await page.waitForURL('https://qauto.forstudy.space/panel/settings')
        //
        // const removeBtn = page.locator('button',{hasText:'Remove my account'})
        // await removeBtn.click()
        //
        // const removeModal = page.locator('//app-remove-account-modal')
        // await expect(removeModal).toBeVisible()
        //
        // const confirmRemoveBtn = removeModal.locator('button',{hasText:'Remove'})
        // await confirmRemoveBtn.click()
    })
})