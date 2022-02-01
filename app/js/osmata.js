/**
 * Copyright ©️ 2021 aerocyber
 * https://github.com/aerocyber/osmata.js
 * Licensed under the terms of MIT License.
 */

// Language: javascript

// Use cryptojs to encrypt and decrypt in AES.
function encrypt(data, key) {
  return CryptoJS.AES.encrypt(data, key).toString();
}

// Use cryptojs to encrypt and decrypt in AES.
function decrypt(data, key) {
  return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
}

// Check if cryptojs is loaded.
if (typeof CryptoJS == "undefined") {
  var encryption = false;
} else {
  var encryption = true;
}

// Built-In Error Check: Types.
function checkTypeMatch(variable, expectedType) {
  if (type(databaseObject) != expectedType) {
    return {
      Code: {
        Status: "Error",
        Type: "TypeError",
        On: variable,
      },
    };
  }
  return true;
}

// Feature: Search for a specific url based on the name property.
function search(name, databaseObject) {
  if (checkTypeMatch(name, "String") != true) {
    return checkTypeMatch(name, "String");
  } else if (checkTypeMatch(databaseObject, "Object") != true) {
    return checkTypeMatch(databaseObject, "Object");
  }
}

// Feature: Add a new Osmation to DB.
function add(name, url, databaseObject, categories = []) {
  if (checkTypeMatch(name, "String") != true) {
    return checkTypeMatch(name, "String");
  } else if (checkTypeMatch(url, "String") != true) {
    return checkTypeMatch(url, "String");
  } else if (checkTypeMatch(categories, "Array") != true) {
    return checkTypeMatch(categories, "Array");
  }
  x = false;
  for (var key in databaseObject) {
    if (databaseObject[key] == url) {
      return {
        Code: {
          Status: "Error",
          Type: "URL Exists",
          On: url,
        },
      };
    } else if (key == name) {
      return {
        Code: {
          Status: "Error",
          Type: "Name Exists",
          On: name,
        },
      };
    }
  }
  databaseObject[name] = {
    URL: url,
    Categories: categories,
  };
  return {
    Code: {
      Status: "Success",
      Type: "Added",
      On: name,
    },
  };
}

// Feature: Delete an existing Osmation by name.
function del(name, databaseObject) {
  if (checkTypeMatch(name, "String") != true) {
    return checkTypeMatch(name, "String");
  } else if (checkTypeMatch(databaseObject, "Object") != true) {
    return checkTypeMatch(databaseObject, "Object");
  }
  for (var key in databaseObject) {
    if (databaseObject[key] == name) {
      delete databaseObject[key];
      return {
        Code: {
          Status: "Success",
          Type: "Deleted",
          On: name,
        },
      };
    }
  }
  return {
    Code: {
      Status: "Error",
      Type: "Not Found",
      On: name,
    },
  };
}

// Feature: Update an existing Osmation.
function updation(name, url, databaseObject, categories = []) {
  if (checkTypeMatch(name, "String") != true) {
    return checkTypeMatch(name, "String");
  } else if (checkTypeMatch(url, "String") != true) {
    return checkTypeMatch(url, "String");
  } else if (checkTypeMatch(categories, "Array") != true) {
    return checkTypeMatch(categories, "Array");
  }
  if (name in databaseObject) {
    delete databaseObject[name];
    return add(name, url, databaseObject, categories);
  } else {
    return add(name, url, databaseObject, categories);
  }
}

// Feature: Export the DB as omio strucured JSON string.
function exportOmio(DBObject, omioPswd = false) {
  if (checkTypeMatch(DBObject, "Object") != true) {
    return checkTypeMatch(DBObject, "Object");
  }
  if (omioPswd == false) {
    var data = JSON.stringify(DBObject);
    var SHA = "";
    var _v = false;
  } else {
    if (checkTypeMatch(omioPswd, "String") != true) {
      return checkTypeMatch(omioPswd, "String");
    }
    if (encryption == true) {
      var data = encrypt(JSON.stringify(DBObject), omioPswd);
      var SHA = CryptoJS.SHA256(omioPswd).toString();
      var _v = true;
    } else {
      return {
        Code: {
          Status: "Error",
          Type: "CryptoJS Not Loaded",
          On: "Omio",
        },
      };
    }
  }

  var db = {
    Header: {
      "Omio Version": "2.0",
      Restricted: _v,
      "Password Hash": SHA,
    },
    Data: data,
    Footer: {
      "End of DB": true,
    },
  };
  return JSON.stringify(db);
}

// Feature: Import omio DB to DB.
function importOmio(DBObject, omioJSONString, omioPswd = false) {
  var db = JSON.parse(omioJSONString);
  if (checkTypeMatch(DBObject, "Object") != true) {
    return checkTypeMatch(DBObject, "Object");
  } else if (checkTypeMatch(omioJSONString, "String") != true) {
    return checkTypeMatch(omioJSONString, "String");
  } else if (omioPswd != false || checkTypeMatch(omioPswd, "String") != true) {
    return checkTypeMatch(omioPswd, "String");
  }
  if (db.Header["Omio Version"] != "2.0") {
    return {
      Code: {
        Status: "Error",
        Type: "Invalid Version",
        On: "Omio",
      },
    };
  }
  if (db.Header.Restricted == true) {
    if (omioPswd == false) {
      return {
        Code: {
          Status: "Error",
          Type: "Password Required",
          On: "Omio",
        },
      };
    }
    if (CryptoJS.SHA256(omioPswd).toString() != db.Header["Password Hash"]) {
      return {
        Code: {
          Status: "Error",
          Type: "Invalid Password",
          On: "Omio",
        },
      };
    }
    var dbData = decrypt(db.Data, omioPswd);
  } else {
    var dbData = db.Data;
  }
  var dbData = JSON.parse(dbData);
  for (var key in dbData) {
    // If the key is not in the DB, add it.
    if (DBObject[key] == undefined) {
      DBObject[key] = dbData[key];
    }
  }
  return {
    Code: {
      Status: "Success",
      Type: "Imported",
      On: DBObject,
    },
  };
}

// Feature: Open omio string.
function openOmio(OmioString, omioPswd = false) {
  var db = JSON.parse(omioJSONString);
  if (checkTypeMatch(DBObject, "Object") != true) {
    return checkTypeMatch(DBObject, "Object");
  } else if (checkTypeMatch(omioJSONString, "String") != true) {
    return checkTypeMatch(omioJSONString, "String");
  } else if (omioPswd != false || checkTypeMatch(omioPswd, "String") != true) {
    return checkTypeMatch(omioPswd, "String");
  }
  if (db.Header["Omio Version"] != "2.0") {
    return {
      Code: {
        Status: "Error",
        Type: "Invalid Version",
        On: "Omio",
      },
    };
  }
  if (db.Header.Restricted == true) {
    if (omioPswd == false) {
      return {
        Code: {
          Status: "Error",
          Type: "Password Required",
          On: "Omio",
        },
      };
    }
    if (CryptoJS.SHA256(omioPswd).toString() != db.Header["Password Hash"]) {
      return {
        Code: {
          Status: "Error",
          Type: "Invalid Password",
          On: "Omio",
        },
      };
    }
    var dbData = decrypt(db.Data, omioPswd);
  } else {
    var dbData = db.Data;
  }
  var dbData = JSON.parse(dbData);
  return {
    Code: {
      Status: "Success",
      Type: "Opened",
      On: dbData,
    },
  };
}
