const request = require('request-promise');
import { credentials, currentSettings, accountConfig, userConfig } from './config';

export const createAccountsArray = (baseName, count) => {
    let accountList = [];
    while (count > 1) {
        let account = {
            accountName: `${baseName}${count}`,
            username: `${userConfig.username}${count}`,
            groupName: `${accountConfig.groupName}`
        };
        accountList.push(account);
        count--;
    }
    console.log('ACCOUNTLIST', accountList);
    return accountList;
};

export const createAccount = (url, config) => {
    const options = Object.assign(currentSettings, {url}, config);
    request
        .post(options)
        .auth(credentials.id, credentials.pw)
        .then((response) => {
            console.log("Account created: ", response.username || response.name);
        })
        .catch((err) => {
            console.log('messed up', err);
        })
};

export const getAccountIdByName = (name) => {
    return new Promise((resolve,reject) => {
        const url = 'accounts/name/' + name;
        const options = Object.assign(currentSettings, {url});
        let accountIdval = request
            .get(options)
            .auth(credentials.id, credentials.pw)
            .then((response) => {
                return response.links[0].href.split('/').pop();
            });
        if (accountIdval) {
            resolve(accountIdval);
        }
        else {
            reject(accountIdval);
        }
    })
};

export const getGroupIdByName = (accountId, name) => {
    return new Promise((resolve,reject) => {
        const url = `accounts/${accountId}/groups/name/${name}`;
        const options = Object.assign(currentSettings, {url});
        let groupIdval = request
            .get(options)
            .auth(credentials.id, credentials.pw)
            .then((response) => {
                return response.links[0].href.split('/').pop();
            });
        if (groupIdval) {
            resolve(groupIdval);
        }
        else {
            reject(groupIdval);
        }
    })
};

export const getConnectionsByAccount = (accountId) => {
    return new Promise((resolve,reject) => {
        const url = `accounts/${accountId}/connections/`;
        const options = Object.assign(currentSettings, {url});
        let groupIdval = request
            .get(options)
            .auth(credentials.id, credentials.pw)
            .then(response => response.data);

        if (groupIdval) {
            resolve(groupIdval);
        }
        else {
            reject(groupIdval);
        }
    })
}

export const addConnectionsToAccount = (accountId, connections) => {
    connections.forEach(connection => {

        console.log('addConnectionsToAccount', connection);
        addConnection(accountId, connection);
    });
}

export const addConnection = (accountId, connection) => {
    const url = `accounts/${accountId}/connections/`;
    const {name, connectorName, connectorParameters} = connection;
    const options = Object.assign(currentSettings, {url}, {body:{name, connectorName, connectorParameters}});
    request
        .post(options)
        .auth(credentials.id, credentials.pw)
        .then((response) => {
            console.log("Account created: ", response.username || response.name || response);
        })
        .catch((err) => {
            console.log('messed up', err);
        })
}

export const cloneAccountConnections = (accountToClone, accountToModify) => {
    getConnectionsByAccount(accountToClone)
        .then(connections => {
            addConnectionsToAccount(accountToModify, connections);
        });
}
