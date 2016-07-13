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

var currentSettings = {
    "async": true,
    "crossDomain": true,

    // You must replace xyz.xyz.xyz with your own Zoomdata instance
    "baseUrl": "https://xyz.xyz.xyz/zoomdata/api/",
    "headers": {
        'accept': "application/vnd.zoomdata.v2+json,application/vnd.zoomdata+json",
        'x-zoomdata-media-type': 'application/vnd.zoomdata.v1+json',
        'content-type': 'application/vnd.zoomdata+json',
        "cache-control": "no-cache"
    },
    json: true
};


function assignUrl(url) {
    var data = {
        url
    };
    return Object.assign(currentSettings, data);
}


function createAccount(url, accountName) {
    var options = Object.assign(currentSettings, {
        url
    }, {
        body: {
            name: accountName
        }
    });


    request
        .post(options)
        .auth(credentials.id, credentials.pw)
        .then(function (response) {
            console.log(response.name + " created.");
        })
        .catch(function (err) {
            console.log((err.response.body.message));
        });
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

function addUserToAccountName(url, accountName, newAccountName) {
    var options = assignUrl(url);
    request
        .get(options)
        .auth(credentials.id, credentials.pw)
        .then(function (res) {
            var id = parseId(res.data, accountName);
            return id;
        })
        .then(function (id) {
            var postOptions = Object.assign(currentSettings, {
                url: url + id + '/users'
            }, {
                body: {
                    username: newAccountName,
                    administrator: true,
                    password: newAccountName
                }
            })
            request.post(postOptions)
                .auth(credentials.id, credentials.pw)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (err) {
                    console.log((err.response.body.message));
                })
        });
}



/*------------------------------------------------------------------------*/
/*------------------------------------------------------------------------*/
/*------------------------  commands line options  -----------------------*/
/*------------------------------------------------------------------------*/
/*------------------------------------------------------------------------*/

// Set the prompt

vorpal
    .delimiter(chalk.magenta('zd-provisioner:'))
    .show();


// Allow users to specify the server and credentials to work with

vorpal
    .command('login [serverUrl] [username] [password]', 'Sets login credentials for server. serverUrl = www.xyz.com ONLY. No protocol, no extensions')
    .action(function (args, cb) {
        var serverUrl = args.serverUrl;
        var username = args.username;
        var password = args.password;

        credentials.id = username;
        credentials.pw = password;
        currentSettings.baseUrl = `https://${serverUrl}/zoomdata/api/`;
    
        console.log("New login: ", currentSettings.baseUrl, credentials.id, credentials.pw);

        cb();
    });


// Create account

vorpal
    .command('create account [accountName]', 'Add an account.')
    .action(function (args, cb) {
        var self = this;
        var username = args.username;
        var password = args.password;
        var accountName = args.accountName;
        createAccount('accounts', accountName)
        cb();
    });


// Create multiple accounts, each with an admin

vorpal
    .command('create multiple [basename] [count]', 'Add [count] accounts, named with [basename], each with an admin.')
    .action(function (args, cb) {
        var self = this;
        var basename = args.basename;
        var count = args.count;
        var array = [];

        // delay is increased with the number of accounts created so that
        // user creation is delayed until all accounts have been created
        var delay = count*500;  

        while (count > 0) {
            var user = {
                username: basename + count
            };
            array.push(user);
            count--;
        }

 
        async.eachSeries(array, function (user, cb1) {
                    createAccount('accounts', user.username, credentials.id, credentials.pw);
                    cb1();
            });


        count = args.count;
        for (i=0; i<count; i++) {
            (addUserToAccountName('accounts/', array[i].username, array[i].username + 'user1'))(user);
        }


        cb();

    });



/*        async.eachSeries(array, function (user, cb1) {
                    createAccount('accounts', user.username, credentials.id, credentials.pw);
                    cb1();
            });

        setTimeout( function() {
            async.eachSeries(array, function(user, cb2) {
                    addUserToAccountName('accounts/', user.username, user.username + 'user1');
                    cb2();
                    });
        }, delay);

        cb();

    });
*/

/*        async.each(array, function (user, callback) {
            async.series([
                function (cb1) {
                    createAccount('accounts', user.username, credentials.id, credentials.pw);
                    cb1();
                    },
                function (cb2) {
                    addUserToAccountName('accounts/', user.username, user.username + 'user1');
                    cb2();
                    }
            ])
            callback();
        });

        cb();
    });

*/