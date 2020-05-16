#!/usr/bin/env node
import puppeteer from 'puppeteer'
import consola from "consola"
import fs from "fs-extra"
import * as config from "./config.json"

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();  
  consola.ready('Ready to start')
  try{
    await login(page)  
    await initDistFolder()
    await runSaveScreenShots(page)
    await browser.close();  
  }catch(e){
    consola.error(e)
  }
}

main();

async function login(page: puppeteer.Page){
  const url = config.login.url
  await page.goto(url, { waitUntil: 'networkidle0' })
  await page.type(config.login.target_form.email_filed_selector, config.login.account.email)
  await page.type(config.login.target_form.password_field_selector, config.login.account.password)
  page.click(config.login.target_form.login_button_selector);
  await page.waitForNavigation({timeout: 80000, waitUntil: "domcontentloaded"});
  // await page.screenshot({ path: 'home1.png' , fullPage:true})
  if (page.url() == config.login.success_after_login_url){
    consola.success('success to login')
  }else{
    throw Error(`Failed to login: we expect to move to ${config.login.success_after_login_url}, but move to ${page.url()} ;`)
  }
}

async function initDistFolder(){
  fs.removeSync('./dist')
  // fs.mkdirSync('./dist')
}

async function runSaveScreenShots(page: puppeteer.Page){
  consola.info('start to fetch screenshots')
  for(const index in config.site.urls){
    const url = config.site.urls[index]
    const path = url.split('/').slice(3).join('/')
    consola.log(`■ Target
URL: ${url}
PATH: ${path}
`)
    fs.mkdirSync(`./dist/${path}`, { recursive: true })
    await saveScreenShot(url, path, page)
  }
}

async function saveScreenShot(url: string, path: string, page: puppeteer.Page){
  await page.goto(url, { waitUntil: 'networkidle0' })
  await page.screenshot({ path: `./dist/${path}/image.png` , fullPage:true}) 
}