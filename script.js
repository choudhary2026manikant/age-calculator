// Date of Birth input को पकड़ना
const birthDateInput = document.getElementById("birthDate");

// Calculate button को पकड़ना
const calculateButton = document.querySelector("button");

// Result box को पकड़ना
const resultBox = document.querySelector(".result");


// Calculate button पर click होने पर यह function चलेगा
calculateButton.addEventListener("click", function () {

    // User द्वारा चुनी गई जन्म तारीख
    const birthDateValue = birthDateInput.value;

    // अगर तारीख नहीं चुनी गई
    if (!birthDateValue) {
        resultBox.innerHTML = "<p>कृपया अपनी जन्म तारीख चुनें।</p>";
        return;
    }

    // जन्म तारीख को Date object में बदलना
    const birthDate = new Date(birthDateValue + "T00:00:00");

    // आज की तारीख
    const today = new Date();

    // अगर जन्म तारीख भविष्य की है
    if (birthDate > today) {
        resultBox.innerHTML = "<p>जन्म तारीख भविष्य की नहीं हो सकती।</p>";
        return;
    }

    // शुरुआत में वर्षों, महीनों और दिनों का अंतर
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();


    // अगर days negative हैं
    if (days < 0) {
        months--;

        const previousMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
        );

        days += previousMonth.getDate();
    }


    // अगर months negative हैं
    if (months < 0) {
        years--;
        months += 12;
    }


    // Result दिखाना
    resultBox.innerHTML = `
        <h2>आपकी उम्र</h2>
        <p>
            <strong>${years}</strong> वर्ष,
            <strong>${months}</strong> महीने और
            <strong>${days}</strong> दिन
        </p>
    `;
});
