document.addEventListener("readystatechange", function (event) {
  if (event.target.readyState === "interactive") {
    document.querySelector("#no-js").classList.toggle("hidden");
    fetchBookingShowContent();
  }
});

// Gets booking information from localstorage and displays it if avaiable
function fetchBookingShowContent() {
  const name = localStorage.getItem("booking-name");
  const number = localStorage.getItem("booking-number");
  const mail = localStorage.getItem("booking-maill");
  const numGuests = localStorage.getItem("booking-numGuests");
  const startDate = localStorage.getItem("booking-startDate");
  const endDate = localStorage.getItem("booking-endDate");

  if (name && number && mail && numGuests && startDate && endDate) {
    document.querySelector("#booking-exist").classList.toggle("hidden");
    document.querySelector("#booking-exist li:nth-child(1)").innerHTML += name;
    document.querySelector("#booking-exist li:nth-child(2)").innerHTML +=
      number;
    document.querySelector("#booking-exist li:nth-child(3)").innerHTML += mail;
    document.querySelector("#booking-exist li:nth-child(4)").innerHTML +=
      numGuests;
    document.querySelector("#booking-exist li:nth-child(5)").innerHTML +=
      formatDate(startDate);
    document.querySelector("#booking-exist li:nth-child(6)").innerHTML +=
      formatDate(endDate);
  } else {
    document.querySelector("#no-booking-exist").classList.toggle("hidden");
  }
}
