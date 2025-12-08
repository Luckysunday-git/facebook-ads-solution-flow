// Show loading
function showLoading() {
  document.getElementById("loadingOverlay").style.display = "flex";
}

// Hide loading
function hideLoading() {
  document.getElementById("loadingOverlay").style.display = "none";
}

// Attach to all option buttons
document.querySelectorAll(".option-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    showLoading();

    // You can delay hiding to simulate real loading, or hide it in your navigation logic
    setTimeout(() => {
      hideLoading(); // remove this if you hide manually when page changes
    }, 500);
  });
});

document.querySelectorAll(".adv-item").forEach((btn) => {
  btn.addEventListener("click", () => {
    showLoading();

    // You can delay hiding to simulate real loading, or hide it in your navigation logic
    setTimeout(() => {
      hideLoading(); // remove this if you hide manually when page changes
    }, 500);
  });
});
