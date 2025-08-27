// Grab form and reviews container
const reviewForm = document.getElementById('reviewForm');
const reviewsContainer = document.getElementById('reviewsContainer');

// Load reviews from localStorage or start with empty array
let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

// Function to display all reviews
function displayReviews() {
  reviewsContainer.innerHTML = '';

  if (reviews.length === 0) {
    reviewsContainer.innerHTML = `<p>No reviews yet. Be the first to leave one!</p>`;
    return;
  }

  reviews.forEach(review => {
    const reviewCard = document.createElement('div');
    reviewCard.classList.add('review-card');
    reviewCard.innerHTML = `
      ${review.photo ? `<img src="${review.photo}" alt="${review.name}">` : ''}
      <div>
        <h4>${review.name}</h4>
        <div class="stars">${'⭐'.repeat(review.rating)}</div>
        <p>${review.comment}</p>
      </div>
    `;
    reviewsContainer.appendChild(reviewCard);
  });
}

// Handle form submission
reviewForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const rating = parseInt(document.getElementById('rating').value);
  const comment = document.getElementById('comment').value.trim();
  const photoInput = document.getElementById('photo');

  if (!name || !rating || !comment) {
    alert('Please fill out all required fields!');
    return;
  }

  const newReview = { name, rating, comment, photo: '' };

  if (photoInput.files && photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      newReview.photo = e.target.result; // Convert image to Base64
      saveReview(newReview);
    };
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    saveReview(newReview);
  }
});

// Save review and update display
function saveReview(review) {
  reviews.push(review);
  localStorage.setItem('reviews', JSON.stringify(reviews));
  displayReviews();
  reviewForm.reset();
}

// Display reviews immediately on page load
displayReviews();
