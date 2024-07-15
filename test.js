const calculateAge = () => {
	const today = new Date();
	const inputDate = new Date(document.getElementById("date-input").value);

	const birthDetails = {
		date: inputDate.getDate(),
		month: inputDate.getMonth() + 1,
		year: inputDate.getFullYear(),
	};

	const { years, months, days } = getAge(today, birthDetails);

	if (!isValidDate(today, birthDetails)) {
		alert("Invalid birthdate. Please choose a date in the past.");
		displayAge("-", "-", "-");
	} else {
		displayAge(days, months, years);
	}
};

const getAge = (currentDate, birthDetails) => {
	let years = currentDate.getFullYear() - birthDetails.year;
	let months = currentDate.getMonth() + 1 - birthDetails.month;
	let days = currentDate.getDate() - birthDetails.date;

	if (days < 0) {
		const lastMonthDays = daysInMonth(
			currentDate.getMonth(),
			currentDate.getFullYear()
		);
		days += lastMonthDays;
		months--;
	}

	if (months < 0) {
		years--;
		months += 12;
	}

	return { years, months, days };
};

const isValidDate = (currentDate, birthDetails) => {
	return (
		currentDate.getTime() >=
		new Date(
			birthDetails.year,
			birthDetails.month - 1,
			birthDetails.date
		).getTime()
	);
};

const daysInMonth = (month, year) => {
	const daysInMonths = [
		31,
		isLeapYear(year) ? 29 : 28,
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31,
	];
	return daysInMonths[month];
};

const isLeapYear = (year) => {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const displayAge = (days, months, years) => {
	document.getElementById("days").textContent = days;
	document.getElementById("months").textContent = months;
	document.getElementById("years").textContent = years;
};

document.getElementById("calc-age-btn").addEventListener("click", calculateAge);
