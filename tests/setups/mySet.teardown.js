import {test as setup, expect} from "@playwright/test";
import fs from 'fs'
import path from 'path'
import {fileURLToPath} from "url";

//clear userState file
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

setup('Do some post job', async ()=>{
    fs.readdirSync(path.resolve(__dirname, '../../state')).forEach((file)=>{
        if(file !== '.gitignore'){
            fs.unlinkSync(path.join(path.resolve(__dirname, '../../state'), file))
        }
    })
})