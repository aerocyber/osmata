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

function addItem() {
  var name = document.getElementById("Name").value;
  var url = document.getElementById("Url").value;
  var cat = document.getElementById("Cat").value.split(",");
  insertData((Name = name), (Url = url), (Categories = cat));
}
