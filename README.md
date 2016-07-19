# Sample Provisioner

This sample application demonstrates the use of Zoomdata's administrative REST APIs. With it, you can create multiple accounts at once, list existing accounts, and delete accounts by name. The sample demonstrates using Zoomdata's GET `/accounts/` API to retrieve an `accountId` by account name and then using that `accountId` with Zoomdata's DELETE `/accounts/` API to delete the account.

## Commands

* Node js is a pre-requisite
```
	npm install
```
* Clone this repo

* Start the command line tool
```
	node index.js
```
* Enter h to see available commands
