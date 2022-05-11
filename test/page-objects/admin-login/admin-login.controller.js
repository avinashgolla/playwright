const { AdminLoginPage } = require('./admin-login.page');
const testData = require('./admin-login.testdata.js')
const adminEmail = process.env.USER;
const adminPassword = process.env.PASS;

class AdminLoginController {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    const loginPage = new AdminLoginPage(page);
    this.page = loginPage;
  }

  async clickLoginOnHomePage() {
    try {
      await this.page.clickLoginButton();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error in clickLogin ', error);
    }
  }
  async doLoginWithAdmin() {
    try {
      await this.page.Login(adminEmail, adminPassword)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error in doLoginWithAdmin', error);
    }
  }

  async doLoginWithFleetManager() {
    try {
      await this.page.Login(testData.FleetAdminEmail, testData.FleetAdminPassword)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error in doLoginWithFleetManager ', error);
    }
  }

  async doLoginWithDriver() {
    try {
      await this.page.Login(testData.DriverEmail, testData.DriverPassword)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error in doLoginWithDriver ', error);
    }
  }

  async clickAdminBtn() {
    try {
      await this.page.clickAdminButton();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error in fillDashboardLoginDetails ', error);
    }
  }
}

module.exports.AdminLoginController = AdminLoginController;