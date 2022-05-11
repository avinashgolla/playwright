require("dotenv").config();
const fs = require('fs')
const chai = require('chai');
const path = require('path');
const retry = require("async-retry");
const sleep = require("await-sleep");

// Playwright
const playwright = require("playwright");
const devices = playwright.devices;
const base = require("@playwright/test");
const { expect } = require("@playwright/test");

// environment data
const baseURL = process.env.URL;

// const { MaintenanceController } = require("../test/page-objects/maintenance/maintenance.controller");
const { AdminLoginController } = require("../test/page-objects/admin-login/admin-login.controller");
// const { AdminVehicleController } = require("../test/page-objects/admin-vehicles/admin-vehicles.controller");
// const { AdminGroupController } = require("../test/page-objects/admin-groups/admin-groups.controller");
// const { AdminGeofenceController } = require("../test/page-objects/admin-geofence/admin-geofence.controller");
// const { AdminFleetUsersController } = require("../test/page-objects/admin-fleet-users/admin-fleet-users.controller");
// const { AdminAddDriverController } = require("../test/page-objects/admin-driver/admin-add-driver.controller");
// const { AdminDriverController } = require("../test/page-objects/admin-driver/admin-driver.controller");
// const { AdminCompanyController } = require("../test/page-objects/admin-company/admin-company.controller");
// const { AdminAssetsController } = require("../test/page-objects/admin-assets/admin-assets.controller");
// const { AdminAlertsController } = require("../test/page-objects/admin-alerts/admin-alerts.controller");
// const { FuelController } = require("../test/page-objects/fuel/fuel.controller");
// const { ComplianceController } = require("../test/page-objects/compliance/compliance.controller");
const { LogoutController } = require('../test/page-objects/logout/logout.controller');
// const { SignUpController } = require('../test/page-objects/signup/signup.controller');

class TestBase {
  constructor() {
    this.consoleErrors = [];
    this.pageErrors = [];
    this.requestsFailed = [];
    this.devices = devices;
    this.webMock = false;
    this.guid = this.guidGenerator();
  };

