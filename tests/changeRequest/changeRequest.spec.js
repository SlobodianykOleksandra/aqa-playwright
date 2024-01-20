import {test} from "../../src/fixtures/myFixture.js";
import {expect, request} from "@playwright/test";
import {USER_BODY} from "../../src/data/users.js";
import {
    NEW_CAR_AUDI,
    NEW_CAR_INVALID_BRAND,
    NEW_CAR_INVALID_MILEAGE,
    NEW_CAR_INVALID_MODEL, NEW_CAR_MISSING_MODEL
} from "../../src/data/cars.js";
import {STORAGE_STATE_USER_PATH} from "../../src/data/constants/storageState.js";
import {CREATE_CAR_MSG} from "../../src/data/errorMsg.js";

test.describe('Change Request', ()=>{
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

    test('go to profile and replace data', async ({userGaragePageWithStorage})=> {
        const {page} = userGaragePageWithStorage
        await page.route('/api/users/profile', async (route) => {
            await route.fulfill({
                body: JSON.stringify(USER_BODY),
            })
        })

        const profilePage = await userGaragePageWithStorage.clickProfileAndRedirect()

        await expect(profilePage.userName).toBeVisible()
        await expect(profilePage.userName).toHaveText(`${USER_BODY.data.name} ${USER_BODY.data.lastName}`)
    })

    test('API create car positive', async ({apiClient}) =>{
        const newCar = await apiClient.post('api/cars',{
            data: NEW_CAR_AUDI
        })
        const carBody = await newCar.json()
        await expect(carBody.status, 'status should be valid').toBe("ok")

        const carsResponse = await apiClient.get('api/cars')
        const getCarBody = await carsResponse.json()
        await expect(getCarBody.status, 'status should be valid').toBe("ok")
        await expect(getCarBody.data[0].carBrandId, 'car brand id should be equal').toEqual(NEW_CAR_AUDI.carBrandId)
        await expect(getCarBody.data[0].carModelId, 'car model id should be equal').toEqual(NEW_CAR_AUDI.carModelId)
        await expect(getCarBody.data[0].mileage, 'car mileage should be equal').toEqual(NEW_CAR_AUDI.mileage)
    })
    test('API create car invalid brand', async ({apiClient}) =>{
        const newCar = await apiClient.post('api/cars',{
            data: NEW_CAR_INVALID_BRAND
        })
        const carBody = await newCar.json()
        await expect(carBody.status, 'status should be valid').toBe("error")
        await expect(carBody.message, 'status should be equal').toEqual(CREATE_CAR_MSG.invalidBrand)
    })
    test('API create car invalid model', async ({apiClient}) =>{
        const newCar = await apiClient.post('api/cars',{
            data: NEW_CAR_INVALID_MODEL
        })
        const carBody = await newCar.json()
        await expect(carBody.status, 'status should be valid').toBe("error")
        await expect(carBody.message, 'status should be equal').toEqual(CREATE_CAR_MSG.invalidModel)
    })
    test('API create car invalid mileage', async ({apiClient}) =>{
        const newCar = await apiClient.post('api/cars',{
            data: NEW_CAR_INVALID_MILEAGE
        })
        const carBody = await newCar.json()
        await expect(carBody.status, 'status should be valid').toBe("error")
        await expect(carBody.message, 'status should be equal').toEqual(CREATE_CAR_MSG.invalidMileage)
    })
    test('API create car missing parameters', async ({apiClient}) =>{
        const newCar = await apiClient.post('api/cars',{
            data: NEW_CAR_MISSING_MODEL
        })
        const carBody = await newCar.json()
        await expect(carBody.status, 'status should be valid').toBe("error")
        await expect(carBody.message, 'status should be equal').toEqual(CREATE_CAR_MSG.missingModel)
    })
})