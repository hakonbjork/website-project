document.addEventListener("readystatechange", function (event) {
  if (event.target.readyState === "interactive") {
    // site interactive
  }
});

function checkIfWeHaveSomBookingWeCanShow() {
  return true;
}
