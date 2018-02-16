$(document).ready(function() {
  var body = $('body');
  var userList = $('.row');
  var infoWindow = $('.info-window');


  var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
      "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"
  ];

  users.forEach(function(user) {
    $.ajax('https://wind-bow.glitch.me/twitch-api/streams/' + user, {
      success: function(userData) {
        $.ajax('https://wind-bow.glitch.me/twitch-api/users/' + user, {
          success: function(avatarData) {
            var listItem = $('<li></li>');
            var col = $('<div class="col-md-4"></div>');
            var headerDiv = $('<div class="headerDiv"></div>');
            var footerDiv = $('<div class="footerDiv"></div>');

            /* GET AVATAR IF IT EXISTS */
            function updateAvatar(logo) {
              if (!logo) {
                headerDiv.append('<img class="avatar" height="75px" width="75px" src="https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_960_720.png">');
              } else {
                headerDiv.append('<img class="avatar" height="75px" width="75px" src=' + logo + '>');
              }
              footerDiv.hide();
            }
            /*SETUP DOM STRUCTURE AND STATUS COLOR */
            function divSetup (status){
              listItem.addClass(status);
              userList.append(col);
              col.append(listItem);
              listItem.append(headerDiv);
              listItem.append(footerDiv);
              updateAvatar(avatarData.logo);
            }
            /* IF USER NOT ONLINE */
            if (!userData.stream) {
              divSetup('offline');
              headerDiv.append('<h3><i class="fa fa-level-down"></i> ' + user + '</h3>');
              headerDiv.append('<button class="reveal"><i class="fa fa-info-circle"></i></button>');
              footerDiv.append('<p>' + user + ' is currently not online</p>');
              footerDiv.append('<p><a href="' + userData._links.self + '">VISIT</a></p>');
              return;
            }
            /* IF USER ONLINE */
            divSetup('online');
            headerDiv.append('<h3 class="online"><i class="fa fa-level-up"></i> ' + user + '</h3>');
            headerDiv.append('<button class="reveal"><i class="fa fa-info-circle"></i></button>');
            footerDiv.append('<p><img class="preview-image" src=' + userData.stream.preview.medium + '></p>');
            footerDiv.append('<p>' + user + 'is currently playing: ' + userData.stream.game + '</p>');
            footerDiv.append('<p><a href="' + userData.stream._links.self + '">VISIT</a></p>');
          }
        });
      }
    });
  });

   /* EVENT HANDLERS */
  body.on('mouseover', '.reveal', function(){
    infoWindow.empty();
    var content = $(this).parentsUntil('.col-md-4').children('.footerDiv').html();
    infoWindow.append(content);
    infoWindow.slideDown('slow');
  })
});
