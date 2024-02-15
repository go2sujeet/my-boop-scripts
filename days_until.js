/**
{
    "api":1,
    "name":"Days Until",
    "description":"Returns number of days until the date. If the date is in the past, it returns the number of days since the date. Date format: MM/DD/YYYY",
    "author":"sujeet",
    "icon":"quote",
    "tags":"boop,state,script,debug,new,create"
}
**/
function main(input) {
    let currentDate, futureOrPastDate;
    // Split the input by comma and trim spaces
    const dates = input.text.split(',').map(date => date.trim());
	const todayDate = getTodayDate();
    // Check the number of dates provided
    if (dates.length === 2) {
        currentDate = dates[0];
        futureOrPastDate = dates[1];
		// if any is empty then replace it with current date
		if (currentDate === "") {
			currentDate = todayDate
		}
		if (futureOrPastDate === "") {
			futureOrPastDate = todayDate;
		}

    } else if (dates.length === 1) {
        // Set the current date in MM/DD/YYYY format
        currentDate = todayDate;
        futureOrPastDate = dates[0];
    } else {
        input.postError('Invalid input. Please provide one or two dates.');
        return; // Exit the function if the input is invalid
    }

    // Calculate the days until
    try {
        const days = daysUntil(currentDate, futureOrPastDate);
        // String interpolation for the result
        const response = `There are ${days} days between ${currentDate} and ${futureOrPastDate}.`;
        input.text = response;
    } catch (error) {
        input.postError(error.message);
    }
}
function daysUntil(currentDate, futureOrPastDate) {
    // Validate dates
    if (!isValidDate(currentDate) || !isValidDate(futureOrPastDate)) {
        throw new Error('Invalid date format. Please use MM/DD/YYYY.');
    }

    // Parse dates
    const current = new Date(currentDate);
    const futureOrPast = new Date(futureOrPastDate);

    // Calculate the difference in milliseconds
    const diffInMs = futureOrPast - current;

    // Convert milliseconds to days
    const diffInDays = Math.ceil(Math.abs(diffInMs) / (1000 * 60 * 60 * 24));

    // Determine if the futureOrPastDate is in the past or future
    return futureOrPast > current ? diffInDays : -diffInDays;
}

// Helper function to validate date format
function isValidDate(dateString) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateString.match(regex)) return false;

    const parts = dateString.split('/');
    const month = parseInt(parts[0], 10);
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    // Check for valid month and day
    if (month < 1 || month > 12 || day < 1 || day > 31) {
        return false;
    }

    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function getTodayDate() {
	let todayDate = new Date().toISOString().split('T')[0];
	const parts = todayDate.split('-');
	todayDate = `${parts[1]}/${parts[2]}/${parts[0]}`;
	return todayDate;
}