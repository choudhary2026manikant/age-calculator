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
  Format a Date object as DD/MM/YYYY.
*/

function formatDisplayDate(date) {

  const day =
    String(
      date.getDate()
    ).padStart(2, "0");

  const month =
    String(
      date.getMonth() + 1
    ).padStart(2, "0");

  const year =
    date.getFullYear();

  return `${day}/${month}/${year}`;
}


/*
  Automatically add / after DD and MM.
*/

function formatDateInputValue(
  value
) {

  let digits =
    value.replace(/\D/g, "");

  digits =
    digits.slice(0, 8);


  if (digits.length > 4) {

    return (
      digits.slice(0, 2) +
      "/" +
      digits.slice(2, 4) +
      "/" +
      digits.slice(4)
    );

  }


  if (digits.length > 2) {

    return (
      digits.slice(0, 2) +
      "/" +
      digits.slice(2)
    );

  }


  return digits;
}


/*
  Handle DD/MM/YYYY typing.
*/

function handleDateInput(
  event
) {

  const input =
    event.target;

  input.value =
    formatDateInputValue(
      input.value
    );
}


/*
  Add automatic date formatting
  to both date fields.
*/

dateOfBirthInput.addEventListener(
  "input",
  handleDateInput
);

asOnDateInput.addEventListener(
  "input",
  handleDateInput
);


/*
  Validate DD/MM/YYYY
  and convert to a local Date.
*/

function parseIndianDate(
  value
) {

  const pattern =
    /^(\d{2})\/(\d{2})\/(\d{4})$/;

  const match =
    value.match(pattern);


  if (!match) {

    return null;
  }


  const day =
    Number(match[1]);

  const month =
    Number(match[2]);

  const year =
    Number(match[3]);


  /*
    Basic range validation.
  */

  if (
    day < 1 ||
    day > 31 ||
    month < 1 ||
    month > 12
  ) {

    return null;
  }


  /*
    Create date.
  */

  const date =
    new Date(
      year,
      month - 1,
      day
    );


  /*
    Check that JavaScript did not
    automatically change the date.
  */

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {

    return null;
  }


  return date;
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
  Calculate next birthday.
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
    new Date(
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
      new Date(
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


  const totalMilliseconds =
    targetDate - birthDate;

  const totalDays =
    Math.floor(
      totalMilliseconds /
      millisecondsPerDay
    );


  const totalWeeks =
    Math.floor(
      totalDays / 7
    );


  const age =
    calculateExactAge(
      birthDate,
      targetDate
    );


  const totalMonths =
    age.years * 12 +
    age.months;


  const totalHours =
    totalDays * 24;


  const totalMinutes =
    totalHours * 60;


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
  Set today's date in DD/MM/YYYY.
*/

function setDefaultAsOnDate() {

  const today =
    getToday();

  asOnDateInput.value =
    formatDisplayDate(
      today
    );
}


/*
  Main age calculation.
*/

function calculateAge() {

  clearError();


  /*
    Check Date of Birth.
  */

  if (!dateOfBirthInput.value) {

    showError(
      "कृपया अपनी जन्म तारीख DD/MM/YYYY में दर्ज करें।"
    );

    return;
  }


  /*
    Check Age as on Date.
  */

  if (!asOnDateInput.value) {

    showError(
      "कृपया Age as on Date DD/MM/YYYY में दर्ज करें।"
    );

    return;
  }


  /*
    Parse dates.
  */

  const birthDate =
    parseIndianDate(
      dateOfBirthInput.value
    );

  const targetDate =
    parseIndianDate(
      asOnDateInput.value
    );


  /*
    Validate Date of Birth.
  */

  if (!birthDate) {

    showError(
      "कृपया सही Date of Birth DD/MM/YYYY में दर्ज करें।"
    );

    return;
  }


  /*
    Validate Age as on Date.
  */

  if (!targetDate) {

    showError(
      "कृपया सही Age as on Date DD/MM/YYYY में दर्ज करें।"
    );

    return;
  }


  /*
    Prevent future Date of Birth.
  */

  const today =
    getToday();

  if (birthDate > today) {

    showError(
      "जन्म तारीख भविष्य की नहीं हो सकती।"
    );

    return;
  }


  /*
    Prevent calculation date
    before Date of Birth.
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
    formatDisplayDate(
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
    formatDisplayDate(
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
      `${formatNumber(daysRemaining)} दिन`;
  }


  /*
    Calculate Life Statistics.
  */

  const statistics =
    calculateLifeStatistics(
      birthDate,
      targetDate
    );


  displayLifeStatistics(
    statistics
  );
}


/*
  Reset calculator.
*/

function resetCalculator() {

  dateOfBirthInput.value =
    "";

  setDefaultAsOnDate();


  yearsElement.textContent =
    "0";

  monthsElement.textContent =
    "0";

  daysElement.textContent =
    "0";


  calculatedAsOnElement.textContent =
    "—";


  nextBirthdayElement.textContent =
    "—";

  daysUntilBirthdayElement.textContent =
    "—";


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


  clearError();

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
  Set today's date on page load.
*/

setDefaultAsOnDate();