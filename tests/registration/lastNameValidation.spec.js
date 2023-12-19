import {test, expect} from "@playwright/test";

const lastNameData = {
    positiveLastName: 'Pepperony',
    spaceLastName: ' ',
    lilLastName: 'Y',
    withNumberLastName: 'P3pperony'
}

test.describe('Suite3. Last Name field validation',()=> {

    test.beforeEach(async ({page}) => {
        await page.goto('/')
        const registrBtn = page.locator('//button[@class="hero-descriptor_btn btn btn-primary"]')
        await registrBtn.click()
    })

    test('TC3.1. Positive fill', async ({ page }) => {
        const modalRegistr = page.locator('//app-signup-modal')
        const lastNameInput = modalRegistr.locator('//input[@id="signupLastName"]')
        const messageBlock = modalRegistr.locator('//div[@class="invalid-feedback"]').nth(0)

        await lastNameInput.fill(lastNameData.positiveLastName)
        await lastNameInput.evaluate(e => e.blur())
        await expect(await lastNameInput.inputValue()).toEqual(lastNameData.positiveLastName)
        await expect(messageBlock).toBeHidden()
    })

    test('TC3.2. Fill by label',async ({page})=>{
        const modalRegistr = page.locator('//app-signup-modal')
        const lastNameLabel = modalRegistr.locator("//label[text()='Last name']")
        const lastNameInput = modalRegistr.locator('//input[@id="signupLastName"]')

        await lastNameLabel.fill(lastNameData.positiveLastName)
        const result = await lastNameInput.inputValue()
        await expect.soft(result).toEqual(lastNameData.positiveLastName)
    })

    test('TC3.3. Fill with space',async ({page})=>{
        const modalRegistr = page.locator('//app-signup-modal')
        const lastNameInput = modalRegistr.locator('//input[@id="signupLastName"]')

        const expectedMessages = ['Last name is invalid','Last name has to be from 2 to 20 characters long']
        const messageBlock = modalRegistr.locator('//div[@class="invalid-feedback"]').nth(0)

        await lastNameInput.fill(lastNameData.spaceLastName)
        await lastNameInput.evaluate(e => e.blur())
        await expect(lastNameInput).toHaveAttribute('class', 'form-control ng-invalid ng-dirty is-invalid ng-touched')
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

    test('TC3.4. Fill with out of range value',async ({page})=>{
        const modalRegistr = page.locator('//app-signup-modal')
        const lastNameInput = modalRegistr.locator('//input[@id="signupLastName"]')

        const expectedMessages = ['Last name has to be from 2 to 20 characters long']
        const messageBlock = modalRegistr.locator('//div[@class="invalid-feedback"]').nth(0)

        await lastNameInput.fill(lastNameData.lilLastName)
        await lastNameInput.evaluate(e => e.blur())
        await expect(lastNameInput).toHaveAttribute('class', 'form-control ng-invalid ng-dirty is-invalid ng-touched')
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

    test('TC3.5. Fill with incorrect value',async ({page})=>{
        const modalRegistr = page.locator('//app-signup-modal')
        const lastNameInput = modalRegistr.locator('//input[@id="signupLastName"]')

        const expectedMessages = ['Last name is invalid']
        const messageBlock = modalRegistr.locator('//div[@class="invalid-feedback"]').nth(0)

        await lastNameInput.fill(lastNameData.withNumberLastName)
        await lastNameInput.evaluate(e => e.blur())
        await expect(lastNameInput).toHaveAttribute('class', 'form-control ng-invalid ng-dirty is-invalid ng-touched')
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

    test('TC3.6. Empty',async ({page})=>{
        const modalRegistr = page.locator('//app-signup-modal')
        const lastNameInput = modalRegistr.locator('//input[@id="signupLastName"]')

        const expectedMessages = ['Last name required']
        const messageBlock = modalRegistr.locator('//div[@class="invalid-feedback"]').nth(0)

        await lastNameInput.focus()
        await lastNameInput.evaluate(e => e.blur())
        await expect(lastNameInput).toHaveAttribute('class', 'form-control ng-pristine ng-invalid is-invalid ng-touched')
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