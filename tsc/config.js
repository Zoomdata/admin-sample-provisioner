"use strict";
var username = "supervisor";
var password = "train!ing23";
var baseUrl = "https://training23.zoomdata.com:8443/zoomdata/api/";
exports.credentials = {
    id: username,
    pw: "train!ing23",
};
exports.groupPermissions = [
    "create_data_sources",
    "share_charts",
    "edit_calculations",
    "save_charts",
    "save_filters"
];
exports.accountConfig = {
    baseName: 'Training',
    count: 3,
    addGroup: true,
    groupName: 'HR'
};
exports.userConfig = {
    username: 'student',
    password: 'something',
    makeAdmin: false
};
exports.currentSettings = {
    "async": true,
    "crossDomain": true,
    baseUrl: baseUrl,
    "headers": {
        'accept': "application/vnd.zoomdata.v2+json,application/vnd.zoomdata+json",
        'x-zoomdata-media-type': 'application/vnd.zoomdata.v1+json',
        'content-type': 'application/vnd.zoomdata+json',
        "cache-control": "no-cache"
    },
    json: true
};
//# sourceMappingURL=config.js.map