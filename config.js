
/*
Fill out all of the settings below to create accounts
 */

export const credentials = {
    id: "supervisor",
    pw: "omaromar",
    // pw: "train!ing23",
};
export const groupPermissions = [
    "manage_visualization_templates",
    "create_data_sources",
    "share_charts",
    "edit_calculations",
    "save_charts",
    "save_filters"
];
export const currentSettings = {
    "async": true,
    "crossDomain": true,
    // You must replace the following baseUrl with your own Zoomdata instance
    // "baseUrl": "https://training23.zoomdata.com:8443/zoomdata/api/",
    "baseUrl": "http://localhost:8080/zoomdata/api/",
    "headers": {
        'accept': "application/vnd.zoomdata.v2+json,application/vnd.zoomdata+json",
        'x-zoomdata-media-type': 'application/vnd.zoomdata.v1+json',
        'content-type': 'application/vnd.zoomdata+json',
        "cache-control": "no-cache"
    },
    json: true
};

