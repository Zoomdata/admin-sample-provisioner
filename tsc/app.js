"use strict";
var utils_1 = require("./utils");
var config_1 = require("./config");
var baseName = config_1.accountConfig.baseName, count = config_1.accountConfig.count;
var App = (function () {
    function App(baseName, count) {
        var _this = this;
        this.accounts = utils_1.createAccountsArray(baseName, count);
        setTimeout(function () {
            _this.appendAccountIds();
        }, 1000);
    }
    App.prototype.createAccounts = function (accountsArray) {
        this.accounts.forEach(function (account) {
            utils_1.createAccount('accounts', { body: { name: account.accountName } });
        });
    };
    App.prototype.appendAccountIds = function () {
        this.accounts.forEach(function (account) {
            utils_1.getAccountIdByName(account.accountName)
                .then(function (id) { return account.accountId = id; });
        });
    };
    App.prototype.addUserToAccounts = function () {
        this.accounts.forEach(function (account) {
            var config = {
                enabled: true,
                password: "" + config_1.userConfig.password,
                username: account.username,
            };
            utils_1.createAccount("accounts/" + account.accountId + "/users", { body: config });
        });
    };
    App.prototype.addGroupToAccounts = function () {
        this.accounts.forEach(function (account) {
            if (config_1.accountConfig.addGroup) {
                var config = { body: {
                        name: "" + account.groupName,
                        permissions: config_1.groupPermissions
                    } };
                utils_1.createAccount("accounts/" + account.accountId + "/groups", config);
            }
        });
    };
    App.prototype.addUserToGroup = function () {
        this.accounts.forEach(function (account) {
            utils_1.getGroupIdByName(account.accountId, account.groupName)
                .then(function (id) {
                var config = { body: { ref: account.username } };
                utils_1.createAccount("groups/" + id + "/members", config);
            });
        });
    };
    App.prototype.cloneAccounts = function (accountName) {
        var _this = this;
        utils_1.getAccountIdByName(accountName)
            .then(function (id) {
            _this.accounts.forEach(function (account) {
                utils_1.cloneAccountConnections(id, account.accountId);
                console.log('ACCCCCOCUNT', account);
            });
        });
    };
    return App;
}());
var a = new App(baseName, count);
a.createAccounts();
setTimeout(function () {
    a.addUserToAccounts();
}, 2000);
setTimeout(function () {
    a.addGroupToAccounts();
}, 3000);
setTimeout(function () {
    a.addUserToGroup();
}, 4000);
setTimeout(function () {
    a.cloneAccounts('Training1');
}, 5000);
//# sourceMappingURL=app.js.map