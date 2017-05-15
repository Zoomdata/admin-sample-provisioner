"use strict";
var request = require('request-promise');
var config_1 = require("./config");
exports.createAccountsArray = function (baseName, count) {
    var accountList = [];
    while (count > 0) {
        var account = {
            accountName: "" + baseName + count,
            username: "" + config_1.userConfig.username + count,
            groupName: "" + config_1.accountConfig.groupName
        };
        accountList.push(account);
        count--;
    }
    console.log('ACCOUNTLIST', accountList);
    return accountList;
};
exports.createAccount = function (url, config) {
    var options = Object.assign(config_1.currentSettings, { url: url }, config);
    request
        .post(options)
        .auth(config_1.credentials.id, config_1.credentials.pw)
        .then(function (response) {
        console.log("Account created: ", response.username || response.name);
    })
        .catch(function (err) {
        console.log('messed up', err);
    });
};
exports.getAccountIdByName = function (name) {
    return new Promise(function (resolve, reject) {
        var url = 'accounts/name/' + name;
        var options = Object.assign(config_1.currentSettings, { url: url });
        var accountIdval = request
            .get(options)
            .auth(config_1.credentials.id, config_1.credentials.pw)
            .then(function (response) {
            return response.links[0].href.split('/').pop();
        });
        if (accountIdval) {
            resolve(accountIdval);
        }
        else {
            reject(accountIdval);
        }
    });
};
exports.getGroupIdByName = function (accountId, name) {
    return new Promise(function (resolve, reject) {
        var url = "accounts/" + accountId + "/groups/name/" + name;
        var options = Object.assign(config_1.currentSettings, { url: url });
        var groupIdval = request
            .get(options)
            .auth(config_1.credentials.id, config_1.credentials.pw)
            .then(function (response) {
            return response.links[0].href.split('/').pop();
        });
        if (groupIdval) {
            resolve(groupIdval);
        }
        else {
            reject(groupIdval);
        }
    });
};
//# sourceMappingURL=utils.js.map