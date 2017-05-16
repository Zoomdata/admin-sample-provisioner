import {
    cloneAccountConnections,
    createAccount,
    createAccountsArray,
    getAccountIdByName,
    getGroupIdByName,
    getConnectionsByAccount,
    addConnectionsToAccount,
    addConnection
} from "./utils";
import {accountConfig, groupPermissions, userConfig} from "./config";

const { baseName, count } = accountConfig;

class App {
    constructor(baseName, count) {
        this.accounts = createAccountsArray(baseName, count);
        setTimeout(() => {
            this.appendAccountIds();
        }, 1000)
    }

    createAccounts(accountsArray) {
        this.accounts.forEach(account => {
            createAccount('accounts', {body: {name: account.accountName}});
        });
    }

    appendAccountIds() {
        this.accounts.forEach(account => {
            getAccountIdByName(account.accountName)
                .then(id => account.accountId = id);
        });
    }

    addUserToAccounts() {
        this.accounts.forEach((account) => {
            const config =  {
                // administrator: userConfig.makeAdmin ? true : false,
                enabled:true,
                password:`${userConfig.password}`,
                username: account.username,
            };
            createAccount(`accounts/${account.accountId}/users`, {body: config});
        });
    }

    addGroupToAccounts() {
        this.accounts.forEach((account) => {
            if (accountConfig.addGroup) {
                const config = {body:{
                    name: `${account.groupName}`,
                    permissions: groupPermissions
                }};
                createAccount(`accounts/${account.accountId}/groups`, config);
            }
        });
    }

    addUserToGroup() {
        this.accounts.forEach(account => {
            getGroupIdByName(account.accountId, account.groupName)
                .then(id => {
                    const config = {body:{ref: account.username}};
                    createAccount(`groups/${id}/members`, config);
                });
        });
    }

    cloneAccounts(accountName) {
        getAccountIdByName(accountName)
            .then(id => {
                this.accounts.forEach(account => {
                    cloneAccountConnections(id, account.accountId);
                    console.log('ACCCCCOCUNT', account);
                })
            })

    }
}

/*
 create accounts DONE
 create user, add to account DONE
 create group in account DONE
 add user to group DONE
 set group permissions DONE
 get source(s)
 add sources to account/user

 */
const a = new App(baseName, count);
a.createAccounts();

setTimeout(() => {
    a.addUserToAccounts();
}, 2000);

setTimeout(() => {
    a.addGroupToAccounts()
}, 3000);

setTimeout(() => {
    a.addUserToGroup()
}, 4000);

setTimeout(() => {
    a.cloneAccounts('company')
}, 5000);





