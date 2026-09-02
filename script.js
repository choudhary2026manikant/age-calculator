const dateOfBirthInput = document.getElementById("dateOfBirth");
const asOnDateInput = document.getElementById("asOnDate");
const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");

const yearsElement = document.getElementById("years");
const monthsElement = document.getElementById("months");
const daysElement = document.getElementById("days");

const calculatedAsOnElement = document.getElementById("calculatedAsOn");
const nextBirthdayElement = document.getElementById("nextBirthday");

const daysUntilBirthdayElement =
  document.getElementById("daysUntilBirthdayElement") ||
  document.getElementById("daysUntilBirthday");

const errorMessage = document.getElementById("errorMessage");

const totalDaysElement = document.getElementById("totalDays");
const totalWeeksElement = document.getElementById("totalWeeks");
const totalMonthsElement = document.getElementById("totalMonths");
const totalHoursElement = document.getElementById("totalHours");
const totalMinutesElement = document.getElementById("totalMinutes");
const totalSecondsElement = document.getElementById("totalSeconds");


function getToday() {
  const now = new Date();

  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
}


function formatDisplayDate(date) {
  return `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1
  ).padStart(2, "0")}/${date.getFullYear()}`;
}


function formatDateInputValue(value) {
  let digits = value.replace(/\D/g, "").slice(0, 8);

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
    return digits.slice(0, 2) + "/" + digits.slice(2);
  }

  return digits;
}


function handleDateInput(event) {
  event.target.value = formatDateInputValue(event.target.value);
}


dateOfBirthInput?.addEventListener("input", handleDateInput);
asOnDateInput?.addEventListener("input", handleDateInput);


function parseIndianDate(value) {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (!match) {
    return null;
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  if (day < 1 || day > 31 || month < 1 || month > 12) {
    return null;
  }

  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}


function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}


function calculateExactAge(birthDate, targetDate) {
  let years =
    targetDate.getFullYear() -
    birthDate.getFullYear();

  let months =
    targetDate.getMonth() -
    birthDate.getMonth();

  let days =
    targetDate.getDate() -
    birthDate.getDate();


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

    days += getDaysInMonth(
      previousMonthYear,
      normalizedMonth
    );
  }


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


function getNextBirthday(birthDate, targetDate) {
  const birthMonth = birthDate.getMonth();
  const birthDay = birthDate.getDate();

  let birthdayYear = targetDate.getFullYear();

  let birthdayDay = Math.min(
    birthDay,
    getDaysInMonth(birthdayYear, birthMonth)
  );

  let nextBirthday = new Date(
    birthdayYear,
    birthMonth,
    birthdayDay
  );


  if (nextBirthday < targetDate) {
    birthdayYear++;

    birthdayDay = Math.min(
      birthDay,
      getDaysInMonth(birthdayYear, birthMonth)
    );

    nextBirthday = new Date(
      birthdayYear,
      birthMonth,
      birthdayDay
    );
  }


  return nextBirthday;
}


function getDaysBetween(date1, date2) {
  return Math.round(
    (date2 - date1) /
    (1000 * 60 * 60 * 24)
  );
}


function formatNumber(number) {
  return new Intl.NumberFormat("en-IN").format(number);
}


function showError(message) {
  if (errorMessage) {
    errorMessage.textContent = message;
  }
}


function clearError() {
  if (errorMessage) {
    errorMessage.textContent = "";
  }
}


function calculateLifeStatistics(
  birthDate,
  targetDate
) {
  const totalDays = Math.floor(
    (targetDate - birthDate) /
    (1000 * 60 * 60 * 24)
  );

  const age = calculateExactAge(
    birthDate,
    targetDate
  );


  return {
    totalDays,

    totalWeeks:
      Math.floor(totalDays / 7),

    totalMonths:
      age.years * 12 + age.months,

    totalHours:
      totalDays * 24,

    totalMinutes:
      totalDays * 24 * 60,

    totalSeconds:
      totalDays * 24 * 60 * 60
  };
}


function displayLifeStatistics(statistics) {

  if (totalDaysElement) {
    totalDaysElement.textContent =
      formatNumber(statistics.totalDays);
  }

  if (totalWeeksElement) {
    totalWeeksElement.textContent =
      formatNumber(statistics.totalWeeks);
  }

  if (totalMonthsElement) {
    totalMonthsElement.textContent =
      formatNumber(statistics.totalMonths);
  }

  if (totalHoursElement) {
    totalHoursElement.textContent =
      formatNumber(statistics.totalHours);
  }

  if (totalMinutesElement) {
    totalMinutesElement.textContent =
      formatNumber(statistics.totalMinutes);
  }

  if (totalSecondsElement) {
    totalSecondsElement.textContent =
      formatNumber(statistics.totalSeconds);
  }
}


function setDefaultAsOnDate() {

  if (asOnDateInput) {
    asOnDateInput.value =
      formatDisplayDate(getToday());
  }
}


