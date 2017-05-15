const request = require('request-promise');
import { credentials, currentSettings, accountConfig, userConfig } from './config';

export const createAccountsArray = (baseName, count) => {
    let accountList = [];
    while (count > 0) {
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
            .then(function(response) {
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
