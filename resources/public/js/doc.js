
function docLoadVersions() {

  $.get("../version.json", function (data) {

    var versionList = $("#version_list");
    var versionDesc = $("#versions_description");

    data.forEach(function (entry, i, a) {

      //Menu
      var mine = false;
      var text = "";
      var link = null;

      if (entry.version == version) {
        text = "<b>v" + entry.version + "</b>";
        mine = true;
      }
      else {
        text = "v" + entry.version;
        link = "../v" + entry.version + '/';
      }

      if (i == data.length - 1) {
        text += "     <span class='glyphicon glyphicon-arrow-left'></span>";
      }

      var elem = "<li>";
      if (link != null) {
        elem += "<a href=\"" + link + "\">";
      }
      elem += text;
      if (link != null) {
        elem += "</a>";
      }
      elem += "</li>";


      //Version part
      var html =
        "<div class=\"sub_part\">";
      html += "<h2>V " + entry.version + "<h2>";


      html +=
        "<pre>" +
        "<code><br/>" + entry.message + "<br/><br/></code>" +
        "</pre>" +
        "</div>";

      versionList.prepend(elem);
      if (mine) {
        versionDesc.prepend(html);
      }
    });

  });
}

function loadVersionListRoot() {
    $.get("./.version.json", function (data) {

        var versionHistory = data;
        var versionDiv = $("#version");
        versionDiv.innerHTML = "";

        versionHistory.foreach(function (version) {

            var versionBlock =
                '<div class="big_part">' +
                    '<h2><a href="./' + version.version + '/index.html">V ' + version.version + '</a></h2>' +
                    '<ul>';

            version.changes.forEach(function (change) {
                versionBlock += '<li>' + change + '</li>';
            });

            versionBlock += '</ul>' +
                    '<i> by ' + version.author + ', ' + version.date + '</i>' +
                    '</div>';

            versionDiv.append(versionBlock);
        });


    });
}