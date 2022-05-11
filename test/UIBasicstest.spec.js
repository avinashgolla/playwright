const {test,expect} = require('@playwright/test');

test.only('browser context playwright test',async ({browser})=>{

   const context = await browser.newContext()
   const page = await context.newPage();
   const userName = page.locator('#username');
   const signIn = page.locator('#signInBtn');
   const cardTitles = page.locator(".card-body a");
   await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");
   await userName.type("rahulshetty");
   await page.locator('#password').type("learning");
   await page.locator('#signInBtn').click();
   console.log(await page.locator("[style*='block']").textContent());
   await expect(page.locator("[style*='block']")).toContainText('Incorrect');
   await userName.fill("");
   await userName.fill("rahulshettyacademy");
   await signIn.click();
   console.log(await cardTitles.first().textContent());
   const alltitles = await cardTitles.allTextContents();
   console.log(alltitles);
   //if i comment line 19 than it does not return the array as it does not auto-wait here 
});

test('page playwright test',async ({page})=>{
    await page.goto("https://www.google.com/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
 });