  test = base.test.extend({
    testSetUp: [
      async ({ }, use, testInfo) => {
        this.testTile = testInfo.title;
        this.testGuid = this.guidGenerator();
        console.log(`RUNNING TEST WITH NAME: ${this.testTile}`);
        await use();
      },
      { auto: true },
    ],

    useBrowser: async ({ browser }, use, testInfo) => {
      console.log("Running test: ", testInfo.title);
      await this.launch_browser(browser);
      this.context = await this.browser.newContext({ viewport: { width: 1880, height: 1080 } });
      this.page = await this.context.newPage();
      await use();
      const escapedTestTitle = this.testTile.replace(/[^a-zA-Z ]/g, "");
      if (testInfo.status == "failed") {
        await this.page.screenshot({ path: `test-screenshots/${escapedTestTitle}.png` });
        await this.page.video().saveAs(`test-videos/${escapedTestTitle}.mp4`);
      }
      // await this.closeBrowser();
      console.log("Delete WebMock in case requests hang");
      await sleep(1000);
      delete this.webMock;
      console.log("----> CLOSE CONTEXT <----");
      await this.context.close();
    },

    useBrowserNoTearDown: async ({ browser }, use, testInfo) => {
      console.log("Running test: ", testInfo.title);
      await this.launch_browser(browser);
      this.context = await this.browser.newContext({
        viewport: { width: 1880, height: 900 },
        locale: 'en-GB',
        storageState: "state.json"

      });
      this.page = await this.context.newPage();
      await use();
    },

    useBrowserWithState: async ({ browser }, use, testInfo) => {
      console.log("Running test: ", testInfo.title);
      await this.launch_browser(browser);
      this.context = await this.browser.newContext({
        viewport: { width: 1880, height: 900 },
        locale: 'en-GB',
        storageState: "stagingState.json"
      });
      this.page = await this.context.newPage();
      await use();
      //await this.page.context().storageState({ path: 'stagingState.json' });
    },

    useBrowserWithoutState: async ({ browser }, use, testInfo) => {
      console.log("Running test: ", testInfo.title);
      await this.launch_browser(browser);
      this.context = await this.browser.newContext({
        viewport: { width: 1880, height: 900 },
        locale: 'en-GB'
      });
      this.page = await this.context.newPage();
      await use();
    },

    closeContext: async ({ browser }, use, testInfo) => {
      await use();
      console.log("tear down");

      const escapedTestTitle = this.testTile.replace(/[^a-zA-Z ]/g, "");
      if (testInfo.status == "failed") {
        await this.page.screenshot({ path: `test-screenshots/${escapedTestTitle}.png` });
        await this.page.video().saveAs(`test-videos/${escapedTestTitle}.mp4`);
      }
      console.log("Delete WebMock in case requests hang");
      await sleep(1000);
      delete this.webMock;
      console.log("----> CLOSE CONTEXT <----");
      await this.context.close();
    },

    tearDown: async ({ }, use) => {
      await use();
      console.log("tear down");
    },

    adminLoginController: async ({ }, use) => {
      this.adminLoginController = new AdminLoginController(this.page);
      await use();
    },

    adminVehicleController: async ({ }, use) => {
      this.adminVehicleController = new AdminVehicleController(this.page);
      await use();
    },

    adminGroupController: async ({ }, use) => {
      this.adminGroupController = new AdminGroupController(this.page);
      await use();
    },

    adminGeofenceController: async ({ }, use) => {
      this.adminGeofenceController = new AdminGeofenceController(this.page);
      await use();
    },

    adminFleetUsersController: async ({ }, use) => {
      this.adminFleetUsersController = new AdminFleetUsersController(this.page);
      await use();
    },

    adminAddDriverController: async ({ }, use) => {
      this.adminAddDriverController = new AdminAddDriverController(this.page);
      await use();
    },

    adminCompanyController: async ({ }, use) => {
      this.adminCompanyController = new AdminCompanyController(this.page);
      await use();
    },

    adminAssetsController: async ({ }, use) => {
      this.adminAssetsController = new AdminAssetsController(this.page);
      await use();
    },

    adminDriverController: async ({ }, use) => {
      this.adminDriverController = new AdminDriverController(this.page);
      await use();
    },

    adminAlertsController: async ({ }, use) => {
      this.adminAlertsController = new AdminAlertsController(this.page);
      await use();
    },

    maintenanceController: async ({ }, use) => {
      this.maintenanceController = new MaintenanceController(this.page);
      await use();
    },

    fuelController: async ({ }, use) => {
      this.fuelController = new FuelController(this.page);
      await use();
    },

    complianceController: async ({ }, use) => {
      this.complianceController = new ComplianceController(this.page);
      await use();
    },

    logoutController: async ({ }, use) => {
      this.logoutController = new LogoutController(this.page);
      await use();
    },

    signUpController: async ({ }, use) => {
      this.signUpController = new SignUpController(this.page);
      await use();
    }

  });

  async launch_browser(browser) {
    console.log("Opening browser");
    this.browser = browser;
  }

  async openPage() {
    this.page.setDefaultTimeout(20000);
    console.log("Opening page: ", baseURL);
    return this.page.goto(baseURL);
  }

  async goToPage(url) {
    console.log(`Go to page: ${url}`)
    return this.page.goto(url);
  }

  async closeBrowser() {
    console.log("Closing browser");
    return this.browser.close();
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  guidGenerator() {
    // let newDate = new Date().toISOString().replace(/T.*/,'').split('-').reverse().join('-');
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    let result = S4();
    return result
  }

  async assertCurrentUrl(expectedUrl) {
    console.log("Assert we are in the right url, with string: ", expectedUrl);
    let currentUrl = await this.page.url();
    chai.expect(currentUrl).to.include(expectedUrl);
  }
}

module.exports = new TestBase();
