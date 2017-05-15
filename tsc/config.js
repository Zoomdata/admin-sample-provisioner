"use strict";
var baseUrl = "http://localhost:8080/zoomdata/api/";
var username = "supervisor";
var password = "omaromar";
exports.credentials = {
    id: username,
    pw: password,
};
exports.groupPermissions = [
    "manage_visualization_templates",
    "create_data_sources",
    "share_charts",
    "edit_calculations",
    "save_charts",
    "save_filters"
];
exports.accountConfig = {
    baseName: 'asbTraining',
    count: 2,
    addGroup: true,
    groupName: 'HR'
};
exports.userConfig = {
    username: 'sstudent',
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