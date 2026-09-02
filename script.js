const dateOfBirthInput =
  document.getElementById("dateOfBirth");

const asOnDateInput =
  document.getElementById("asOnDate");

const calculateBtn =
  document.getElementById("calculateBtn");

const resetBtn =
  document.getElementById("resetBtn");


/*
  Age result elements
*/

const yearsElement =
  document.getElementById("years");

const monthsElement =
  document.getElementById("months");

const daysElement =
  document.getElementById("days");


/*
  Calculation date
*/

const calculatedAsOnElement =
  document.getElementById("calculatedAsOn");


/*
  Birthday information
*/

const nextBirthdayElement =
  document.getElementById("nextBirthday");

const daysUntilBirthdayElement =
  document.getElementById("daysUntilBirthday");


/*
  Error message
*/

const errorMessage =
  document.getElementById("errorMessage");


/*
  Life statistics elements
*/

const totalDaysElement =
  document.getElementById("totalDays");

const totalWeeksElement =
  document.getElementById("totalWeeks");

const totalMonthsElement =
  document.getElementById("totalMonths");

const totalHoursElement =
  document.getElementById("totalHours");

const totalMinutesElement =
  document.getElementById("totalMinutes");

const totalSecondsElement =
  document.getElementById("totalSeconds");


/*
  Get today's date without time.
*/

function getToday() {

  const now = new Date();

  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
}


/*
  Format date as YYYY-MM-DD
  for date input fields.
*/

function formatInputDate(date) {

  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1
    ).padStart(2, "0");

  const day =
    String(
      date.getDate()
    ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


/*
  Create a local date.
*/

function createDate(
  year,
  month,
  day
) {

  return new Date(
    year,
    month,
    day
  );
}


/*
  Convert date input value
  into a local date.
*/

function parseInputDate(
  value
) {

  const parts =
    value
      .split("-")
      .map(Number);

  return createDate(
    parts[0],
    parts[1] - 1,
    parts[2]
  );
}


/*
  Get number of days in a month.
*/

function getDaysInMonth(
  year,
  month
) {

  return new Date(
    year,
    month + 1,
    0
  ).getDate();
}


/*
  Calculate exact age.
*/

function calculateExactAge(
  birthDate,
  targetDate
) {

  let years =
    targetDate.getFullYear() -
    birthDate.getFullYear();

  let months =
    targetDate.getMonth() -
    birthDate.getMonth();

  let days =
    targetDate.getDate() -
    birthDate.getDate();


  /*
    Borrow days from previous month.
  */

  if (days < 0) {

    months--;

    const previousMonth =
      targetDate.getMonth() - 1;

    const previousMonthYear =
      previousMonth < 0
        ? targetDate.getFullYear() - 1
        : targetDate.getFullYear();

    const normalizedMonth =
      previousMonth < 0
        ? 11
        : previousMonth;

    days +=
      getDaysInMonth(
        previousMonthYear,
        normalizedMonth
      );
  }


  /*
    Borrow one year.
  */

  if (months < 0) {

    years--;

    months += 12;
  }


  return {
    years,
    months,
    days
  };
}


/*
  Calculate next birthday
  relative to target date.
*/

function getNextBirthday(
  birthDate,
  targetDate
) {

  const birthMonth =
    birthDate.getMonth();

  const birthDay =
    birthDate.getDate();

  let birthdayYear =
    targetDate.getFullYear();


  /*
    Handle February 29 birthdays.
  */

  let birthdayDay =
    Math.min(
      birthDay,
      getDaysInMonth(
        birthdayYear,
        birthMonth
      )
    );


  let nextBirthday =
    createDate(
      birthdayYear,
      birthMonth,
      birthdayDay
    );


  /*
    If birthday has passed,
    use next year.
  */

  if (nextBirthday < targetDate) {

    birthdayYear++;

    birthdayDay =
      Math.min(
        birthDay,
        getDaysInMonth(
          birthdayYear,
          birthMonth
        )
      );

    nextBirthday =
      createDate(
        birthdayYear,
        birthMonth,
        birthdayDay
      );
  }


  return nextBirthday;
}


/*
  Calculate difference between
  two dates in complete days.
*/

function getDaysBetween(
  date1,
  date2
) {

  const millisecondsPerDay =
    1000 * 60 * 60 * 24;

  return Math.round(
    (date2 - date1) /
    millisecondsPerDay
  );
}


/*
  Format date for display.
*/

function formatDate(
  date
) {

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }
  );
}


/*
  Format large numbers with commas.
*/

function formatNumber(
  number
) {

  return new Intl.NumberFormat(
    "en-IN"
  ).format(number);
}


/*
  Show error message.
*/

function showError(
  message
) {

  errorMessage.textContent =
    message;
}


/*
  Clear error message.
*/

function clearError() {

  errorMessage.textContent =
    "";
}


/*
  Calculate Life Statistics.
*/

