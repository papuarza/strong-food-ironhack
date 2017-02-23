console.log("Conectado!")

function showFeedback(postResponse) {
    console.log('post success');
    console.log(postResponse);

    $( ".list-all-recipes" ).empty();
      postResponse.recipes.forEach(function(elem){
        var html = "<div class='col-sm-6 col-md-4 recipe-div'><a class='link-recipe' href=recipes/"+elem._id+"><div class='thumbnail'><div class='img-container'><img src='"+elem.imgUrl+"' alt='' class='img-food'><div class='caption'><h4 class='food-title'>"+elem.name+"</h4><h5 class='food-dificulty'>"+elem.preparation.dificulty+" | </h5><h5 class='food-subtitle'> | Calories: "+elem.nutritionalInfo.calories+"</h5><div class='info-food'><span class='glyphicon glyphicon-thumbs-up icon' aria-hidden='true'></span><h6 class='food-likes'>"+elem.likes+"</h6><span class='glyphicon glyphicon-heart icon' aria-hidden='true'></span><h6 class='food-likes'>"+elem.usersSaved.length+"</h6><span class='glyphicon glyphicon-cutlery icon' aria-hidden='true'></span><h6 class='food-likes'>"+elem.usersDone.length+"</h6></div></div></div></a></div>"
                $(".list-all-recipes").append(html)

    })
}


function handleError(err) {
    console.log('Oh no! Error:');
    console.log(err);
}

$(document).ready(function() {
    var buttons = Array.from(document.querySelectorAll('.filter-type'));
    console.log(buttons)
    var data = {};
    buttons.forEach(function(button) {
        button.addEventListener('change', function(event) {
          event.preventDefault();
          var data = {};
          for(var i=0; i <buttons.length; ++i){
            checkedValue = [];
            if(buttons[i].checked){
              checkedValue[i] = true;
              name = buttons[i].name
              data[name] = checkedValue[i];
          }
        }
        console.log(data);

            $.ajax({
                type: 'POST',
                url: '/show-recipes',
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType: "json",
                success: showFeedback,
                error: handleError
            });
        });
    });

});
