import {test, expect} from "@playwright/test";

const nameData = {
    positiveName: 'Tony',
    spaceName: ' ',
    lilName: 'U',
    bigName: 'JaneJohnRachelSantiago',
    twoLettersName: 'Ya',
    twentyLettersName: 'JanPierGallanPoulTry',
    withSpaceName: 'Nazaki Kun',
    languageName: 'Саторо',
    withSymbName: 'S@lvator',
    withNumberName: 'Salvat0r'
}

test.describe('Suite2. Name field validation',()=> {

    test.beforeEach(async ({page}) => {
        await page.goto('/')
        const registrBtn = page.locator('//button[@class="hero-descriptor_btn btn btn-primary"]')
        await registrBtn.click()
    })

    test('TC2.1. Positive fill', async ({ page }) => {
        const modalRegistr = page.locator('//app-signup-modal')
        const nameInput = modalRegistr.locator('//input[@id="signupName"]')
        const messageBlock = modalRegistr.locator('//div[@class="invalid-feedback"]').nth(0)

        await nameInput.fill(nameData.positiveName)
        await nameInput.evaluate(e => e.blur())
        await expect(await nameInput.inputValue()).toEqual(nameData.positiveName)
        await expect(messageBlock).toBeHidden()
    })

    test('TC2.2. Fill by label',async ({page})=>{
        const modalRegistr = page.locator('//app-signup-modal')
        const nameLabel = modalRegistr.locator("//label[text()='Name']")
        const nameInput = modalRegistr.locator('//input[@id="signupName"]')

        await nameLabel.fill(nameData.positiveName)
        const result = await nameInput.inputValue()
        await expect.soft(result).toEqual(nameData.positiveName)
    })

    test('TC2.3. Fill with space',async ({page})=>{
        const modalRegistr = page.locator('//app-signup-modal')
        const nameInput = modalRegistr.locator('//input[@id="signupName"]')

        const expectedMessages = ['Name is invalid','Name has to be from 2 to 20 characters long']
        const messageBlock = modalRegistr.locator('//div[@class="invalid-feedback"]').nth(0)

        await nameInput.fill(nameData.spaceName)
        await nameInput.evaluate(e => e.blur())
        await expect(nameInput).toHaveAttribute('class', 'form-control ng-invalid ng-dirty is-invalid ng-touched')
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

    test('TC2.4. Fill with out of range value',async ({page})=>{
        const modalRegistr = page.locator('//app-signup-modal')
        const nameInput = modalRegistr.locator('//input[@id="signupName"]')

        const expectedMessages = ['Name has to be from 2 to 20 characters long']
        const messageBlock = modalRegistr.locator('//div[@class="invalid-feedback"]').nth(0)

        await nameInput.fill(nameData.bigName)
        await nameInput.evaluate(e => e.blur())
        await expect(nameInput).toHaveAttribute('class', 'form-control ng-invalid ng-dirty is-invalid ng-touched')
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

    test('TC2.5. Fill with incorrect value',async ({page})=>{
        const modalRegistr = page.locator('//app-signup-modal')
        const nameInput = modalRegistr.locator('//input[@id="signupName"]')

        const expectedMessages = ['Name is invalid']
        const messageBlock = modalRegistr.locator('//div[@class="invalid-feedback"]').nth(0)

        await nameInput.fill(nameData.withSymbName)
        await nameInput.evaluate(e => e.blur())
        await expect(nameInput).toHaveAttribute('class', 'form-control ng-invalid ng-dirty is-invalid ng-touched')
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

    test('TC2.6. Empty',async ({page})=>{
        const modalRegistr = page.locator('//app-signup-modal')
        const nameInput = modalRegistr.locator('//input[@id="signupName"]')

        const expectedMessages = ['Name required']
        const messageBlock = modalRegistr.locator('//div[@class="invalid-feedback"]').nth(0)

        await nameInput.focus()
        await nameInput.evaluate(e => e.blur())
        await expect(nameInput).toHaveAttribute('class', 'form-control ng-pristine ng-invalid is-invalid ng-touched')
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