function ageToBirthdayText(from, to) {

  const total =
    getDaysBetween(from, to);

  if (total <= 0) {
    return "आज आपका जन्मदिन है!";
  }


  const months =
    Math.floor(total / 30);

  const days =
    total % 30;


  if (months > 0 && days > 0) {
    return `${months} महीने ${days} दिन`;
  }

  if (months > 0) {
    return `${months} महीने`;
  }

  return `${days} दिन`;
}


function calculateAge() {

  clearError();


  if (!dateOfBirthInput?.value) {
    showError(
      "कृपया अपनी जन्म तारीख DD/MM/YYYY में दर्ज करें।"
    );

    return;
  }


  if (!asOnDateInput?.value) {
    showError(
      "कृपया Age as on Date DD/MM/YYYY में दर्ज करें।"
    );

    return;
  }


  const birthDate =
    parseIndianDate(
      dateOfBirthInput.value
    );

  const targetDate =
    parseIndianDate(
      asOnDateInput.value
    );


  if (!birthDate) {
    showError(
      "कृपया सही Date of Birth DD/MM/YYYY में दर्ज करें।"
    );

    return;
  }


  if (!targetDate) {
    showError(
      "कृपया सही Age as on Date DD/MM/YYYY में दर्ज करें।"
    );

    return;
  }


  if (birthDate > getToday()) {
    showError(
      "जन्म तारीख भविष्य की नहीं हो सकती।"
    );

    return;
  }


  if (birthDate > targetDate) {
    showError(
      "Age as on Date, जन्म तारीख के बाद या उसी दिन की होनी चाहिए।"
    );

    return;
  }


  const age =
    calculateExactAge(
      birthDate,
      targetDate
    );


  if (yearsElement) {
    yearsElement.textContent =
      age.years;
  }

  if (monthsElement) {
    monthsElement.textContent =
      age.months;
  }

  if (daysElement) {
    daysElement.textContent =
      age.days;
  }


  if (calculatedAsOnElement) {
    calculatedAsOnElement.textContent =
      formatDisplayDate(targetDate);
  }


  const nextBirthday =
    getNextBirthday(
      birthDate,
      targetDate
    );


  if (nextBirthdayElement) {
    nextBirthdayElement.textContent =
      formatDisplayDate(nextBirthday);
  }


  const daysLeft =
    getDaysBetween(
      targetDate,
      nextBirthday
    );


  if (daysUntilBirthdayElement) {

    daysUntilBirthdayElement.textContent =
      daysLeft === 0
        ? "🎉 आज आपका जन्मदिन है!"
        : `${formatNumber(daysLeft)} दिन`;
  }


  const highlight =
    document.getElementById(
      "birthdayHighlight"
    );

  const birthdayDate =
    document.getElementById(
      "birthdayDate"
    );


  if (highlight) {
    highlight.textContent =
      daysLeft === 0
        ? "आज आपका जन्मदिन है!"
        : ageToBirthdayText(
            targetDate,
            nextBirthday
          );
  }


  if (birthdayDate) {
    birthdayDate.textContent =
      formatDisplayDate(nextBirthday);
  }


  const statistics =
    calculateLifeStatistics(
      birthDate,
      targetDate
    );


  displayLifeStatistics(
    statistics
  );
}


function resetCalculator() {

  if (dateOfBirthInput) {
    dateOfBirthInput.value = "";
  }


  setDefaultAsOnDate();


  if (yearsElement) {
    yearsElement.textContent = "0";
  }

  if (monthsElement) {
    monthsElement.textContent = "0";
  }

  if (daysElement) {
    daysElement.textContent = "0";
  }


  if (calculatedAsOnElement) {
    calculatedAsOnElement.textContent = "—";
  }

  if (nextBirthdayElement) {
    nextBirthdayElement.textContent = "—";
  }

  if (daysUntilBirthdayElement) {
    daysUntilBirthdayElement.textContent = "—";
  }


  if (totalDaysElement) {
    totalDaysElement.textContent = "0";
  }

  if (totalWeeksElement) {
    totalWeeksElement.textContent = "0";
  }

  if (totalMonthsElement) {
    totalMonthsElement.textContent = "0";
  }

  if (totalHoursElement) {
    totalHoursElement.textContent = "0";
  }

  if (totalMinutesElement) {
    totalMinutesElement.textContent = "0";
  }

  if (totalSecondsElement) {
    totalSecondsElement.textContent = "0";
  }


  const highlight =
    document.getElementById(
      "birthdayHighlight"
    );

  const birthdayDate =
    document.getElementById(
      "birthdayDate"
    );


  if (highlight) {
    highlight.textContent = "—";
  }

  if (birthdayDate) {
    birthdayDate.textContent = "—";
  }


  clearError();


  if (dateOfBirthInput) {
    dateOfBirthInput.focus();
  }
}


calculateBtn?.addEventListener(
  "click",
  calculateAge
);

resetBtn?.addEventListener(
  "click",
  resetCalculator
);


setDefaultAsOnDate();