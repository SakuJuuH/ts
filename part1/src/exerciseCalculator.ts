import { parseArgumentsForExercise } from './helpers';

interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

const calculateExercise = (exerciseHours: number[], target: number): Result => {
	let success: boolean = true;
	const periodLength: number = exerciseHours.length;
	let trainingDays: number = 0;
	let totalHours: number = 0;
	exerciseHours.forEach(day => {
		if (day < target) {
			success = false;
		}
		if (day > 0) {
			trainingDays++;
		}
		totalHours += day;
	});

	let rating: number = 0;
	let ratingDescription: string = "";

	const average: number = totalHours / periodLength;

	const rating1Threshold: number = average / 3;
	const rating2Threshold: number = rating1Threshold * 2;

	if (average < rating1Threshold) {
		rating = 1;
		ratingDescription = "You can do better next time.";
	} else if (rating1Threshold <= average) {
		rating = 2;
		ratingDescription = "You're getting there, push a bit harder next time!";
	} else if (average > rating2Threshold) {
		rating = 3;
		ratingDescription = "Congratulations! You achieved your target for the week.";
	}

	const result: Result = {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average,
	};

	return result;
};

if (require.main === module) { // Check if the script is run directly
	try {
		const [exerciseHours, target] = parseArgumentsForExercise(process.argv);
		console.log(calculateExercise(exerciseHours, target));
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		}
		else {
			console.error('An unexpected error occurred.');
		}
		process.exit(1);
	}
}