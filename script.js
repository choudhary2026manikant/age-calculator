const dateOfBirthInput = document.getElementById("dateOfBirth");
const calculateBtn = document.getElementById("calculateBtn");

const yearsElement = document.getElementById("years");
const monthsElement = document.getElementById("months");
const daysElement = document.getElementById("days");

const nextBirthdayElement =
  document.getElementById("nextBirthday");

const daysUntilBirthdayElement =
  document.getElementById("daysUntilBirthday");

const errorMessage =
  document.getElementById("errorMessage");


function getToday() {
  const today = new Date();

  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
}


function createDate(year, month, day) {
  return new Date(year, month, day);
}


function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}


function calculateExactAge(birthDate, today) {

  let years =
    today.getFullYear() -
    birthDate.getFullYear();

  let months =
    today.getMonth() -
    birthDate.getMonth();

  let days =
    today.getDate() -
    birthDate.getDate();


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


function getNextBirthday(birthDate, today) {

  const birthMonth =
    birthDate.getMonth();

  const birthDay =
    birthDate.getDate();

  let birthdayYear =
    today.getFullYear();


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


function getDaysBetween(date1, date2) {

  const millisecondsPerDay =
    1000 * 60 * 60 * 24;

  return Math.round(
    (date2 - date1) /
    millisecondsPerDay
  );
}


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


function calculateAge() {

  errorMessage.textContent = "";


  if (!dateOfBirthInput.value) {

    errorMessage.textContent =
      "कृपया अपनी जन्म तारीख चुनें।";

    return;
  }


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


  const today = getToday();


  if (birthDate > today) {

    errorMessage.textContent =
      "जन्म तारीख भविष्य की नहीं हो सकती।";

    return;
  }


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


  const nextBirthday =
    getNextBirthday(
      birthDate,
      today
    );


  nextBirthdayElement.textContent =
    formatDate(nextBirthday);


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
}


calculateBtn.addEventListener(
  "click",
  calculateAge
);