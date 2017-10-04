$(document).ready(function () {
    $("#weatherButton").click(function (e)
    {
        var state = $("#state").val();
        var city = $("#city").val();
        if (typeof city !== 'undefined')
            {
                console.log(state + " " + city);
                e.preventDefault();
                $("#displayCity").text(city);
                var myurl= "https://api.wunderground.com/api/c895111acd6a43eb/geolookup/conditions/q/" + state + "/" + city;
                myurl += ".json";
                console.log(myurl);
                var everything;
                $.ajax({
                url : myurl,
                dataType : "json",
                success : function(parsed_json)
                    {
                          console.log(parsed_json);
                          var location = parsed_json['location']['city'];
                          var temp_string = parsed_json['current_observation']['temperature_string'];
                          var current_weather = parsed_json['current_observation']['weather'];
                          var wind = parsed_json['current_observation']['wind_string']
                          var local_time = parsed_json['current_observation']['local_time_rfc822'];
                          everything = "<ul>";
                          everything += "<li>Location: "+location;
                          everything += "<li>Temperature: "+temp_string;
                          everything += "<li>Weather: "+current_weather;
                          everything += "<li>Wind: "+wind;
                          everything += "<li>Local Time: "+local_time;
                          everything += "</ul>";
                          $("#weather").html(everything);
                          var key_word = "";
                          key_word += (current_weather.replace(" ","+")+"+weather");
                          console.log(key_word);

                           $.ajax(
                                {
                                url : "https://api.giphy.com/v1/gifs/random?api_key=BQyVLA2oJkVjTPhASINmJToTYrUtAR24&tag="+key_word+"&rating=G",
                                dataType : "json",
                                success : function(parsed_json)
                                    {
                                        console.log(parsed_json);
                                        var image = parsed_json['data']['image_original_url'];
                                        console.log(image);
                                        $("#image").src=image;
                                        console.log($("#image").src);
                                    }
                                });

                    }
                });
            }
        else
            {
                console.log("state: " + state + " " + "city:" + city);
                e.preventDefault();
                var myurl= "https://api.wunderground.com/api/c895111acd6a43eb/geolookup/conditions/q/" + state + "/" +city;
                myurl += ".json";
                console.log(myurl);
            }

    });
    $.ajax( {
              url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
              success: function(data) {
                var post = data.shift(); // The data is an array of posts. Grab the first one.
                $('#quote-title').text(post.title);
                $('#quote-content').html(post.content);

                // If the Source is available, use it. Otherwise hide it.
                if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
                  $('#quote-source').html('Source:' + post.custom_meta.Source);
                } else {
                  $('#quote-source').text('');
                }
              },
              cache: false
            });

}); 