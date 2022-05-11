const { LogoutPage } = require('./logout.page');
class LogoutController {
    constructor(page) {
        const logoutPage = new LogoutPage(page);
        this.page = logoutPage;
    }
    async doLogout() {
        try {
            await this.page.clickUserNameButton();
            await this.page.clickLogoutButton();
        } catch (error) {
            console.log("Error during logging out of dashboard", error)
        }
    }

}
module.exports.LogoutController = LogoutController;