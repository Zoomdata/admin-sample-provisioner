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

function zdGet(url, config) {
	return new Promise(function(resolve,reject) {
		var options = Object.assign(currentSettings, {url});
		var accountIdval = request
		  .get(options)
		  .auth(credentials.id, credentials.pw)
		  .then(function(response) {
			  return response.data;
		  });
		if (accountIdval) {
			resolve(accountIdval);
		}
		else {
			reject(accountIdval);
		}

	})
}
function zdPost(url, config) {
	return new Promise(function(resolve,reject) {
		var options = Object.assign(currentSettings, {url});
		var accountIdval = request
		  .get(options)
		  .auth(credentials.id, credentials.pw)
		  .then(function(response) {
			  return response.data;
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
			  console.log(response.links[0].href.split('/'))
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

// function createAccountsArray(baseName, count) {
// 	var accountList = [];
//
// 	while(count > 0) {
// 		let name = baseName + count;
// 		let account = {
// 			accountName: name,
// 			username: `${name}-trainer`
// 		};
//
// 		accountList.push(account);
// 		count--;
// 	}
// 	console.log('ACCOUNTLIST', accountList);
// 	return accountList;
// }
//

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
		  // console.log("Error parsing id: ", err.response);
	  })
}

function createConnectionOnAccount(url, config) {
	console.log('CONFIG CREATE ACCOUNT PARAMETER: ', url, {body: config});

	var options = Object.assign(currentSettings, {url}, {body: config});
	request
	  .post(options)
	  .auth(credentials.id, credentials.pw)
	  .then(function(response) {
		  console.log("Connection added: ", response.name);
	  })
	  .catch(function(err) {
		  console.log('messed up Connection thing');
		  // console.log("Error parsing id: ", err.response);
	  })
}
//
//
// // MAKE AN ARRAY OF ACCOUNTS:
//
// const totalAccounts = createAccountsArray('Telia', 25);
//
// // CREATE ACCOUNTS:
//
// totalAccounts.forEach(account => {
// 	//***
// 	createAccount('accounts', {body: {name: account.accountName}});
// });
//
// // CREATE USER AND ADD TO EACH ACCOUNT:
//
// setTimeout(() => {
// 	//***
// 	totalAccounts.forEach((account, i) => {
// 		getAccountIdByName(account.accountName)
// 		  .then(id => {
// 			  const config =  {
// 				  // administrator:true,
// 				  // email:"string",
// 				  enabled:true,
// 				  password:`training`,
// 				  username: account.username,
// 			  };
//
// 			  console.log(config, id);
// 			  createAccount(`accounts/${id}/users`, {body: config});
// 		  });
// 	});
// }, 4000);
// //
// // // CREATE GROUP AND ADD TO ACCOUNT:
//
// setTimeout(() => {
// 	totalAccounts.forEach((account, i) => {
// 		getAccountIdByName(account.accountName)
// 		  .then(function(id) {
// 			  const config = {body:{name: `${account.accountName}-group`}};
//
// 			  console.log(config, id);
// 			  // createAccount(`accounts/${id}/users`, config);
// 			  createAccount(`accounts/${id}/groups`, config);
// 			  // createAccount(`groups/${id}/members`, user.username);
// 			  // createAccount(`accounts/${id}/groups/name/${user.username}`, user.username);
// 		  });
// 	});
// }, 8000);

// ADD USER TO GROUP:
//
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


function getCompanySource() {
	return getAccountIdByName('company')
	            .then(id => {
		            const url = `accounts/${id}/connections`;
		            const getOptions = Object.assign(currentSettings, {url});
		            return zdGet(url)
		              .then(cons => {
		              	return cons;
		              })
	            })
}

let sources;
const sourcer = getCompanySource('company').then(d => sources = d);


// const zdGetSources = zdGet()

console.log('SOURCES HERE: ', sources);
setTimeout(() => {
	// console.log('source2: ', sources);
	getAccountIdByName('Telia25')
	  .then(id => {
		  sources.forEach(source => {
			  const url = `accounts/${id}/connections`;
			  console.log(source);
			  createConnectionOnAccount(url, source)
		  })
	  })

}, 3000);



// companyID = 5732368760b2682dd403155c
// telia1ID = 582c786fe4b0614ba7c9530a