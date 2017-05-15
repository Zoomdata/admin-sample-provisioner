"use strict";
var latest_1 = require("./latest");
var App = (function () {
    function App(baseName, count) {
        this.accounts = latest_1.createAccountsArray(baseName, count);
    }
    App.prototype.createAccounts = function (accountsArray) {
        this.accounts.forEach(function (account) {
            latest_1.createAccount('accounts', { body: { name: account.accountName } });
        });
    };
    App.prototype.addUserToAccounts = function () {
        this.accounts.forEach(function (account) {
            latest_1.getAccountIdByName(account.accountName)
                .then(function (id) {
                var config = {
                    enabled: true,
                    password: "training",
                    username: account.username,
                };
                latest_1.createAccount("accounts/" + id + "/users", { body: config });
            });
        });
    };
    App.prototype.addGroupToAccounts = function () {
        this.accounts.forEach(function (account) {
            latest_1.getAccountIdByName(account.accountName)
                .then(function (id) {
                var config = { body: {
                        name: "" + account.groupName,
                        permissions: [
                            "manage_visualization_templates",
                            "create_data_sources",
                            "share_charts",
                            "edit_calculations",
                            "save_charts",
                            "save_filters"
                        ]
                    } };
                latest_1.createAccount("accounts/" + id + "/groups", config);
            });
        });
    };
    App.prototype.addUserToGroup = function () {
        console.log('adding');
        this.accounts.forEach(function (account) {
            latest_1.getAccountIdByName(account.accountName)
                .then(function (accountId) {
                latest_1.getGroupIdByName(accountId, account.groupName)
                    .then(function (id) {
                    var config = { body: { ref: account.username } };
                    console.log('added');
                    latest_1.createAccount("groups/" + id + "/members", config);
                });
            });
        });
    };
    return App;
}());
var a = new App('fasasdsfdf', 2);
a.createAccounts();
setTimeout(function () {
    a.addUserToAccounts();
}, 1000);
setTimeout(function () {
    a.addGroupToAccounts();
}, 2000);
setTimeout(function () {
    a.addUserToGroup();
}, 3000);
//# sourceMappingURL=app.js.map