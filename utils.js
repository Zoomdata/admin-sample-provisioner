const request = require('request-promise');
import { credentials, currentSettings } from './config';
// const credentials = {
//     id: "supervisor",
//     pw: "omaromar",
//     // pw: "train!ing23",
// };
//
// const currentSettings = {
//     "async": true,
//     "crossDomain": true,
//     // You must replace the following baseUrl with your own Zoomdata instance
//     // "baseUrl": "https://training23.zoomdata.com:8443/zoomdata/api/",
//     "baseUrl": "http://localhost:8080/zoomdata/api/",
//     "headers": {
//         'accept': "application/vnd.zoomdata.v2+json,application/vnd.zoomdata+json",
//         'x-zoomdata-media-type': 'application/vnd.zoomdata.v1+json',
//         'content-type': 'application/vnd.zoomdata+json',
//         "cache-control": "no-cache"
//     },
//     json: true
// };


export const createAccountsArray = (baseName, count) => {
    var accountList = [];
    while(count > 0) {
        let name = baseName + count;
        let account = {
            accountName: name,
            username: `${name}-trainer`,
            groupName: 'subgroup' + count
        };
        accountList.push(account);
        count--;
    }
    console.log('ACCOUNTLIST', accountList);
    return accountList;
}

export const createAccount = (url, config) => {
    var options = Object.assign(currentSettings, {url}, config);
    request
        .post(options)
        .auth(credentials.id, credentials.pw)
        .then(function(response) {
            console.log("Account created: ", response.name);
        })
        .catch(function(err) {
            console.log('messed up', err);
        })
}


export const getAccountIdByName = (name) => {
    return new Promise(function(resolve,reject) {
        var url = 'accounts/name/' + name;
        var options = Object.assign(currentSettings, {url});
        var accountIdval = request
            .get(options)
            .auth(credentials.id, credentials.pw)
            .then(function(response) {
                return response.links[0].href.split('/').pop();
            });
        if (accountIdval) {
            resolve(accountIdval);
        }
        else {
            reject(accountIdval);
        }
    })
}

export const getGroupIdByName = (accountId, name) => {
    return new Promise(function(resolve,reject) {
        var url = `accounts/${accountId}/groups/name/${name}`;
        var options = Object.assign(currentSettings, {url});
        var groupIdval = request
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
}

//// SCRIPTS

// // make list of accounts to be make
// const totalAccounts = createAccountsArray('aaattraining', 2);
//
// // create each account in array
// totalAccounts.forEach(account => {
//     createAccount('accounts', {body: {name: account.accountName}});
// });
//
// // get account id and add user to that account
// setTimeout(() => {
//     //***
//     totalAccounts.forEach((account, i) => {
//         getAccountIdByName(account.accountName)
//             .then(id => {
//                 const config =  {
//                     // administrator:true,
//                     // email:"string",
//                     enabled:true,
//                     password:`training`,
//                     username: account.username,
//                 };
//                 console.log(config, id);
//                 createAccount(`accounts/${id}/users`, {body: config});
//             });
//     });
// }, 2000);
// //
// // // creates groups in account:
//
// setTimeout(() => {
//     totalAccounts.forEach((account, i) => {
//         getAccountIdByName(account.accountName)
//             .then(function(id) {
//                 const config = {body:{
//                     name: `${account.groupName}`,
//                     permissions: [
//                         "manage_visualization_templates",
//                         "create_data_sources",
//                         "share_charts",
//                         "edit_calculations",
//                         "save_charts",
//                         "save_filters"
//                     ]
//                 }};
//                 // const config = {body:{ref: account.accountName}};
//                                                                             // FUCKING WORKS DONT DELETE!!!!!!!!!!!!!!!!!!!!!!!!
//                 console.log(account.accountName);
//                 // createAccount(`accounts/${id}/users`, config);
//                 createAccount(`accounts/${id}/groups`, config); // creates groups, WORKS!!!!
//                 // createAccount(`groups/${id}/members`, config); // adds user to gr
//                 // createAccount(`accounts/${id}/groups/name/${user.username}`, user.username);
//             });
//     });
// }, 4000);
//
//
// // FUCKING WORKS !!! ADDS USERS TO GROUP AND MAKES USER GROUPS ONLY ~!!!!!
// setTimeout(() => {
//     totalAccounts.forEach((account, i) => {
//         getAccountIdByName(account.accountName)
//             .then((accountId) => {
//                 getGroupIdByName(accountId, account.groupName)
//                     .then(function(id) {
//                         // const config = {body:{name: `${account.accountName}-group`}};
//                         const config = {body:{ref: account.username}};
//
//                         console.log(account.accountName);
//                         // createAccount(`accounts/${id}/users`, config);
//                         // createAccount(`accounts/${id}/groups`, config); // creates groups, WORKS!!!!
//                         createAccount(`groups/${id}/members`, config); // adds user to gr
//                         // createAccount(`accounts/${id}/groups/name/${user.username}`, user.username);
//                     });
//             })
//     });
// }, 5000);

// NOT WORKING
// function setGroupPermissions(account) {
//     // /api/groups/{groupId}/sources
//     getAccountIdByName(account.accountName)
//         .then((accountId) => {
//             getGroupIdByName(accountId, account.groupName)
//                 .then(function(id) {
//                     // const config = {body:{name: `${account.accountName}-group`}};
//                     const config = {body:{
//                        canEdit: true
//                     }};
//
//                     console.log(id);
//                     // createAccount(`accounts/${id}/users`, config);
//                     createAccount(`groups/${id}/sources`, config); // adds user to gr
//                     // createAccount(`accounts/${id}/groups/name/${user.username}`, user.username);
//                 });
//         })
// }


