// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// stores time stamp
let unix = dayjs().unix();

// converts unix timestamp to mm/dd/yyyy format
let unixFormat = dayjs.unix(unix).format("dddd MMMM D, YYYY hh:mm:ss a");

$(document).ready(function () {
  // create variables
  let currentDayEl = $(`#currentDay`);
  let hourBlockContainerEl = $(`#hour-block-container`);
  let currentHour = dayjs.unix(unix).format("HH");
  let hourBlocks = hourBlockContainerEl.children().toArray();

  // loop through hourBlocks array
  // create variables
  // adds text to hourBlock textArea if text found for that hour in LocalStorage
  // adds eventListener to button - adds hourBlock text to localStorage
  $(hourBlocks).each(function () {
    let button = $(this).find("button");
    let textArea = $(this).find("textarea");
    let savedHour = $(this).attr("id").substring(5);

    if (localStorage.getItem("hour-block") !== null) {
      let localStorageArr = JSON.parse(localStorage.getItem("hour-block"));
      let foundHour = localStorageArr.find((obj) => obj.hour === savedHour);
      if (foundHour !== undefined) {
        textArea.text(foundHour.text);
      }
    }

    button.on("click", function () {
      if (localStorage.getItem("hour-block") !== null) {
        let localStorageArr = JSON.parse(localStorage.getItem("hour-block"));
        let toSave = {
          hour: savedHour,
          text: textArea.val(),
        };

        let foundHour = localStorageArr.find((obj) => obj.hour === savedHour);
        if (foundHour !== undefined) {
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
    });
  });

  // styles the hourBlocks
  $(hourBlocks).each(function () {
    let hour = Number($(this).attr("id").substring(5));
    if (hour < currentHour) {
      $(this).attr("class", "row time-block past");
    } else if (hour > currentHour) {
      $(this).attr("class", "row time-block future");
    } else {
      $(this).attr("class", "row time-block present");
    }
  });

  // starts timer and updates currentDayEl
  let timerInterval = setInterval(function () {
    let today = dayjs();
    currentDayEl.text(today.format("dddd MMMM D, YYYY hh:mm:ss a"));
  }, 1000);
});
