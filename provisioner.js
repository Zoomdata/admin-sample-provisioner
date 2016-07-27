var request = require('request-promise');
var vorpal = require('vorpal')();
var chalk = vorpal.chalk;
var promise = require('bluebird');


// You must replace these credentials with your own supervisor credentials

var credentials = {
    id: "no id entered",
    pw: "no password entered"
};


// default settings for our REST API calls,
// as required by the request-promise library:
// ^^ this more required by our api, not request-promise.
var currentSettings = {
    "async": true,
    "crossDomain": true,
    
    // You must replace the following baseUrl with your own Zoomdata instance
    "baseUrl": "https://NO SERVER ENTERED/zoomdata/api/",
    "headers": {
      'accept': "application/vnd.zoomdata.v2+json,application/vnd.zoomdata+json",
      'x-zoomdata-media-type': 'application/vnd.zoomdata.v1+json',
      'content-type': 'application/vnd.zoomdata+json',
      "cache-control": "no-cache"
    },
    json: true
  };


function createAccount(url, accountName) {
  var options = Object.assign(currentSettings, {url}, {body:{name: accountName}});

  // We use the request-promise library to handle our REST API calls
  request
    .post(options)
    .auth(credentials.id, credentials.pw)
    .then(function(response) {
      console.log("Account created: ", response.name);
    })
    .catch(function(err) {
      console.log("Error parsing id: ", err);
    })
}


function listAccounts(url) {

  // The default limit is 25, which is often too low
  // so we increase it to a number that will usually
  // return all account objects.

  url = url + "?limit=500";
  var options = Object.assign(currentSettings, {url});

  // We use the request-promise library to handle our REST API calls
  request
    .get(options)
    .auth(credentials.id, credentials.pw)
    .then(function(response) {

      // Take returned list of account objects
      // and extract the name from each object
      // and add it to the list of names.
      // usually people dont write 'account objects' imo 'accounts' is better.

      var data = response.data;
      var nameList = [];

      data.forEach(function(datum) { // use more descriptive parameters, prob account here and accounts instead of data above.
        nameList.push(datum.name);
      });

      console.log("Accounts:");

      nameList.forEach(function(name) {
        console.log(name);
      });
    })
    .catch(function(err) {
      console.log("Error listing accounts: ", err);
    })
}


function getAccountIdByName(name) {

  // We use bluebird.js to make a function (getAccountIdByName)
  // return a promise. You can use native javascript
  // promises or other approaches to help manage the
  // asynchronous nature of REST calls.
// this is a native promise! you dont need bluebird here. 'Promise' is native - you're importing bluebird as 'promise'
  return new Promise(function(resolve,reject) {

    // The /accounts/name api retrieves an account by name
    // and returns an account object.
// well written! 
    var url = 'accounts/name/' + name;
    var options = Object.assign(currentSettings, {url});
    var accountId;

    // We use the request-promise library to handle our REST API calls
    var accountIdval = request
        .get(options)
        .auth(credentials.id, credentials.pw)
        .then(function(response) {

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


function deleteAccount(accountId) {
  var url = 'accounts/' + accountId;
  var options = Object.assign(currentSettings, {url});
  var accountId;

  // We use the request-promise library to handle our REST API calls
  request
    .delete(options)
    .auth(credentials.id, credentials.pw)
    .then(function(response) {
      console.log("Account deleted: ", accountId);
    })
    .catch(function(err) {
      console.log("Error deleting: ", err);
    });
}



// Vorpal setup
// Vorpal is a neat little tool for making shell applications.
// See http://vorpal.js.org/ for more information.

vorpal
    .delimiter(chalk.magenta('zd-provisioner:'))
    .show();


// Vorpal commands

vorpal
.command('login [serverUrl] [username] [password]', 'Sets login credentials for server. serverUrl = www.xyz.com ONLY. No protocol, no extensions')
.action(function(args, cb) {
  var serverUrl = args.serverUrl;
  var username = args.username;
  var password = args.password;
    
  credentials.id = username;
  credentials.pw = password;
  // use string literals here - its more so that people are moving away from the string + string style these days:
  currentSettings.baseUrl = "https://" + serverUrl + "/zoomdata/api/";
    
  cb();
});

vorpal
.command('list credentials', 'List credentials currently in use')
// for something like this the 'ls' command might be a nice shortcut. 
.action(function(args,cb) {
  console.log("\nYou are currently using: ");
  console.log("username: ", credentials.id);
  console.log("password: ", credentials.pw);
  console.log("On: ", currentSettings.baseUrl);

  cb();
});

vorpal
.command('create multiple [baseName] [count]', 'Add multiple accounts, each with an admin.')
.action(function(args, cb) {
  var self = this;
  var baseName = args.baseName;
  var count = args.count;
  var nameList = [];
  
  while(count > 0) {
    var user = {username: baseName + count};
    nameList.push(user);
    count--;
  }

  nameList.forEach(function(name) {

    // The createAccount method requires the API path
    createAccount('accounts', name.username, credentials.id, credentials.pw);
  });

  cb();
});


vorpal
.command('list accounts', 'List all accounts')
.action(function(args,cb) {

  // The listAccount methods requires the API path
  listAccounts('accounts');
  cb();
});


vorpal
.command('delete account [name]', 'Delete account by [name]')
.action(function(args,cb) {
  var name = args.name;
  var accountId;

// see above re: native promises.

  // Here we use our promisified function. It gets the accountID
  // by its name and returns a promise. When the promise is
  // completed, the accountID is passed to deleteAccount.
  // If we do not handle asynchronicity, the app will probably
  // attempt the delete before it has the accountID in hand,
  // and will fail as a result.
  getAccountIdByName(name)
  .then( function(id) {
    deleteAccount(id);
  })
  .catch( function(err) {
    console.log("Couldn't delete account ", name, " because: ", err.message);
  });

  cb();
});



/* You can add more commands by copying and customizing the
following vorpal call. */

/*
vorpal
.command('', '')
.action(function(args,cb) {
  // actions
});
*/
