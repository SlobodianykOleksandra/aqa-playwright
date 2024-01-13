import {test} from "../../src/fixtures/myFixture.js";
import {expect, request} from "@playwright/test";
import {CARS} from "../../src/data/cars.js";
import {STORAGE_STATE_USER_PATH} from "../../src/data/constants/storageState.js";

test.describe('Examples', ()=>{
    test.afterAll(async ()=>{
        const client = await request.newContext({
            storageState: STORAGE_STATE_USER_PATH
        })
        const userCars = await client.get('api/cars')
        const body = await userCars.json()

        // for (const car of body.data) {
        //     await client.delete(`api/cars/${car.id}`)
        // }//delete successively

        await Promise.all(
            body.data.map((car) => client.delete(`api/cars/${car.id}`))//returns array
        )//delete in parallel
    })

    test('go to profile and listen', async ({userGaragePageWithStorage})=>{

        const {page} = userGaragePageWithStorage
        await page.route('/api/users/profile', route=>{
            route.abort()
        })

        const profilePage = await userGaragePageWithStorage.clickProfileAndRedirect()

        await expect(profilePage.userName).toBeVisible()
    })
    test('modify response', async ({userGaragePageWithStorage})=>{

        const {page} = userGaragePageWithStorage
        await page.route('/api/users/*', async (route)=>{
            if(route.request().url().includes('profile')){
                const response = await route.fetch()
                console.log(await response.json())
                await route.continue()
                return
            }
            await route.continue()
        })

        const profilePage = await userGaragePageWithStorage.clickProfileAndRedirect()

        await expect(profilePage.userName).toBeVisible()
    })

    test('API return current users car info', async ({userGaragePageWithStorage})=>{
        const popup = await userGaragePageWithStorage.openAddCarPopup()
        await popup.fillFormAndSubmit(CARS.PORSCHE_911.brand,CARS.PORSCHE_911.model,CARS.PORSCHE_911.mileage)

        const {page} = userGaragePageWithStorage

        const userCars = await page.request.get('api/cars')
        const body = await userCars.json()
        await expect(body.status).toBe("ok")
    })

    test('API return current users car info (fixture usage)', async ({apiClient})=>{
        const brandsResponse = await apiClient.get('api/cars')
        const body = await brandsResponse.json()
        await expect(body.status).toBe("ok")
    })

    test('Request from context manual', async ({userGaragePageWithStorage})=>{
        const popup = await userGaragePageWithStorage.openAddCarPopup()
        await popup.fillFormAndSubmit(CARS.PORSCHE_911.brand,CARS.PORSCHE_911.model,CARS.PORSCHE_911.mileage)

        const client = await request.newContext()

        const brandsResponse = await client.get('api/cars')
        const body = await brandsResponse.json()
        await expect(body.status).toBe("ok")
    })
})