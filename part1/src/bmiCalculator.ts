import { parseArgumentsForBmi } from './helpers';

export const calculateBmi = (height: number, weight: number): string => {
	const heightInMeters = height / 100;
	const bmi = weight / (heightInMeters * heightInMeters);

	if (bmi < 18.5) {
		return 'Underweight';
	} else if (bmi < 25) {
		return 'Normal weight';
	} else if (bmi < 30) {
		return 'Overweight';
	} else {
		return 'Obesity';
	}
}

if (require.main === module) { // Check if the script is run directly
	try {
		const [height, weight] = parseArgumentsForBmi(process.argv);
		console.log(calculateBmi(height, weight));
	} catch (error) {
		console.error(error.message);
		process.exit(1);
	}
}
