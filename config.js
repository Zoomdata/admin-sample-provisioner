
/*
Fill out all of the settings below to create accounts
 */
const baseUrl = "http://localhost:8080/zoomdata/api/";
const username = "supervisor";
const password = "omaromar";

// const baseUrl = "https://training23.zoomdata.com:8443/zoomdata/api/";

export const credentials = {
    id: username,
    pw: password,
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

/*
 A number will be added to end of each account:
 Training1 and Training2

 Training1 will have a group named HR and a user named 'student1'
 student1 will be added to group HR
 */
export const accountConfig = {
    baseName: 'AAaaaaa',
    count: 10,
    addGroup: true, // MUST BE TRUE TO ADD GROUP
    groupName: 'HR'
};

export const userConfig = {
    username: 'astudent',
    password: 'something',
    makeAdmin: false // MUST SET TO TRUE TO MAKE ALL USERS ADMINS
};

export const currentSettings = {
    "async": true,
    "crossDomain": true,
    baseUrl,
    "headers": {
        'accept': "application/vnd.zoomdata.v2+json,application/vnd.zoomdata+json",
        'x-zoomdata-media-type': 'application/vnd.zoomdata.v1+json',
        'content-type': 'application/vnd.zoomdata+json',
        "cache-control": "no-cache"
    },
    json: true
};

