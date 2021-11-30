const selector = document.getElementById("date-filter");
const bankDataContainer = document.getElementById("bank-data");
const dateSelector = document.getElementById("date-selector");
const dateForm = document.getElementById("form-1");
const todaysDate = new Date();
let bankData = [];

async function fetchData() {
  let result = await fetch("https://www.gov.uk/bank-holidays.json");
  let data = await result.json();
  let eventTitles = Object.keys(data);
  let allEvents = [];
  eventTitles.forEach((dataKey) => {
    allEvents.push(...data[dataKey].events);
  });
  bankData = allEvents;
  bankDataContainer.innerHTML = `<ul id="bank-data-list">
  ${bankData.map((item) => {
    return `<li>${item.title} - ${item.date}</li>`;
  })}
</ul>`;
}

document.onload = fetchData();

function fiterByYesterday(eventsArray) {
  let yesterdayDate = new Date(todaysDate);
  yesterdayDate.setDate(todaysDate.getDate() - 1);
  return eventsArray.filter((event) => {
    let eventDate = new Date(event.date);
    return eventDate.getTime() === yesterdayDate.getTime();
  });
}

function filterByLastWeek(eventsArray) {
  let dateWeekAgo = new Date(todaysDate);
  dateWeekAgo.setDate(todaysDate.getDate() - 7);
  return eventsArray.filter((event) => {
    let eventDate = new Date(event.date);
    if (
      eventDate.getTime() >= dateWeekAgo.getTime() &&
      eventDate.getTime() < todaysDate.getTime()
    )
      return true;
    else return false;
  });
}

function filterByLastMonth(eventsArray) {
  let dateMonthAgo = new Date(todaysDate);
  dateMonthAgo.setDate(todaysDate.getDate() - 30);
  return eventsArray.filter((event) => {
    let eventDate = new Date(event.date);
    if (
      eventDate.getTime() >= dateMonthAgo.getTime() &&
      eventDate.getTime() < todaysDate.getTime()
    )
      return true;
    else return false;
  });
}

//add event listener for changing option
selector.addEventListener("change", function (e) {
  const currentValue = e.target.value;
  let filteredData = [];
  if (currentValue === "yesterday") {
    filteredData = fiterByYesterday(bankData);
  } else if (currentValue === "last-week") {
    filteredData = filterByLastWeek(bankData);
  } else if (currentValue === "last-month") {
    filteredData = filterByLastMonth(bankData);
  }
  bankDataContainer.innerHTML = `<ul id="bank-data-list">
  ${filteredData.map((item) => {
    return `<li>${item.title} - ${item.date}</li>`;
  })}
</ul>`;
});

function filterByCustomDate(eventsArray, givenDate) {
  return eventsArray.filter((event) => {
    let eventDate = new Date(event.date);
    console.log(eventDate);
    return eventDate.getTime() === givenDate.getTime();
  });
}

dateForm.onsubmit = (e) => {
  e.preventDefault();
  let selectedDate = new Date(dateSelector.value);
  let filteredData = filterByCustomDate(bankData, selectedDate);
  bankDataContainer.innerHTML = `<ul id="bank-data-list">
  ${filteredData.map((item) => {
    return `<li>${item.title} - ${item.date}</li>`;
  })}
</ul>`;
};
