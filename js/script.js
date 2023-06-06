// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// stores time stamp
let unix = dayjs().unix();

// converts unix timestamp to mm/dd/yyyy format
let unixFormat = dayjs.unix(unix).format("dddd, MMMM D");
let currentHour = dayjs.unix(unix).format("HH");

let currentDayEl = $("#currentDay");
let containerEl = $("#hour-block-container");
let hourElements = containerEl.children().toArray();

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  hourElements.forEach((hour) => {});
  console.log(hourElements[1].getAttribute("id").substring(5));

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  currentDayEl.text(unixFormat);
});
