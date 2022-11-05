// Functionality shared between several pages

// function used to format dates to a more human-readable format
// from this: 2023-02-27
// to this: February 27th, 2023
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
