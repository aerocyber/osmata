// Copyright (C) 2022 aerocyber
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

function loadData() {
  var data = getData();
  var target = document.getElementById("view-pane").innerHTML;
  var html = "";
  for (let x; x < data.length; x++) {
    html =
      html +
      '<div><div class="uk-card uk-card-primary uk-card-hover uk-card-body uk-light"><h3 class="uk-card-title">results[x].name</h3><p>URL: <a href="results[x].url">results[x].url</a></p><p>Categories: results[x].categories</p><p>Actions:</p></div></div>';
  }
}

function redirectTo(page) {
  var page = window.location.href;
  var pg = page.split("/");
  _ = pg.pop();
  pg.push(page);
  window.location.href = pg.join("/");
}

function addItem() {
  var name = document.getElementById("Name").value;
  var url = document.getElementById("Url").value;
  var cat = document.getElementById("Cat").value.split(",");
  var data = getData();
  for (let x; x < data.length; x++) {
    if (data[x].name == name) {
      document.getElementById("name_err").innerHTML =
        name + " exists in DB. Try again with different name.";
      return;
    } else if (data[x].url == url) {
      document.getElementById("url_err").innerHTML =
        url + " exists in DB. Try again with different URL.";
      return;
    }
  }
  insertData(name, url, cat);
  redirectTo("view.html");
}

function loadDat(id) {
  var data = getData();
  var target = document.getElementById(id).innerHTML;
  for (let x; x < data.lenth; x++) {
    target =
      target +
      '<option value="' +
      data[x].name +
      '">' +
      data[x].name +
      "</option>";
  }
}

function deleteItems() {
  var Name = document.getElementById("TO_DEL").value;
  var _ = DeleteByName(Name);
  redirectTo("view.html");
}

function loadValue() {
  var data = getDataByName(document.getElementById("TO_EDIT").value);
  document.getElementById("Name").value = data[0].name;
  document.getElementById("Url").value = data[0].url;
  document.getElementById("Cat").value = data[0].category;
}

function editItem() {
  var data = getData();
  var name = document.getElementById("Name").value;
  var url = document.getElementById("Url").value;
  var cat = document.getElementById("Cat").value.split(",");
  for (let x; x < data.length; x++) {
    if (data[x].name == name) {
      document.getElementById("name_err").innerHTML =
        name + " exists in DB. Try again with different name.";
      return;
    } else if (data[x].url == url) {
      document.getElementById("url_err").innerHTML =
        url + " exists in DB. Try again with different URL.";
      return;
    }
  }
  insertData(name, url, category);
}
