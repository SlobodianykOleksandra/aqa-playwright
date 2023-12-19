import {test, expect} from "@playwright/test";

const passwordData = {
    positivePass: 'T0ny_P3pp3r*ny',
    lilPass: 'T0ny_',
    incorrectPass: 'PepperonyTony'
}

test.describe('Suite5. Password field validation',()=> {

    test.beforeEach(async ({page}) => {
        await page.goto('/')
        const registrBtn = page.locator('//button[@class="hero-descriptor_btn btn btn-primary"]')
        await registrBtn.click()
    })

    test('TC5.1. Positive fill', async ({ page }) => {
        const modalRegistr = page.locator('//app-signup-modal')
        const passwordInput = modalRegistr.locator('//input[@id="signupPassword"]')
        const messageBlock = modalRegistr.locator('//div[@class="invalid-feedback"]').nth(0)

        await passwordInput.fill(passwordData.positivePass)
        await passwordInput.evaluate(e => e.blur())
        await expect(await passwordInput.inputValue()).toEqual(passwordData.positivePass)
        await expect(messageBlock).toBeHidden()
    })

    test('TC5.2. Fill by label',async ({page})=>{
        const modalRegistr = page.locator('//app-signup-modal')
        const passwordLabel = modalRegistr.locator("//label[text()='Password']")
        const passwordInput = modalRegistr.locator('//input[@id="signupPassword"]')

        await passwordLabel.fill(passwordData.positivePass)
        const result = await passwordInput.inputValue()
        await expect.soft(result).toEqual(passwordData.positivePass)
    })

    test('TC5.3. Fill with out of range value',async ({page})=>{
        const modalRegistr = page.locator('//app-signup-modal')
        const passwordInput = modalRegistr.locator('//input[@id="signupPassword"]')

        const expectedMessages = ['Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter']
        const messageBlock = modalRegistr.locator('//div[@class="invalid-feedback"]').nth(0)

        await passwordInput.fill(passwordData.lilPass)
        await passwordInput.evaluate(e => e.blur())
        await expect(passwordInput).toHaveAttribute('class', 'form-control ng-invalid ng-dirty is-invalid ng-touched')
        await expect(messageBlock).toBeVisible()

        const selectedMessages = messageBlock.locator('//p')

        async function getMessageList (){
            const messageList = []
            const allMessages = await selectedMessages.all()

            for (const mess of allMessages) {
                const messageText = await mess.innerText()
                messageList.push(messageText)
            }
            return messageList
        }

        const result = await getMessageList()
        await expect(result).toEqual(expectedMessages)
    })

    test('TC5.4. Fill with incorrect value',async ({page})=>{
        const modalRegistr = page.locator('//app-signup-modal')
        const passwordInput = modalRegistr.locator('//input[@id="signupPassword"]')

        const expectedMessages = ['Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter']
        const messageBlock = modalRegistr.locator('//div[@class="invalid-feedback"]').nth(0)

        await passwordInput.fill(passwordData.incorrectPass)
        await passwordInput.evaluate(e => e.blur())
        await expect(passwordInput).toHaveAttribute('class', 'form-control ng-invalid ng-dirty is-invalid ng-touched')
        await expect(messageBlock).toBeVisible()

        const selectedMessages = messageBlock.locator('//p')

        async function getMessageList (){
            const messageList = []
            const allMessages = await selectedMessages.all()

            for (const mess of allMessages) {
                const messageText = await mess.innerText()
                messageList.push(messageText)
            }
            return messageList
        }

        const result = await getMessageList()
        await expect(result).toEqual(expectedMessages)
    })

    test('TC5.5. Empty',async ({page})=>{
        const modalRegistr = page.locator('//app-signup-modal')
        const passwordInput = modalRegistr.locator('//input[@id="signupPassword"]')

        const expectedMessages = ['Password required']
        const messageBlock = modalRegistr.locator('//div[@class="invalid-feedback"]').nth(0)

        await passwordInput.focus()
        await passwordInput.evaluate(e => e.blur())
        await expect(passwordInput).toHaveAttribute('class', 'form-control ng-pristine ng-invalid is-invalid ng-touched')
        await expect(messageBlock).toBeVisible()

        const selectedMessages = messageBlock.locator('//p')

        async function getMessageList (){
            const messageList = []
            const allMessages = await selectedMessages.all()

            for (const mess of allMessages) {
                const messageText = await mess.innerText()
                messageList.push(messageText)
            }
            return messageList
        }

        const result = await getMessageList()
        await expect(result).toEqual(expectedMessages)
    })
})