import {test, expect} from "@playwright/test";

const emailData = {
    positiveEmail: 'test@test.ua',
    wrongFormatEmail: 'test'
}

test.describe('Suite4. Email field validation',()=> {

    test.beforeEach(async ({page}) => {
        await page.goto('/')
        const registrBtn = page.locator('//button[@class="hero-descriptor_btn btn btn-primary"]')
        await registrBtn.click()
    })

    test('TC4.1. Positive fill', async ({ page }) => {
        const modalRegistr = page.locator('//app-signup-modal')
        const emailInput = modalRegistr.locator('//input[@id="signupEmail"]')
        const messageBlock = modalRegistr.locator('//div[@class="invalid-feedback"]').nth(0)

        await emailInput.fill(emailData.positiveEmail)
        await emailInput.evaluate(e => e.blur())
        await expect(await emailInput.inputValue()).toEqual(emailData.positiveEmail)
        await expect(messageBlock).toBeHidden()
    })

    test('TC4.2. Fill by label',async ({page})=>{
        const modalRegistr = page.locator('//app-signup-modal')
        const emailLabel = modalRegistr.locator("//label[text()='Email']")
        const emailInput = modalRegistr.locator('//input[@id="signupEmail"]')

        await emailLabel.fill(emailData.positiveEmail)
        const result = await emailInput.inputValue()
        await expect.soft(result).toEqual(emailData.positiveEmail)
    })

    test('TC4.3. Fill with incorrect value',async ({page})=>{
        const modalRegistr = page.locator('//app-signup-modal')
        const emailInput = modalRegistr.locator('//input[@id="signupEmail"]')

        const expectedMessages = ['Email is incorrect']
        const messageBlock = modalRegistr.locator('//div[@class="invalid-feedback"]').nth(0)

        await emailInput.fill(emailData.wrongFormatEmail)
        await emailInput.evaluate(e => e.blur())
        await expect(emailInput).toHaveAttribute('class', 'form-control ng-invalid ng-dirty is-invalid ng-touched')
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

    test('TC4.4. Empty',async ({page})=>{
        const modalRegistr = page.locator('//app-signup-modal')
        const emailInput = modalRegistr.locator('//input[@id="signupEmail"]')

        const expectedMessages = ['Email required']
        const messageBlock = modalRegistr.locator('//div[@class="invalid-feedback"]').nth(0)

        await emailInput.focus()
        await emailInput.evaluate(e => e.blur())
        await expect(emailInput).toHaveAttribute('class', 'form-control ng-pristine ng-invalid is-invalid ng-touched')
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