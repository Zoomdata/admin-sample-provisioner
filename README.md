# Sample Provisioner

This sample application demonstrates the use of Zoomdata's administrative REST APIs. With it, you can create multiple accounts at once, list existing accounts, and delete accounts by name. The sample demonstrates using Zoomdata's GET `/accounts/` API to retrieve an `accountId` by account name and then using that `accountId` with Zoomdata's DELETE `/accounts/` API to delete the account.

## Commands

1 Install Node.js on your machine if you have not already done so.

2 Clone this repo.

3 Download dependencies by running
```
	npm install
```

4 Start the command line tool
```
	node index.js
```

5 Enter `h` to see available commands.

6 Before you can begin work, you must use the `login` command to set credentials.