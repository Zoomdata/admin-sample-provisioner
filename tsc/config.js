"use strict";
exports.credentials = {
    id: "supervisor",
    pw: "omaromar",
};
exports.groupPermissions = [
    "manage_visualization_templates",
    "create_data_sources",
    "share_charts",
    "edit_calculations",
    "save_charts",
    "save_filters"
];
exports.currentSettings = {
    "async": true,
    "crossDomain": true,
    "baseUrl": "http://localhost:8080/zoomdata/api/",
    "headers": {
        'accept': "application/vnd.zoomdata.v2+json,application/vnd.zoomdata+json",
        'x-zoomdata-media-type': 'application/vnd.zoomdata.v1+json',
        'content-type': 'application/vnd.zoomdata+json',
        "cache-control": "no-cache"
    },
    json: true
};
//# sourceMappingURL=config.js.map