// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// stores time stamp
let unix = dayjs().unix();

// converts unix timestamp to mm/dd/yyyy format
let unixFormat = dayjs.unix(unix).format("dddd MMMM D, YYYY hh:mm:ss a");

// localStorage.setItem("hour-block", JSON.stringify([]));

$(document).ready(function () {
  let currentDayEl = $(`#currentDay`);
  let hourBlockContainerEl = $(`#hour-block-container`);
  let currentHour = dayjs.unix(unix).format("HH");
  let hourBlocks = hourBlockContainerEl.children().toArray();
  //
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  $(hourBlocks).each(function () {
    let button = $(this).find("button");
    let textArea = $(this).find("textarea");
    let savedHour = $(this).attr("id").substring(5);

    button.on("click", function () {
      if (localStorage.getItem("hour-block") !== null) {
        let localStorageArr = JSON.parse(localStorage.getItem("hour-block"));
        let toSave = {
          hour: savedHour,
          text: textArea.val(),
        };

        let foundHour = localStorageArr.find((obj) => obj.hour === savedHour);
        if (foundHour !== null) {
          let newLocalStorageArr = localStorageArr.filter(function (element) {
            return element !== foundHour;
          });
          newLocalStorageArr.push(toSave);
          localStorage.setItem("hour-block", JSON.stringify(newLocalStorageArr));
        } else {
          localStorageArr.push(toSave);
          localStorage.setItem("hour-block", JSON.stringify([localStorageArr]));
        }
      } else {
        localStorage.setItem("hour-block", JSON.stringify([toSave]));
      }

      // if (localStorage.getItem("hour-block")) {
      //   let hours = JSON.parse(localStorage.getItem("hour-block"));
      //   let toSave = {
      //     hourKey: savedHour,
      //     text: textArea.val(),
      //   };

      //   hours.push(toSave);
      //   localStorage.setItem("hour-block", JSON.stringify(hours));
      // } else {
      //   localStorage.setItem("hour-block", JSON.stringify([]));
      // }
    });
  });
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  hourBlocks.forEach((hourBlock) => {
    let hour = Number(hourBlock.getAttribute("id").substring(5));
    if (hour < currentHour) {
      hourBlock.setAttribute("class", "row time-block past");
    } else if (hour > currentHour) {
      hourBlock.setAttribute("class", "row time-block future");
    } else {
      hourBlock.setAttribute("class", "row time-block present");
    }
  });
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  let timerInterval = setInterval(function () {
    let today = dayjs();
    currentDayEl.text(today.format("dddd MMMM D, YYYY hh:mm:ss a"));
  }, 1000);
});

// let currentHour = "";

// let currentDayEl = $("#currentDay");
// let containerEl = $("#hour-block-container");
// let hourElements = containerEl.children().toArray();

// function setTime() {
//   let timerInterval = setInterval(function () {
//     let today = dayjs();
//     currentDayEl.text(today.format("dddd MMMM D, YYYY hh:mm:ss a"));
//     currentHour = dayjs.unix(unix).format("HH");
//     updateHourBlocks();
//   }, 1000);
// }

// function updateHourBlocks() {
//   hourElements.forEach((hour) => {
//     let hourBlock = Number(hour.getAttribute("id").substring(5));
//     if (hourBlock < currentHour) {
//       hour.setAttribute("class", "row time-block past");
//     } else if (hourBlock > currentHour) {
//       hour.setAttribute("class", "row time-block future");
//     } else {
//       hour.setAttribute("class", "row time-block present");
//     }
//   });
// }

// hourElements.forEach((hour) => {
//   let buttonEl = hour.querySelector(".btn");
//   buttonEl.addEventListener("click", function () {
//     // does not work
//     console.log("test");
//   });
// });

// function init() {
//   setTime();
// }
