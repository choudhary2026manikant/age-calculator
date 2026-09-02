const dob = document.getElementById("dateOfBirth");
const asOn = document.getElementById("asOnDate");

const years = document.getElementById("years");
const months = document.getElementById("months");
const days = document.getElementById("days");

const calculatedAsOn = document.getElementById("calculatedAsOn");
const nextBirthday = document.getElementById("nextBirthday");

const birthdayHighlight =
  document.getElementById("birthdayHighlight");

const birthdayDate =
  document.getElementById("birthdayDate");

const birthdayDays =
  document.getElementById("daysUntilBirthdayElement");

const totalDays =
  document.getElementById("totalDays");

const totalWeeks =
  document.getElementById("totalWeeks");

const totalMonths =
  document.getElementById("totalMonths");

const totalHours =
  document.getElementById("totalHours");

const totalMinutes =
  document.getElementById("totalMinutes");

const totalSeconds =
  document.getElementById("totalSeconds");

const error =
  document.getElementById("errorMessage");

const calculateButton =
  document.getElementById("calculateBtn");

const resetButton =
  document.getElementById("resetBtn");


function parseDate(value) {

  const match =
    value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  const date =
    new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}


function formatDate(date) {

  return String(date.getDate()).padStart(2, "0")
    + "/"
    + String(date.getMonth() + 1).padStart(2, "0")
    + "/"
    + date.getFullYear();
}


function formatNumber(number) {

  return new Intl.NumberFormat("en-IN")
    .format(number);
}


function daysBetween(first, second) {

  return Math.round(
    (second - first) /
    (1000 * 60 * 60 * 24)
  );
}


function daysInMonth(year, month) {

  return new Date(
    year,
    month + 1,
    0
  ).getDate();
}


function calculateExactAge(birth, target) {

  let y =
    target.getFullYear() -
    birth.getFullYear();

  let m =
    target.getMonth() -
    birth.getMonth();

  let d =
    target.getDate() -
    birth.getDate();


  if (d < 0) {

    m--;

    const previousMonth =
      target.getMonth() - 1;

    const previousYear =
      previousMonth < 0
        ? target.getFullYear() - 1
        : target.getFullYear();

    const normalizedMonth =
      previousMonth < 0
        ? 11
        : previousMonth;

    d += daysInMonth(
      previousYear,
      normalizedMonth
    );
  }


  if (m < 0) {

    y--;
    m += 12;
  }


  return {
    years: y,
    months: m,
    days: d
  };
}


function getNextBirthday(birth, target) {

  const month =
    birth.getMonth();

  const day =
    birth.getDate();

  let year =
    target.getFullYear();


  let birthdayDay =
    Math.min(
      day,
      daysInMonth(year, month)
    );


  let birthday =
    new Date(
      year,
      month,
      birthdayDay
    );


  if (birthday < target) {

    year++;

    birthdayDay =
      Math.min(
        day,
        daysInMonth(year, month)
      );

    birthday =
      new Date(
        year,
        month,
        birthdayDay
      );
  }


  return birthday;
}


function calculate() {

  error.textContent = "";


  const birth =
    parseDate(dob.value);

  const target =
    parseDate(asOn.value);


  if (!birth) {

    error.textContent =
      "कृपया सही जन्म तारीख DD/MM/YYYY में दर्ज करें।";

    return;
  }


  if (!target) {

    error.textContent =
      "कृपया सही Age as on Date DD/MM/YYYY में दर्ज करें।";

    return;
  }


  const today =
    new Date();

  today.setHours(0, 0, 0, 0);


  if (birth > today) {

    error.textContent =
      "जन्म तारीख भविष्य की नहीं हो सकती।";

    return;
  }


  if (birth > target) {

    error.textContent =
      "Age as on Date, जन्म तारीख के बाद या उसी दिन की होनी चाहिए।";

    return;
  }


  const age =
    calculateExactAge(
      birth,
      target
    );


  years.textContent =
    age.years;

  months.textContent =
    age.months;

  days.textContent =
    age.days;


  calculatedAsOn.textContent =
    formatDate(target);


  const birthday =
    getNextBirthday(
      birth,
      target
    );


  nextBirthday.textContent =
    formatDate(birthday);


  const remaining =
    daysBetween(
      target,
      birthday
    );


  birthdayDays.textContent =
    remaining === 0
      ? "🎉 आज आपका जन्मदिन है!"
      : formatNumber(remaining) + " दिन";


  birthdayDate.textContent =
    formatDate(birthday);


  if (remaining === 0) {

    birthdayHighlight.textContent =
      "आज आपका जन्मदिन है!";

  } else {

    const birthdayMonths =
      Math.floor(remaining / 30);

    const birthdayRemainingDays =
      remaining % 30;


    if (
      birthdayMonths > 0 &&
      birthdayRemainingDays > 0
    ) {

      birthdayHighlight.textContent =
        birthdayMonths +
        " महीने " +
        birthdayRemainingDays +
        " दिन";

    } else if (birthdayMonths > 0) {

      birthdayHighlight.textContent =
        birthdayMonths +
        " महीने";

    } else {

      birthdayHighlight.textContent =
        birthdayRemainingDays +
        " दिन";
    }
  }


  const totalLifeDays =
    Math.floor(
      (target - birth) /
      (1000 * 60 * 60 * 24)
    );


  totalDays.textContent =
    formatNumber(totalLifeDays);


  totalWeeks.textContent =
    formatNumber(
      Math.floor(totalLifeDays / 7)
    );


  totalMonths.textContent =
    formatNumber(
      age.years * 12 +
      age.months
    );


  totalHours.textContent =
    formatNumber(
      totalLifeDays * 24
    );


  totalMinutes.textContent =
    formatNumber(
      totalLifeDays * 24 * 60
    );


  totalSeconds.textContent =
    formatNumber(
      totalLifeDays * 24 * 60 * 60
    );
}


function resetCalculator() {

  dob.value = "";

  const today =
    new Date();

  asOn.value =
    formatDate(today);


  years.textContent = "0";
  months.textContent = "0";
  days.textContent = "0";

  calculatedAsOn.textContent = "—";
  nextBirthday.textContent = "—";

  birthdayHighlight.textContent = "—";
  birthdayDate.textContent = "—";
  birthdayDays.textContent = "—";

  totalDays.textContent = "0";
  totalWeeks.textContent = "0";
  totalMonths.textContent = "0";
  totalHours.textContent = "0";
  totalMinutes.textContent = "0";
  totalSeconds.textContent = "0";

  error.textContent = "";

  dob.focus();
}


calculateButton.addEventListener(
  "click",
  calculate
);


resetButton.addEventListener(
  "click",
  resetCalculator
);
