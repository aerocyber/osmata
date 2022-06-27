// DB connection setup

// Set the driver and DB Name
function setInitialSettings(){
    localforage.config({
        driver: [localforage.INDEXEDDB,
                 localforage.LOCALSTORAGE,
    	     localforage.WEBSQL],
        name: 'Osmata DB'
    });
    localStorage.setItem('Settings-db', 'Set-Successfully')
}

// Add data
function addData(name, URL, Category = []){
    localforage.setItem(name, JSON.Stringify({"URL": URL, "Category": Category}));
}

// Get data by name
function getByName(name){
    return localforage.getItem(name);
}

// Get all data
function getAllData(){
    var dataKeys = localforage.keys().then(function (keys) {
        var dat = [];
        for (let x; x < keys.length; x++) {
            dat.push(localforage.getItem(keys[x]));
        }
        return dat;
    })
    return dataKeys;
}

// Remove data
function removeData(name){}

// Clear DB
function clearDB(){
    localforage.clear().then(function () {
        return {};
    })
}

// Export DB
function exportAsOmio(){
    var data = getAllData();
    var blob = new Blob(data);
    var f_name = 'Osmata-exports-' + Date.now() + '.omio';
    var file = new File(blob, f_name);
}

if (localStorage.getItem('Settings-db') != 'Set-Successfully'){
    setInitialSettings();
}