document.addEventListener("readystatechange", function (event) {
  if (event.target.readyState === "interactive") {
    document.querySelector("#no-js").classList.toggle("hidden");
    fetchBookingShowContent();
  }
});

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

function formatDate(dateString) {
  const months = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const month = months[dateString.slice(5, 7)];
  const date = dateString.slice(8, 10);
  const year = dateString.slice(0, 4);
  let prefix = "th";
  if (+date == 1) {
    prefix = "st";
  } else if (+date == 2) {
    prefix = "nd";
  } else if (+date == 3) {
    prefix = "rd";
  }

  return `${month} ${+date}${prefix}, ${year}`;
}
