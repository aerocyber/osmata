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

function add_item() {
  var _name = document.getElementById("Name").value;
  var _url = document.getElementById("Url").value;
  var _category = document.getElementById("Cat").value.split(",");
  insertData(_name, _url, _category);
}

function data_reloader() {
  var dat_ = getData();
  for (let Osmation; Osmation < dat_.length; Osmation++) {
    document.getElementById("TO_DEL").innerHTML =
      document.getElementById("TO_DEL").innerHTML +
      "<option>" +
      dat_[Osmation].Name +
      "</option>";
  }
}

function update_items() {
  // Reload to make changes take effect
  window.location.reload();
}

function delete_items() {
  // Reload to make changes take effect
  window.location.reload();
}

function back_home() {
  var cur_path = window.location.pathname;
  var base_path = "app/";
  var to_path = "index.html";
  cur_path = base_path + to_path;
  window.location.href =
    location.protocol + window.location.hostname + cur_path;
}
