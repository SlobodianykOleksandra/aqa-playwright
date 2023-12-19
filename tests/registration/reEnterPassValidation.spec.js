import {test, expect} from "@playwright/test";

const reEnterData = {
    positiveRepeat: 'T0ny_P3pp3r*ny',
    notMatchRepeat: 'Tony_P3pp3rony',
    incorrectRepeat: 'T0ny_',
}

test.describe('Suite6. Re-enter password field validation',()=> {

    test.beforeEach(async ({page}) => {
        await page.goto('/')
        const registrBtn = page.locator('//button[@class="hero-descriptor_btn btn btn-primary"]')
        await registrBtn.click()

        const modalRegistr = page.locator('//app-signup-modal')
        const passwordInput = modalRegistr.locator('//input[@id="signupPassword"]')
        await passwordInput.fill('T0ny_P3pp3r*ny')
        await passwordInput.evaluate(e => e.blur())
    })

    test('TC6.1. Positive fill', async ({ page }) => {
        const modalRegistr = page.locator('//app-signup-modal')
        const reEnterInput = modalRegistr.locator('//input[@id="signupRepeatPassword"]')
        const messageBlock = modalRegistr.locator('//div[@class="invalid-feedback"]').nth(0)

        await reEnterInput.fill(reEnterData.positiveRepeat)
        await reEnterInput.evaluate(e => e.blur())
        await expect(await reEnterInput.inputValue()).toEqual(reEnterData.positiveRepeat)
        await expect(messageBlock).toBeHidden()
    })

    test('TC6.2. Fill by label',async ({page})=>{
        const modalRegistr = page.locator('//app-signup-modal')
        const reEnterLabel = modalRegistr.locator("//label[text()='Re-enter password']")
        const reEnterInput = modalRegistr.locator('//input[@id="signupRepeatPassword"]')

        await reEnterLabel.fill(reEnterData.positiveRepeat)
        const result = await reEnterInput.inputValue()
        await expect.soft(result).toEqual(reEnterData.positiveRepeat)
    })

    test('TC6.3. Does not match password',async ({page})=>{
        const modalRegistr = page.locator('//app-signup-modal')
        const reEnterInput = modalRegistr.locator('//input[@id="signupRepeatPassword"]')

        const expectedMessages = ['Passwords do not match']
        const messageBlock = modalRegistr.locator('//div[@class="invalid-feedback"]').nth(0)

        await reEnterInput.fill(reEnterData.notMatchRepeat)
        await reEnterInput.evaluate(e => e.blur())
        await expect(reEnterInput).toHaveAttribute('class', 'form-control ng-dirty ng-valid is-invalid ng-touched')
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

    test('TC6.4. Fill with incorrect value',async ({page})=>{
        const modalRegistr = page.locator('//app-signup-modal')
        const reEnterInput = modalRegistr.locator('//input[@id="signupRepeatPassword"]')

        const expectedMessages = ['Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter']
        const messageBlock = modalRegistr.locator('//div[@class="invalid-feedback"]').nth(0)

        await reEnterInput.fill(reEnterData.incorrectRepeat)
        await reEnterInput.evaluate(e => e.blur())
        await expect(reEnterInput).toHaveAttribute('class', 'form-control ng-invalid ng-dirty is-invalid ng-touched')
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

    test('TC6.5. Empty',async ({page})=>{
        const modalRegistr = page.locator('//app-signup-modal')
        const reEnterInput = modalRegistr.locator('//input[@id="signupRepeatPassword"]')

        const expectedMessages = ['Re-enter password required']
        const messageBlock = modalRegistr.locator('//div[@class="invalid-feedback"]').nth(0)

        await reEnterInput.focus()
        await reEnterInput.evaluate(e => e.blur())
        await expect(reEnterInput).toHaveAttribute('class', 'form-control ng-pristine ng-invalid is-invalid ng-touched')
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