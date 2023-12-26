document.addEventListener('DOMContentLoaded', function () {
    const feedbackForm = document.getElementById('feedbackForm');
  
    feedbackForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission
  
      const formData = new FormData(feedbackForm);
  
      fetch('/submit', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.text())
        .then(message => {
          console.log(message);
          // You can update the UI or show a success message here
        })
        .catch(error => {
          console.error('Error submitting feedback:', error);
          // Handle errors or show an error message to the user
        });
    });
  });
  