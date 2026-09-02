const dateOfBirthInput = document.getElementById("dateOfBirth");
const asOnDateInput = document.getElementById("asOnDate");

const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");

const yearsElement = document.getElementById("years");
const monthsElement = document.getElementById("months");
const daysElement = document.getElementById("days");

const calculatedAsOnElement = document.getElementById("calculatedAsOn");
const nextBirthdayElement = document.getElementById("nextBirthday");
const daysUntilBirthdayElement = document.getElementById("daysUntilBirthday");

const birthdayHighlight = document.getElementById("birthdayHighlight");
const heroAgePreview = document.getElementById("heroAgePreview");
const heroBirthdayPreview = document.getElementById("heroBirthdayPreview");

const errorMessage = document.getElementById("errorMessage");

const totalDaysElement = document.getElementById("totalDays");
const totalWeeksElement = document.getElementById("totalWeeks");
const totalMonthsElement = document.getElementById("totalMonths");
const totalHoursElement = document.getElementById("totalHours");
const totalMinutesElement = document.getElementById("totalMinutes");
const totalSecondsElement = document.getElementById("totalSeconds");


/* =========================
   DATE HELPERS
========================= */

function getToday() {
    const now = new Date();

    return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );
}


function formatDisplayDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}


function formatDateInputValue(value) {
    let digits = value.replace(/\D/g, "");

    digits = digits.slice(0, 8);

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


function handleDateInput(event) {
    const input = event.target;

    input.value = formatDateInputValue(input.value);
}


dateOfBirthInput.addEventListener("input", handleDateInput);
asOnDateInput.addEventListener("input", handleDateInput);


function parseIndianDate(value) {
    const pattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;

    const match = value.match(pattern);

    if (!match) {
        return null;
    }

    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);

    if (
        day < 1 ||
        day > 31 ||
        month < 1 ||
        month > 12
    ) {
        return null;
    }

    const date = new Date(
        year,
        month - 1,
        day
    );

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
    return new Date(
        year,
        month + 1,
        0
    ).getDate();
}


/* =========================
   AGE CALCULATION
========================= */

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


/* =========================
   NEXT BIRTHDAY
========================= */

function getNextBirthday(birthDate, targetDate) {
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();

    let birthdayYear = targetDate.getFullYear();

    let birthdayDay = Math.min(
        birthDay,
        getDaysInMonth(
            birthdayYear,
            birthMonth
        )
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
            getDaysInMonth(
                birthdayYear,
                birthMonth
            )
        );

        nextBirthday = new Date(
            birthdayYear,
            birthMonth,
            birthdayDay
        );
    }


    return nextBirthday;
}


/* =========================
   DATE DIFFERENCE
========================= */

function getDaysBetween(date1, date2) {
    const millisecondsPerDay =
        1000 * 60 * 60 * 24;

    return Math.round(
        (date2 - date1) /
        millisecondsPerDay
    );
}


/* =========================
   NUMBER FORMAT
========================= */

function formatNumber(number) {
    return new Intl.NumberFormat(
        "en-IN"
    ).format(number);
}


/* =========================
   ERROR HANDLING
========================= */

function showError(message) {
    errorMessage.textContent = message;
}


function clearError() {
    errorMessage.textContent = "";
}


/* =========================
   LIFE STATISTICS
========================= */

