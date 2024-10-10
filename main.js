// Target the error modal and the hearts
const errorModal = document.getElementById('modal');
const hearts = document.querySelectorAll('.like-glyph');

// Add event listeners to each heart
hearts.forEach(heart => {
  heart.addEventListener('click', () => {
    mimicServerCall()
      .then(() => {
        // Successful response: Toggle heart between full and empty
        if (heart.innerText === '♡') {
          heart.innerText = '♥';
          heart.classList.add('activated-heart');
        } else {
          heart.innerText = '♡';
          heart.classList.remove('activated-heart');
        }
      })
      .catch(error => {
        // Failed response: Show error modal with message
        errorModal.classList.remove('hidden');
        const errorMessage = document.getElementById('modal-message');
        errorMessage.innerText = error;

        // Hide modal after 3 seconds
        setTimeout(() => {
          errorModal.classList.add('hidden');
        }, 3000);
      });
  });
});

// Mock server function (provided)
function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      // Randomly succeed or fail
      const isRandomFailure = Math.random() < .2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
