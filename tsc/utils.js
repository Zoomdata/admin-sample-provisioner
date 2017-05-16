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
exports.getConnectionsByAccount = function (accountId) {
    return new Promise(function (resolve, reject) {
        var url = "accounts/" + accountId + "/connections/";
        var options = Object.assign(config_1.currentSettings, { url: url });
        var groupIdval = request
            .get(options)
            .auth(config_1.credentials.id, config_1.credentials.pw)
            .then(function (response) { return response.data; });
        if (groupIdval) {
            resolve(groupIdval);
        }
        else {
            reject(groupIdval);
        }
    });
};
exports.addConnectionsToAccount = function (accountId, connections) {
    connections.forEach(function (connection) {
        console.log('addConnectionsToAccount', connection);
        exports.addConnection(accountId, connection);
    });
};
exports.addConnection = function (accountId, connection) {
    var url = "accounts/" + accountId + "/connections/";
    var name = connection.name, connectorName = connection.connectorName, connectorParameters = connection.connectorParameters;
    console.log('CONNECTION CONFIG', connection);
    var options = Object.assign(config_1.currentSettings, { url: url }, { body: { name: name, connectorName: connectorName, connectorParameters: connectorParameters } });
    request
        .post(options)
        .auth(config_1.credentials.id, config_1.credentials.pw)
        .then(function (response) {
        console.log("Account created: ", response.username || response.name || response);
    })
        .catch(function (err) {
        console.log('messed up', err);
    });
};
exports.cloneAccountConnections = function (accountToClone, accountToModify) {
    console.log('cloneAccountConnections', accountToClone, accountToModify);
    exports.getConnectionsByAccount(accountToClone)
        .then(function (connections) {
        exports.addConnectionsToAccount(accountToModify, connections);
    });
};
//# sourceMappingURL=utils.js.map