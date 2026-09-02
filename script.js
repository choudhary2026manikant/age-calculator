const dateOfBirthInput =
  document.getElementById("dateOfBirth");

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
  today
) {

  let years =
    today.getFullYear() -
    birthDate.getFullYear();

  let months =
    today.getMonth() -
    birthDate.getMonth();

  let days =
    today.getDate() -
    birthDate.getDate();


  /*
    Borrow days from previous month.
  */
  if (days < 0) {

    months--;

    const previousMonth =
      today.getMonth() - 1;

    const previousMonthYear =
      previousMonth < 0
        ? today.getFullYear() - 1
        : today.getFullYear();

    const normalizedMonth =
      previousMonth < 0
        ? 11
        : previousMonth;

    days += getDaysInMonth(
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
  today
) {

  const birthMonth =
    birthDate.getMonth();

  const birthDay =
    birthDate.getDate();

  let birthdayYear =
    today.getFullYear();


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
  if (nextBirthday < today) {

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
function formatDate(date) {

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
function formatNumber(number) {

  return new Intl.NumberFormat(
    "en-IN"
  ).format(number);
}


/*
  Show error message.
*/
function showError(message) {

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
  today
) {

  const millisecondsPerDay =
    1000 * 60 * 60 * 24;


  /*
    Total number of days lived.
  */
  const totalMilliseconds =
    today - birthDate;

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
    Approximate total months.
    
    We use the exact age calculation
    plus the remaining partial month.
  */
  const age =
    calculateExactAge(
      birthDate,
      today
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
  Main age calculation.
*/
function calculateAge() {

  clearError();


  /*
    Check date selection.
  */
  if (!dateOfBirthInput.value) {

    showError(
      "कृपया अपनी जन्म तारीख चुनें।"
    );

    return;
  }


  /*
    Convert YYYY-MM-DD
    into a local date.
  */
  const parts =
    dateOfBirthInput.value
      .split("-")
      .map(Number);


  const birthDate =
    createDate(
      parts[0],
      parts[1] - 1,
      parts[2]
    );


  const today =
    getToday();


  /*
    Prevent future dates.
  */
  if (birthDate > today) {

    showError(
      "जन्म तारीख भविष्य की नहीं हो सकती।"
    );

    return;
  }


  /*
    Calculate exact age.
  */
  const age =
    calculateExactAge(
      birthDate,
      today
    );


  yearsElement.textContent =
    age.years;

  monthsElement.textContent =
    age.months;

  daysElement.textContent =
    age.days;


  /*
    Calculate next birthday.
  */
  const nextBirthday =
    getNextBirthday(
      birthDate,
      today
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
      today,
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
      today
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
    Clear date.
  */
  dateOfBirthInput.value =
    "";


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