import { format, getYear, isToday, parseISO } from 'date-fns';

export const date = (date: string): string => {
	const parsedDate = parseISO(date);
	// use datefns to format date into current time zone time format (11:30pm) if date is not on the current day, show date in month and day
	const currentYear = getYear(new Date());
	const dateYear = getYear(parsedDate);

	let formattedDate: string;

	if (isToday(parsedDate)) {
		formattedDate = format(parsedDate, 'h:mm a');
	} else if (currentYear === dateYear) {
		formattedDate = format(parsedDate, 'MMMM d');
	} else {
		formattedDate = format(parsedDate, 'dd/MM/yyyy');
	}

	return formattedDate;
};