function calculateLifeStatistics(
  birthDate,
  targetDate
) {

  const millisecondsPerDay =
    1000 * 60 * 60 * 24;


  /*
    Total number of days lived.
  */

  const totalMilliseconds =
    targetDate - birthDate;

  const totalDays =
    Math.floor(
      totalMilliseconds /
      millisecondsPerDay
    );


  /*
    Total weeks.
  */

  const totalWeeks =
    Math.floor(
      totalDays / 7
    );


  /*
    Total months.
  */

  const age =
    calculateExactAge(
      birthDate,
      targetDate
    );

  const totalMonths =
    age.years * 12 +
    age.months;


  /*
    Total hours.
  */

  const totalHours =
    totalDays * 24;


  /*
    Total minutes.
  */

  const totalMinutes =
    totalHours * 60;


  /*
    Total seconds.
  */

  const totalSeconds =
    totalMinutes * 60;


  return {
    totalDays,
    totalWeeks,
    totalMonths,
    totalHours,
    totalMinutes,
    totalSeconds
  };
}


/*
  Display Life Statistics.
*/

function displayLifeStatistics(
  statistics
) {

  totalDaysElement.textContent =
    formatNumber(
      statistics.totalDays
    );

  totalWeeksElement.textContent =
    formatNumber(
      statistics.totalWeeks
    );

  totalMonthsElement.textContent =
    formatNumber(
      statistics.totalMonths
    );

  totalHoursElement.textContent =
    formatNumber(
      statistics.totalHours
    );

  totalMinutesElement.textContent =
    formatNumber(
      statistics.totalMinutes
    );

  totalSecondsElement.textContent =
    formatNumber(
      statistics.totalSeconds
    );
}


/*
  Set today's date as default
  Age as on Date.
*/

function setDefaultAsOnDate() {

  const today =
    getToday();

  asOnDateInput.value =
    formatInputDate(
      today
    );
}


/*
  Main age calculation.
*/

function calculateAge() {

  clearError();


  /*
    Check date of birth.
  */

  if (!dateOfBirthInput.value) {

    showError(
      "कृपया अपनी जन्म तारीख चुनें।"
    );

    return;
  }


  /*
    Check Age as on Date.
  */

  if (!asOnDateInput.value) {

    showError(
      "कृपया Age as on Date चुनें।"
    );

    return;
  }


  /*
    Convert dates.
  */

  const birthDate =
    parseInputDate(
      dateOfBirthInput.value
    );

  const targetDate =
    parseInputDate(
      asOnDateInput.value
    );


  /*
    Prevent invalid date range.
  */

  if (birthDate > targetDate) {

    showError(
      "Age as on Date, जन्म तारीख के बाद या उसी दिन की होनी चाहिए।"
    );

    return;
  }


  /*
    Calculate exact age.
  */

  const age =
    calculateExactAge(
      birthDate,
      targetDate
    );


  yearsElement.textContent =
    age.years;

  monthsElement.textContent =
    age.months;

  daysElement.textContent =
    age.days;


  /*
    Display calculation date.
  */

  calculatedAsOnElement.textContent =
    formatDate(
      targetDate
    );


  /*
    Calculate next birthday.
  */

  const nextBirthday =
    getNextBirthday(
      birthDate,
      targetDate
    );


  nextBirthdayElement.textContent =
    formatDate(
      nextBirthday
    );


  /*
    Calculate days until birthday.
  */

  const daysRemaining =
    getDaysBetween(
      targetDate,
      nextBirthday
    );


  if (daysRemaining === 0) {

    daysUntilBirthdayElement.textContent =
      "🎉 आज आपका जन्मदिन है!";

  } else {

    daysUntilBirthdayElement.textContent =
      `${daysRemaining} दिन`;
  }


  /*
    Calculate Life Statistics.
  */

  const statistics =
    calculateLifeStatistics(
      birthDate,
      targetDate
    );


  /*
    Display Life Statistics.
  */

  displayLifeStatistics(
    statistics
  );
}


/*
  Reset complete calculator.
*/

function resetCalculator() {

  /*
    Clear date of birth.
  */

  dateOfBirthInput.value =
    "";


  /*
    Reset Age as on Date
    to today.
  */

  setDefaultAsOnDate();


  /*
    Reset age.
  */

  yearsElement.textContent =
    "0";

  monthsElement.textContent =
    "0";

  daysElement.textContent =
    "0";


  /*
    Reset calculation date.
  */

  calculatedAsOnElement.textContent =
    "—";


  /*
    Reset birthday information.
  */

  nextBirthdayElement.textContent =
    "—";

  daysUntilBirthdayElement.textContent =
    "—";


  /*
    Reset Life Statistics.
  */

  totalDaysElement.textContent =
    "0";

  totalWeeksElement.textContent =
    "0";

  totalMonthsElement.textContent =
    "0";

  totalHoursElement.textContent =
    "0";

  totalMinutesElement.textContent =
    "0";

  totalSecondsElement.textContent =
    "0";


  /*
    Remove error.
  */

  clearError();


  /*
    Focus date field.
  */

  dateOfBirthInput.focus();
}


/*
  Calculate button.
*/

calculateBtn.addEventListener(
  "click",
  calculateAge
);


/*
  Reset button.
*/

resetBtn.addEventListener(
  "click",
  resetCalculator
);


/*
  Set default date on page load.
*/

setDefaultAsOnDate();