function showFeedback(postResponse) {
    console.log('post success');
    // console.log(postResponse);
}


function handleError(err) {
    console.log('Oh no! Error:');
    console.log(err);
}

$(document).ready(function() {
    var buttons = Array.from(document.querySelectorAll('#save-the-recipe'));
    buttons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            let recipeId = document.getElementById("recipe-id").value;
            console.log(recipeId);
            $.ajax({
                type: 'POST',
                url: '/save-recipe',
                data: {
                    recipeId
                },
                success: showFeedback,
                error: handleError
            });
            location.reload();
        });
    });

});
