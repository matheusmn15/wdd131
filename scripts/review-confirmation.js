const query = new URLSearchParams(window.location.search);
const productId = query.get("product");
const rating = query.get("rating");
const installationDate = query.get("installationDate");
const submittedReview = productId && rating && installationDate;
const reviewCountKey = "productReviewCount";
let reviewCount = Number(localStorage.getItem(reviewCountKey)) || 0;

if (submittedReview) {
  reviewCount += 1;
  localStorage.setItem(reviewCountKey, reviewCount);

  const productsById = {
    "fc-1888": "flux capacitor",
    "fc-2050": "power laces",
    "fs-1987": "time circuits",
    "ac-2000": "low voltage reactor",
    "jj-1969": "warp equalizer"
  };

  document.getElementById("confirmation-message").textContent = "Thank you for sharing your product review.";
  document.getElementById("submitted-product").textContent = productsById[productId] || "Unknown product";
  document.getElementById("submitted-rating").textContent = `${rating} out of 5 stars`;
  document.getElementById("submitted-date").textContent = installationDate;
  document.getElementById("review-details").hidden = false;
}

document.getElementById("review-count").textContent = reviewCount;