// Step 1: Wait for the DOM to be ready
$(document).ready(function() {

    // Step 2: Attach a click event listener to elements with the class 'delete-button'
    $('.delete-button').on('click', function(e) {
        // Step 3: Prevent the default action of the event (e.g., navigating to a link)
        e.preventDefault();

        // Step 4: Retrieve the post ID data attribute from the clicked button
        var postId = $(this).data("post-id")
        
        // Step 5: Store a reference to the closest post container element with the class of "post-gallery". This container element would be deleted from the web page later on. The $ before postElement is a naming convention to indicate that the variable is a jQuery object. However, it is not compulsory to use this $ sign.
        var $postElement = $(this).closest(".post-gallery");
        
        // Step 6: Confirm with the user before proceeding with deletion
        if(confirm('Are you sure you want to delete this post?')) {
            // Step 7: Send the DELETE request using jQuery's ajax function - the "ajax" function is a core jQuery method that allows you to perform asynchronous HTTP (Ajax) requests. With Ajax, web applications can send and retrieve data from a server asynchronously (in the background) without interfering with the display and behavior of the existing page.
            // $.ajax({
            //     url: '/posts/deletePost/' + postId, // The endpoint for the deletion
            //     type: 'DELETE',
            //     success: function(result) {
            //         // Step 8: On success, remove the post element from the DOM
            //         $postElement.remove();
            //         // Step 9: Alert the user of the successful deletion
            //         alert('Post deleted successfully');
            //     },
            //     error: function(xhr, status, error) {
            //         // Step 10: On error, alert the user. Please note that the 3 parameters in the function are not required, they are just convenient for you to track the error information if incurring errors.
            //         alert('Error deleting post: ' + error);
            //     }
            // });
            $.ajax({
                url: `/posts/deletePost/${postId}`,
                type: "DELETE",
                success: function (result) {
                    $postElement.remove();
                    if($(".post-gallery").length === 0) {   // Check if there are no more posts
                        $(".display-post").append("<h2>No post right now.</h2>");    // Append the "No post right now." message to the display-post section
                    };
                    alert("Post deleted successfully.");
                },
                error: function (xhr, status, error) {
                    alert("Error when deleting the post: " + error);
                }

            });
        }
    });
});