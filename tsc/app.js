"use strict";
var utils_1 = require("./utils");
var config_1 = require("./config");
var App = (function () {
    function App(baseName, count) {
        this.accounts = utils_1.createAccountsArray(baseName, count);
    }
    App.prototype.createAccounts = function (accountsArray) {
        var _this = this;
        this.accounts.forEach(function (account) {
            utils_1.createAccount('accounts', { body: { name: account.accountName } });
        });
        setTimeout(function () {
            _this.appendAccountIds();
        }, 1000);
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
                password: "training",
                username: account.username,
            };
            utils_1.createAccount("accounts/" + account.accountId + "/users", { body: config });
        });
    };
    App.prototype.addGroupToAccounts = function () {
        this.accounts.forEach(function (account) {
            var config = { body: {
                    name: "" + account.groupName,
                    permissions: config_1.groupPermissions
                } };
            utils_1.createAccount("accounts/" + account.accountId + "/groups", config);
        });
    };
    App.prototype.addUserToGroup = function () {
        console.log('adding');
        this.accounts.forEach(function (account) {
            utils_1.getGroupIdByName(account.accountId, account.groupName)
                .then(function (id) {
                var config = { body: { ref: account.username } };
                console.log('added');
                utils_1.createAccount("groups/" + id + "/members", config);
            });
        });
    };
    return App;
}());
var a = new App('AAAAAAAaaafasasf', 2);
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
//# sourceMappingURL=app.js.map