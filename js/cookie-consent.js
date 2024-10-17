document.addEventListener("DOMContentLoaded", function () {
  const cookieConsent = document.getElementById("cookieConsent");
  const acceptCookie = document.getElementById("acceptCookie");

  if (!localStorage.getItem("cookieConsent")) {
    cookieConsent.style.display = "block";
  }

  acceptCookie.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "true");
    cookieConsent.style.display = "none";
  });
});
