
import {getGroupIdByName, createAccount, getAccountIdByName, createAccountsArray} from './utils';
import { groupPermissions } from './config'
class App {
    constructor(baseName, count) {
        this.accounts = createAccountsArray(baseName, count);
    }
    createAccounts(accountsArray) {
        this.accounts.forEach(account => {
            createAccount('accounts', {body: {name: account.accountName}});
        });
        setTimeout(() => {
            this.appendAccountIds();
        }, 1000)
    }
    appendAccountIds() {
        this.accounts.forEach(account => {
            getAccountIdByName(account.accountName)
                .then(id => account.accountId = id);
        });
    }
    addUserToAccounts() {
        this.accounts.forEach((account) => {
            // getAccountIdByName(account.accountName)
            //     .then(id => {
                    const config =  {
                        // administrator:true,
                        // email:"string",
                        enabled:true,
                        password:`training`, /////////////////////////////////////////////////////////
                        username: account.username,
                    };
                    createAccount(`accounts/${account.accountId}/users`, {body: config});
                // });
        });
    }

    addGroupToAccounts() {
        this.accounts.forEach((account) => {
            // getAccountIdByName(account.accountName)
            //     .then(id => {
                    const config = {body:{
                        name: `${account.groupName}`,
                        permissions: groupPermissions
                    }};
                    createAccount(`accounts/${account.accountId}/groups`, config);
                // });
        });
    }

    addUserToGroup() {
        console.log('adding');
        this.accounts.forEach(account => {
            // getAccountIdByName(account.accountName)
            //     .then(accountId => {
                    getGroupIdByName(account.accountId, account.groupName)
                        .then(id => {
                            const config = {body:{ref: account.username}};
                            console.log('added');
                            createAccount(`groups/${id}/members`, config);
                        });
                // })
        });
    }
}



/*
 create accounts
 create user, add to account
 create group in account
 add user to group
 set group permissions
 get source(s)
 add sources to account/user

 */
const a = new App('AAAAAAAaaafasasf', 2);

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


