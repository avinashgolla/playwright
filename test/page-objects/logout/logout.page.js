const locators = require('../logout/logout.locators.json')
class LogoutPage{

    constructor(page){
        this.page = page;
    }

    async clickUserNameButton(){
        try {
            await this.page.waitForSelector(locators.userButton.css);
            let usernameButton = this.page.locator(locators.userButton.css);
            await usernameButton.click()
        } catch (error) {
            console.log("Error during clicking username button", error)
        }
    }

    async clickLogoutButton(){
        try {
            await this.page.waitForSelector(locators.logoutButton.css);
            let logoutButton = this.page.locator(locators.logoutButton.css);
            await logoutButton.click()
        } catch (error) {
            console.log("Error during clicking logout button", error)
        }
    }
}

module.exports.LogoutPage = LogoutPage;