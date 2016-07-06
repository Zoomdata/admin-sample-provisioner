var request = require('request-promise');
var vorpal = require('vorpal')();
var chalk = vorpal.chalk;
var async = require("async");


// You must replace these credentials with your own supervisor credentials

var credentials = {
    id: "supervisor",
    pw: "supervisor"
};

// default settings:

var defaultSettings = {
    "async": true,
    "crossDomain": true,
    
    // You must replace the following URL with your own Zoomdata instance
    "baseUrl": "https://preview.zoomdata.com/zoomdata/api/",
    "headers": {
      'accept': "application/vnd.zoomdata.v2+json,application/vnd.zoomdata+json",
      'x-zoomdata-media-type': 'application/vnd.zoomdata.v1+json',
      'content-type': 'application/vnd.zoomdata+json',
      "cache-control": "no-cache"
    },
    json: true
  };


function assignUrl(url) {
  var data = {url}
  return Object.assign(defaultSettings, data);
}


function createAccount(url, accountName) {
  var options = Object.assign(defaultSettings, {url}, {body:{name: accountName}});

    console.log("Credentials: ", credentials);
    
  request
    .post(options)
    .auth(credentials.id, credentials.pw)
    .then(function(response) {
      console.log(response);
    })
    .catch(function(err) {
      console.log((err.response.body.message));
    })
}

function parseId(userList, accountName) {
  var found;
  for (var i = 0; i < userList.length; i++) {
    if (userList[i].name === accountName) {
      found = userList[i];
    }
  }
  var id = found.links[0].href.split('/').pop();
  return id;
}

function addUserToAccountName(url, accountName, newAccountName, username, password){
  var options = assignUrl(url);
  request
  .get(options)
  .auth(username, password)
  .then(function(res) {
    var id = parseId(res.data, accountName);
    return id;
  })
  .then(function(id) {
    var postOptions = Object.assign(defaultSettings, {url: url + id + '/users'},
    {body: {username: newAccountName,
            administrator: true,
            password: newAccountName
          }})
    request.post(postOptions)
      .auth(username, password)
      .then(function(response) {
        //console.log(response);
      })
      .catch(function(err) {
        console.log((err.response.body.message));
      })
  })
}
// vorpal commands:

vorpal
.command('create account [accountName]', 'Add an account.')
.action(function(args, cb) {
  var self = this;
   var username = args.username;
   var password = args.password;
   var accountName = args.accountName;
   createAccount('accounts', accountName)
   cb();
})

vorpal
.command('create multiple [suffix] [count]', 'Add multiple accounts, each with an admin.')
.action(function(args, cb) {
   var self = this;
   var suffix = args.suffix;
   var count = args.count;
   var array = []
   while(count > 0) {
     var user = {username: suffix + count};
     array.push(user);
     count--;
   }
   async.each(array, function(user, callback) {
     async.series([
       function(cb1) {
         createAccount('accounts', user.username, credentials.id, credentials.pw);
         cb1();
       },
       function(cb2) {
         addUserToAccountName('accounts/', user.username, user.username + 'user1', credentials.id, credentials.pw);
         cb2();
       }
     ])
     callback();
   })
  //  async.each(array, function(user, callback) {
  //    createAccount('accounts', user.username, 'supervisor', 'supervisor')
  //    callback(
  //      async.nextTick(function() {
  //        addUserToAccountName('accounts/', user.username, user.username + 'user1', credentials.id, credentials.pw);
  //      })
  //    );
  //  })
   cb();
})


vorpal
  .command('create accountb [accountName] [newAccountName] [username] [password]', 'Adds account with one user')
  .action(function(args, cb) {
    var accountName = args.accountName;
    var newAccountName = args.newAccountName;
    var username = args.username;
    var password = args.password;
    addUserToAccountName('accounts/', accountName, newAccountName, credentials.id, credentials.pw);
    cb();
  })

vorpal
    .command('login [serverUrl] [username] [password]', 'Sets login credentials for server. serverUrl = www.xyz.com ONLY. No protocol, no extensions')
    .action(function(args, cb) {
        var serverUrl = args.serverUrl;
        var username = args.username;
        var password = args.password;
    
        credentials.id = username;
        credentials.pw = password;
        defaultSettings.baseUrl = "https://" + serverUrl + "/zoomdata/api/";
    
        cb();
})

vorpal
    .delimiter(chalk.magenta('zd-provisioner:'))
    .show();
