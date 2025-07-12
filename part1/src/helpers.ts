const parseArgumentsForBmi = (args: string[]): [number, number] => {
	if (args.length < 4) {
		throw new Error('Not enough arguments. Usage: npm run calculate-bmi <height in cm> <weight in kg>');
	}
	const height = Number(args[2]);
	const weight = Number(args[3]);

	if (height <= 0 || weight <= 0) {
		throw new Error('Height and weight must be positive numbers.');
	}

	if (isNaN(height) || isNaN(weight)) {
		throw new Error('Provided values were not numbers! Please provide height in cm and weight in kg.');
	}
	return [height, weight];
}

const parseArgumentsForExercise = (args: string[]): [number[], number] => {
	if (args.length < 4) {
		throw new Error('Not enough arguments. Usage: npm run calculate-exercise <hours per day...> <target hours per day>');
	}
	const hours = args.slice(2, args.length - 1).map(Number);
	const target = Number(args[args.length - 1]);
	if (isNaN(target) || hours.some(isNaN)) {
		throw new Error('Provided values were not numbers! Please provide an array of numbers followed by a target number.');
	}
	return [hours, target];
}

export { parseArgumentsForBmi, parseArgumentsForExercise };