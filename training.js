var request = require('request-promise');

var credentials = {
	id: "supervisor",
	pw: "Z00mda1a",
};

var currentSettings = {
	"async": true,
	"crossDomain": true,

	// You must replace the following baseUrl with your own Zoomdata instance
	"baseUrl": "https://training.zoomdata.com/zoomdata/api/",
	"headers": {
		'accept': "application/vnd.zoomdata.v2+json,application/vnd.zoomdata+json",
		'x-zoomdata-media-type': 'application/vnd.zoomdata.v1+json',
		'content-type': 'application/vnd.zoomdata+json',
		"cache-control": "no-cache"
	},
	json: true
};



// function createAccount(url='accounts', accountName) {
// 	console.log('ACCOUNT NAME', accountName, (typeof accountName));
// 	const config = typeof accountName === 'string' ? {body:{name: accountName}} : {body: accountName};
//
// 	var options = Object.assign(currentSettings, {url}, config);
// 	console.log(url, options);
// 	request
// 	  .post(options)
// 	  .auth(credentials.id, credentials.pw)
// 	  .then(function(response) {
// 		  console.log("Account created: ", response.name);
// 	  })
// 	  .catch(function(err) {
// 	  	console.log('messed up');
// 		  console.log("Error parsing id: ", err.response);
// 	  })
// }


function getAccountIdByName(name) {
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

function getGroupIdByName(name, id) {
	return new Promise(function(resolve,reject) {
		var url = `accounts/${id}/groups/name/${name}`;
		var options = Object.assign(currentSettings, {url});
		var accountIdval = request
		  .get(options)
		  .auth(credentials.id, credentials.pw)
		  .then(function(response) {
// console.log(response.links[0].href.split('/'))
			  // parse and return the accountId from the account object
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

function createAccountsArray(baseName, count) {
	var accountList = [];

	while(count > 0) {
		let name = baseName + count;
		let account = {
			accountName: name,
		    username: 'ttrainer' + count
		};

		accountList.push(account);
		count--;
	}
	console.log('ACCOUNTLIST', accountList);
	return accountList;
}


function createAccount(url, config) {
	console.log('CONFIG CREATE ACCOUNT PARAMETER: ', url, config);

	var options = Object.assign(currentSettings, {url}, config);
	console.log('URL OPTIONS HERE', url, options);
	request
	  .post(options)
	  .auth(credentials.id, credentials.pw)
	  .then(function(response) {
		  console.log("Account created: ", response.name);
	  })
	  .catch(function(err) {
		  console.log('messed up');
		  console.log("Error parsing id: ", err.response);
	  })
}


// MAKE AN ARRAY OF ACCOUNTS:

const totalAccounts = createAccountsArray('telia', 25);

// CREATE ACCOUNTS:

totalAccounts.forEach(account => {
	//***
	createAccount('accounts', {body: {name: account.accountName}});
});

// CREATE USER AND ADD TO EACH ACCOUNT:

setTimeout(() => {
	//***
	totalAccounts.forEach((account, i) => {
		getAccountIdByName(account.accountName)
		  .then(id => {
			  const config =  {
				  // administrator:true,
				  // email:"string",
				  enabled:true,
				  password: account.username,
				  username: account.username,
			  };

			  console.log(config, id);
			  createAccount(`accounts/${id}/users`, {body: config});
		  });
	});
}, 100);
//
// // CREATE GROUP AND ADD TO ACCOUNT:

setTimeout(() => {
	totalAccounts.forEach((account, i) => {
		getAccountIdByName(account.accountName)
		  .then(function(id) {
			  const config = {body:{name: `${account.accountName}-group`}};

			  console.log(config, id);
			  // createAccount(`accounts/${id}/users`, config);
			  createAccount(`accounts/${id}/groups`, config);
			  // createAccount(`groups/${id}/members`, user.username);
			  // createAccount(`accounts/${id}/groups/name/${user.username}`, user.username);
		  });
	});
}, 1000);

// // ADD USER TO GROUP:
// //
// setTimeout(() => {
// 	totalAccounts.forEach((user, i) => {
// 		getAccountIdByName(user.accountName)
// 		  .then(function(id) {
// 			  getGroupIdByName(id, `${user.accountName}-group`)
// 			  .then(groupid => {
// 		  		console.log('GROUP ID : ', groupid)
// 			    const config = {body:{ user: user.username}};
// 			    createAccount(`accounts/${id}/groups/name/${user.username}`, user.username);
// 		    })
// 		  });
// 	});
// }, 2000);

// ADD SOURCES:

// function handleSources(name) {
// 	getAccountIdByName(name)
// 	  .then(id => {
// 		  const options = Object.assign(currentSettings, {url: `accounts/${id}/connections`});
//
// 		  request
// 		    .get(options)
// 		    .auth(credentials.id, credentials.pw)
// 		    .then(res => {
// 		    	console.log(res.data[0]);
// 		    })
// 	  });
// }

// /api/accounts/{accountId}/groups
/**
 * /accounts/582bc73fe4b0614ba7c951aa/users
 *
 * /api/accounts/{accountId}/groups/name/{name}
 * /api/groups/{id}/members
 {
   "administrator":true,
   "email":"string",
   "enabled":true,
   "password":"test",
   "username":"test"
}
 */

// handleSources('company');