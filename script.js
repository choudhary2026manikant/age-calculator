document.addEventListener("DOMContentLoaded", () => {

    const dobInput = document.getElementById("dateOfBirth");
    const targetDateInput = document.getElementById("asOnDate");
  
    const calculateButton = document.getElementById("calculateBtn");
    const resetButton = document.getElementById("resetBtn");
  
    const errorMessage = document.getElementById("errorMessage");
  
    const calculatedAsOn = document.getElementById("calculatedAsOn");
    const birthDateDisplay = document.getElementById("birthDateDisplay");
  
    const yearsOutput = document.getElementById("years");
    const monthsOutput = document.getElementById("months");
    const daysOutput = document.getElementById("days");
  
    const nextBirthdayOutput = document.getElementById("nextBirthday");
    const birthdayHighlight = document.getElementById("birthdayHighlight");
    const birthdayDate = document.getElementById("birthdayDate");
    const daysUntilBirthdayOutput =
      document.getElementById("daysUntilBirthday");
  
    const totalDaysOutput = document.getElementById("totalDays");
    const totalWeeksOutput = document.getElementById("totalWeeks");
    const totalMonthsOutput = document.getElementById("totalMonths");
    const totalHoursOutput = document.getElementById("totalHours");
    const totalMinutesOutput = document.getElementById("totalMinutes");
    const totalSecondsOutput = document.getElementById("totalSeconds");
  
  
    function parseIndianDate(value) {
  
      if (!value) {
        return null;
      }
  
      const parts = value.trim().split("/");
  
      if (parts.length !== 3) {
        return null;
      }
  
      const day = Number(parts[0]);
      const month = Number(parts[1]);
      const year = Number(parts[2]);
  
      if (
        !Number.isInteger(day) ||
        !Number.isInteger(month) ||
        !Number.isInteger(year)
      ) {
        return null;
      }
  
      if (
        year < 1 ||
        month < 1 ||
        month > 12 ||
        day < 1 ||
        day > 31
      ) {
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
  
      date.setHours(0, 0, 0, 0);
  
      return date;
    }
  
  
    function formatDate(date) {
  
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
  
      return `${day}/${month}/${year}`;
    }
  
  
    function addYearsSafe(date, years) {
  
      const result = new Date(date);
  
      const month = result.getMonth();
      const day = result.getDate();
  
      result.setFullYear(result.getFullYear() + years);
  
      if (
        result.getMonth() !== month ||
        result.getDate() !== day
      ) {
        result.setDate(0);
      }
  
      return result;
    }
  
  
    function calculateExactAge(birthDate, targetDate) {
  
      let years =
        targetDate.getFullYear() -
        birthDate.getFullYear();
  
      let anniversary =
        addYearsSafe(birthDate, years);
  
      if (anniversary > targetDate) {
  
        years--;
  
        anniversary =
          addYearsSafe(birthDate, years);
      }
  
      let months = 0;
  
      let cursor =
        new Date(anniversary);
  
      while (true) {
  
        const nextMonth =
          new Date(cursor);
  
        nextMonth.setMonth(
          nextMonth.getMonth() + 1
        );
  
        if (nextMonth > targetDate) {
          break;
        }
  
        cursor = nextMonth;
        months++;
      }
  
      const days = Math.floor(
        (targetDate - cursor) / 86400000
      );
  
      return {
        years,
        months,
        days
      };
    }
  
  
    function getNextBirthday(birthDate, targetDate) {
  
      const birthMonth =
        birthDate.getMonth();
  
      const birthDay =
        birthDate.getDate();
  
      let birthday =
        new Date(
          targetDate.getFullYear(),
          birthMonth,
          birthDay
        );
  
      birthday.setHours(0, 0, 0, 0);
  
      if (birthday < targetDate) {
  
        birthday =
          new Date(
            targetDate.getFullYear() + 1,
            birthMonth,
            birthDay
          );
  
        birthday.setHours(0, 0, 0, 0);
      }
  
      return birthday;
    }
  
  
    function calculate() {
  
      errorMessage.textContent = "";
  
  
      const birthDate =
        parseIndianDate(dobInput.value);
  
  
      if (!birthDate) {
  
        errorMessage.textContent =
          "Please enter a valid date of birth in DD/MM/YYYY format.";
  
        return;
      }
  
  
      const today =
        new Date();
  
      today.setHours(0, 0, 0, 0);
  
  
      let targetDate;
  
  
      if (
        targetDateInput.value.trim()
      ) {
  
        targetDate =
          parseIndianDate(
            targetDateInput.value
          );
  
  
        if (!targetDate) {
  
          errorMessage.textContent =
            "Please enter a valid Age as on Date in DD/MM/YYYY format.";
  
          return;
        }
  
      } else {
  
        targetDate = today;
      }
  
  
      if (birthDate > targetDate) {
  
        errorMessage.textContent =
          "Date of birth cannot be after the calculation date.";
  
        return;
      }
  
  
      const age =
        calculateExactAge(
          birthDate,
          targetDate
        );
  
  
      yearsOutput.textContent =
        age.years;
  
      monthsOutput.textContent =
        age.months;
  
      daysOutput.textContent =
        age.days;
  
  
      const nextBirthday =
        getNextBirthday(
          birthDate,
          targetDate
        );
  
  
      const birthdayDifference =
        Math.round(
          (nextBirthday - targetDate) /
          86400000
        );
  
  
      const birthdayText =
        formatDate(nextBirthday);
  
  
      nextBirthdayOutput.textContent =
        birthdayText;
  
      birthdayDate.textContent =
        birthdayText;
  
      birthdayHighlight.textContent =
        birthdayDifference === 0
          ? "Today 🎉"
          : `${birthdayDifference} days`;
  
      daysUntilBirthdayOutput.textContent =
        birthdayDifference === 0
          ? "Today 🎉"
          : `${birthdayDifference} days`;
  
  
      birthDateDisplay.textContent =
        formatDate(birthDate);
  
      calculatedAsOn.textContent =
        formatDate(targetDate);
  
  
      const totalDays =
        Math.floor(
          (targetDate - birthDate) /
          86400000
        );
  
  
      const totalWeeks =
        Math.floor(
          totalDays / 7
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
  
  
      totalDaysOutput.textContent =
        totalDays.toLocaleString("en-IN");
  
      totalWeeksOutput.textContent =
        totalWeeks.toLocaleString("en-IN");
  
      totalMonthsOutput.textContent =
        totalMonths.toLocaleString("en-IN");
  
      totalHoursOutput.textContent =
        totalHours.toLocaleString("en-IN");
  
      totalMinutesOutput.textContent =
        totalMinutes.toLocaleString("en-IN");
  
      totalSecondsOutput.textContent =
        totalSeconds.toLocaleString("en-IN");
    }
  
  
    function resetCalculator() {
  
      dobInput.value = "";
  
      targetDateInput.value = "";
  
      errorMessage.textContent = "";
  
  
      yearsOutput.textContent = "0";
      monthsOutput.textContent = "0";
      daysOutput.textContent = "0";
  
  
      calculatedAsOn.textContent = "—";
      birthDateDisplay.textContent = "—";
  
      nextBirthdayOutput.textContent = "—";
      birthdayHighlight.textContent = "—";
      birthdayDate.textContent = "—";
      daysUntilBirthdayOutput.textContent = "—";
  
  
      totalDaysOutput.textContent = "0";
      totalWeeksOutput.textContent = "0";
      totalMonthsOutput.textContent = "0";
      totalHoursOutput.textContent = "0";
      totalMinutesOutput.textContent = "0";
      totalSecondsOutput.textContent = "0";
    }
  
  
    function formatInputDate(input) {
  
      let value =
        input.value.replace(/\D/g, "");
  
  
      if (value.length > 8) {
        value = value.slice(0, 8);
      }
  
  
      if (value.length > 4) {
  
        value =
          value.slice(0, 2) +
          "/" +
          value.slice(2, 4) +
          "/" +
          value.slice(4);
  
      } else if (value.length > 2) {
  
        value =
          value.slice(0, 2) +
          "/" +
          value.slice(2);
      }
  
  
      input.value = value;
    }
  
  
    if (dobInput) {
  
      dobInput.addEventListener(
        "input",
        () => {
          formatInputDate(dobInput);
        }
      );
  
  
      dobInput.addEventListener(
        "keydown",
        event => {
  
          if (event.key === "Enter") {
            calculate();
          }
  
        }
      );
    }
  
  
    if (targetDateInput) {
  
      targetDateInput.addEventListener(
        "input",
        () => {
          formatInputDate(targetDateInput);
        }
      );
  
  
      targetDateInput.addEventListener(
        "keydown",
        event => {
  
          if (event.key === "Enter") {
            calculate();
          }
  
        }
      );
    }
  
  
    if (calculateButton) {
  
      calculateButton.addEventListener(
        "click",
        calculate
      );
    }
  
  
    if (resetButton) {
  
      resetButton.addEventListener(
        "click",
        resetCalculator
      );
    }
  
  
    const today =
      new Date();
  
    const todayString =
      `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;
  
  
    if (
      targetDateInput &&
      !targetDateInput.value
    ) {
  
      targetDateInput.placeholder =
        `DD/MM/YYYY (e.g. ${todayString})`;
    }
  
  });