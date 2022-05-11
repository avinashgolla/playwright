const locator = require('./admin-login.locators.json')
const { expect } = require('@playwright/test')
const sleep = require("await-sleep");

class AdminLoginPage {
    constructor(page) {
        this.page = page;
    }

    async clickLoginButton() {
        try {
            const isVisibleLoginButton = await this.page.locator(locator.loginButton.css).isVisible();
            if (isVisibleLoginButton == true) {
                await this.page.waitForSelector(locator.loginButton.css);
                const loginButton = await this.page.$(locator.loginButton.css);
                return loginButton.click();
            }
            else {
                console.log("Button not found or user has landed on dashboard")
            }

        } catch (error) {
            console.log('Error during clickLoginButton ', error)
        }
    }

    async Login(email, password) {
        try {
            await this.page.waitForSelector(locator.email.css, { waitFor: 'visible' });
            const Email = await this.page.locator(locator.email.css).isVisible();
            const Password = await this.page.locator(locator.password.css).isVisible();
            const LoginBtn = await this.page.locator(locator.loginBtn.id);
            if (Email == true && Password == true) {
                const Email = await this.page.locator(locator.email.css);
                await sleep(2000);
                const Password = await this.page.locator(locator.password.css);
                await sleep(2000);
                await Email.type(email);
                await sleep(2000);
                await Password.type(password);
                await sleep(2000);
                await LoginBtn.click();
                console.log("waiting for user to land on dashbaord")
            }
            else {
                console.log("user has already logged In")
            }
        } catch (error) {
            console.log('Error during Login ', error)
        }
    }

    // async fillEmail(email) {
    //     try {
    //         await this.page.waitForSelector(locator.email.id);
    //         const Email = await this.page.$(locator.email.id);
    //         return Email.type(email);
    //     } catch (error) {
    //         console.log('ERROR DURING fillEmail ', error)
    //     }

    // }

    // async fillPassword(password) {
    //     try {
    //         await this.page.waitForSelector(locator.password.id);
    //         const Password = await this.page.$(locator.password.id);
    //         return Password.type(password);
    //     } catch (error) {
    //         console.log('ERROR DURING fillPassword ', error)
    //     }

    // }

    // async clickLogin() {
    //     try {
    //         await this.page.waitForSelector(locator.loginBtn.id);
    //         const LoginBtn = await this.page.$(locator.loginBtn.id);
    //         return LoginBtn.click();
    //     } catch (error) {
    //         console.log('ERROR DURING clickLogin ', error)
    //     }
    // }

    async clickAdminButton() {
        try {
            console.log('User has successfully landed on the Dashboard page');
            await this.page.waitForSelector(locator.adminBtn.css);
            const AdminBtn = await this.page.$(locator.adminBtn.css);
            return AdminBtn.click();
        } catch (error) {
            console.log('ERROR DURING clickAdminButton ', error)
        }
    }
}
module.exports.AdminLoginPage = AdminLoginPage