function calculateLifeStatistics(
    birthDate,
    targetDate
) {
    const millisecondsPerDay =
        1000 * 60 * 60 * 24;

    const totalMilliseconds =
        targetDate - birthDate;

    const totalDays = Math.floor(
        totalMilliseconds /
        millisecondsPerDay
    );

    const totalWeeks = Math.floor(
        totalDays / 7
    );

    const age = calculateExactAge(
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


function displayLifeStatistics(
    statistics
) {
    totalDaysElement.textContent =
        formatNumber(statistics.totalDays);

    totalWeeksElement.textContent =
        formatNumber(statistics.totalWeeks);

    totalMonthsElement.textContent =
        formatNumber(statistics.totalMonths);

    totalHoursElement.textContent =
        formatNumber(statistics.totalHours);

    totalMinutesElement.textContent =
        formatNumber(statistics.totalMinutes);

    totalSecondsElement.textContent =
        formatNumber(statistics.totalSeconds);
}


/* =========================
   BIRTHDAY COUNTDOWN TEXT
========================= */

function getBirthdayCountdownText(
    targetDate,
    nextBirthday
) {
    const daysRemaining = getDaysBetween(
        targetDate,
        nextBirthday
    );


    if (daysRemaining === 0) {
        return "🎉 आज आपका जन्मदिन है!";
    }


    if (daysRemaining === 1) {
        return "🎂 सिर्फ 1 दिन बाकी";
    }


    if (daysRemaining < 30) {
        return `🎂 ${formatNumber(daysRemaining)} दिन बाकी`;
    }


    const months = Math.floor(
        daysRemaining / 30
    );

    const days = daysRemaining % 30;


    if (months > 0 && days > 0) {
        return `🎂 ${months} महीने ${days} दिन बाकी`;
    }


    if (months > 0) {
        return `🎂 ${months} महीने बाकी`;
    }


    return `🎂 ${formatNumber(daysRemaining)} दिन बाकी`;
}


/* =========================
   DEFAULT DATE
========================= */

function setDefaultAsOnDate() {
    const today = getToday();

    asOnDateInput.value =
        formatDisplayDate(today);
}


/* =========================
   MAIN CALCULATOR
========================= */

function calculateAge() {
    clearError();


    if (!dateOfBirthInput.value) {
        showError(
            "कृपया अपनी जन्म तारीख DD/MM/YYYY में दर्ज करें।"
        );

        return;
    }


    if (!asOnDateInput.value) {
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


    const today = getToday();


    if (birthDate > today) {
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


    /* AGE */

    const age = calculateExactAge(
        birthDate,
        targetDate
    );


    yearsElement.textContent =
        age.years;

    monthsElement.textContent =
        age.months;

    daysElement.textContent =
        age.days;


    calculatedAsOnElement.textContent =
        formatDisplayDate(targetDate);


    /* HERO PREVIEW */

    heroAgePreview.textContent =
        `${age.years}y ${age.months}m ${age.days}d`;


    /* NEXT BIRTHDAY */

    const nextBirthday =
        getNextBirthday(
            birthDate,
            targetDate
        );


    nextBirthdayElement.textContent =
        formatDisplayDate(nextBirthday);


    heroBirthdayPreview.textContent =
        formatDisplayDate(nextBirthday);


    /* BIRTHDAY COUNTDOWN */

    const daysRemaining =
        getDaysBetween(
            targetDate,
            nextBirthday
        );


    const birthdayText =
        getBirthdayCountdownText(
            targetDate,
            nextBirthday
        );


    daysUntilBirthdayElement.textContent =
        birthdayText;


    birthdayHighlight.textContent =
        birthdayText;


    /* LIFE STATISTICS */

    const statistics =
        calculateLifeStatistics(
            birthDate,
            targetDate
        );


    displayLifeStatistics(
        statistics
    );
}


/* =========================
   RESET
========================= */

function resetCalculator() {
    dateOfBirthInput.value = "";

    setDefaultAsOnDate();


    yearsElement.textContent = "0";
    monthsElement.textContent = "0";
    daysElement.textContent = "0";


    calculatedAsOnElement.textContent =
        "—";

    nextBirthdayElement.textContent =
        "—";

    daysUntilBirthdayElement.textContent =
        "—";


    birthdayHighlight.textContent =
        "—";


    heroAgePreview.textContent =
        "—";

    heroBirthdayPreview.textContent =
        "Coming soon";


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


/* =========================
   BUTTON EVENTS
========================= */

calculateBtn.addEventListener(
    "click",
    calculateAge
);

resetBtn.addEventListener(
    "click",
    resetCalculator
);


/* =========================
   INITIALIZE
========================= */

setDefaultAsOnDate();