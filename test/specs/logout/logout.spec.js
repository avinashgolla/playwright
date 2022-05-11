const tb = require("../../../base/test-base");
const sleep = require("await-sleep");

tb.test.describe('Dashboard Login Scenario', async () => {

    tb.test('Login using Admin credentials', async ({ useBrowserWithState, adminLoginController, logoutController }) => {
        await tb.openPage();
        console.log("Wait for page to load");
        await tb.adminLoginController.clickLoginOnHomePage();
        await sleep(5000)
        await tb.adminLoginController.doLoginWithAdmin();
        await sleep(5000)
        await tb.logoutController.doLogout();
    });
});

