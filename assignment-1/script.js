const selector = document.getElementById("date-filter");
const bankDataContainer = document.getElementById("bank-data");
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

function fiterByYesterday(eventsArray, yesterdayDate) {
  return eventsArray.filter((event) => {
    let eventDate = new Date(event.date);
    return eventDate === yesterdayDate;
  });
}

function filterByLastWeek(eventsArray) {}

function filterByLastMonth(eventsArray) {}

//add event listener for changing option
selector.addEventListener("change", function (e) {
  const currentValue = e.target.value;
  if (currentValue === "yesterday") {
    let yesterdayDate = new Date(Date.now() - 864e5);
    let filteredData = fiterByYesterday(bankData, yesterdayDate);
    console.log(filteredData);
  } else if (currentValue === "last-week") {
    console.log("last week");
  } else if (currentValue === "last-month") {
    console.log("last month");
  }
});
