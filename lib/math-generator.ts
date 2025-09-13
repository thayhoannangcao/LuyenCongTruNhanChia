import { redirect } from 'next/navigation';
import router from 'next/router';

// Các loại phép tính
export type OperationType =
  | 'addition'
  | 'subtraction'
  | 'multiplication'
  | 'division';

// Các phạm vi cho phép cộng
export type AdditionRangeType = 1 | 2 | 3;

// Loại phép cộng (có nhớ hoặc không nhớ)
export type AdditionType = 'with_carry' | 'without_carry';

// Loại tính thời gian
export type TimeType = 'true' | 'false';

// Loại phép tính (tính hoặc đặt tính rồi tính)
export type CalculationType = 'true' | 'false';

// Các phạm vi cho phép trừ
export type SubtractionRangeType = 1 | 2 | 3;

// Loại phép trừ (có nhớ hoặc không nhớ)
export type SubtractionType = 'with_carry' | 'without_carry';

// Loại đặt tính (ngang hoặc dọc)
export type InputDirectionType = 'rtl' | 'ltr';

export type ExerciseType =
  | 'default'
  | 'multi_multiplication_table'
  | 'multi_addition_to_multiplication'
  | 'multi_comparison'
  | 'multi_find_unknown'
  | 'multi_other';

// Cấu hình bài tập phép cộng
export interface AdditionSettings {
  additionRangeType: AdditionRangeType;
  additionType: AdditionType;
  additionRangeValue?: number;
}

// Cấu hình bài tập phép trừ
export interface SubtractionSettings {
  subtractionRangeType: SubtractionRangeType;
  subtractionType: SubtractionType;
  subtractionRangeValue?: number;
}

// Cấu hình bài tập phép nhân
export interface MultiplicationSettings {
  multiplicationTable: number;
  additionToMultiplicationTable: number;
}

// Cấu hình bài tập phép chia
export interface DivisionSettings {}

// Cấu hình bài tập
export interface ExerciseConfig {
  operation: OperationType;
  additionSettings: AdditionSettings;
  subtractionSettings: SubtractionSettings;
  multiplicationSettings: MultiplicationSettings;
  divisionSettings: DivisionSettings;
  exerciseType: ExerciseType;
  numTerms: number;
  numsDigits: number[];
  rangeValue: number;
  totalQuestions: number;
  timeType: TimeType;
  timeValue?: number;
  calculationType?: CalculationType;
  inputDirectionType?: InputDirectionType;
}

// Kết quả bài tập
export interface ExerciseResult {
  nums: number[];
  correctAnswer: string;
  userAnswer?: string;
  isCorrect?: boolean;
  errorMessage?: string;
}

// Tạo số ngẫu nhiên theo max
export function generateRandomNumberWithMax(max: number): number {
  return Math.floor(Math.random() * (max + 1));
}

export function generateRandomNumberWithMinAndMax(
  min: number,
  max: number
): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Tạo số ngẫu nhiên với số chữ số cho trước
export function generateRandomNumber(digits: number): number {
  if (digits === 1) {
    return Math.floor(Math.random() * 10);
  }
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomNumberWithMaxAndDigits(
  max: number,
  digits: number
): number {
  const min = Math.pow(10, digits - 1);
  const maxDigits = Math.pow(10, digits) - 1;
  const maxCurrent = max > maxDigits ? maxDigits : max;
  const random = Math.random() * (maxCurrent - min + 1) + min;

  return Math.floor(random);
}

// Tạo số ngẫu nhiên cho phép chia
export function generateRandomNumberForDivision(
  digits: number,
  divisor: number
): number {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  const minDivided = min / divisor;
  const maxDivided = max / divisor;

  const randomDivided = Math.random() * (maxDivided - minDivided) + minDivided;
  const result = Math.floor(randomDivided);

  return result === 0 ? 1 : result;
}

// Đếm số chữ số của một số
export function countDigits(num: number): number {
  if (num === 0) return 1;

  let count = 0;
  while (num > 0) {
    num = Math.floor(num / 10);
    count += 1;
  }
  return count;
}

// Kiểm tra phép cộng có nhớ hay không
export function hasCarry(nums: number[]): boolean {
  const strs = nums.map((num) => num.toString());
  const maxLength = Math.max(...strs.map((str) => str.length));

  for (let i = 0; i < maxLength; i++) {
    const digits = strs.map((str) => parseInt(str[str.length - 1 - i] || '0'));
    if (digits.reduce((a, b) => a + b, 0) >= 10) {
      return true;
    }
  }

  return false;
}

export function hasBorrow(nums: number[]): boolean {
  if (nums.length < 2) return false;

  const strs = nums.map((num) => num.toString());
  const maxLength = Math.max(...strs.map((str) => str.length));

  for (let i = 0; i < maxLength; i++) {
    const digits = strs.map((str) => parseInt(str[str.length - 1 - i] || '0'));
    const first = digits[0];
    const rest = digits.slice(1);
    const sumRest = rest.reduce((a, b) => a + b, 0);

    if (first < sumRest) {
      return true;
    }
  }

  return false;
}

// Tạo số cho phép cộng trong phạm vi cụ thể
export function generateNumbersForAddition(
  numTerms: number,
  numsDigits: number[],
  additionSettings: AdditionSettings
): { nums: number[]; errorMessage: string } {
  let nums = [];

  let rangeValue = 0;
  switch (additionSettings.additionRangeType) {
    case 1:
      rangeValue = numTerms * 10;
      break;
    case 2:
      rangeValue = 100;
      break;
    case 3:
      rangeValue = additionSettings.additionRangeValue || 0;
      break;
  }

  const numsDigitsArray = (numsDigits as unknown as string)
    .split(',')
    .map(Number);
  const maxWhileLoop = 100;
  let indexWhileLoop = 0;
  let errorMessage = '';

  let sumMax = 0;
  for (let i = 0; i < numTerms; i++) {
    sumMax += Math.pow(10, numsDigitsArray[i]) - 1;
  }

  let customRangeValue = rangeValue;
  if (sumMax < rangeValue) {
    customRangeValue = sumMax;
  }

  do {
    indexWhileLoop++;
    let randomSum = generateRandomNumberWithMax(customRangeValue);
    if (indexWhileLoop > maxWhileLoop) {
      errorMessage =
        'Không tạo được bài tập, vui lòng thử lại hoặc kiểm tra lại cài đặt';
      break;
    }

    for (let i = 0; i < numTerms; i++) {
      if (numsDigitsArray[i] > countDigits(randomSum)) {
        continue;
      }
      nums[i] = generateRandomNumberWithMaxAndDigits(
        randomSum,
        numsDigitsArray[i]
      );
      if (nums[i] > randomSum) continue;
      randomSum -= nums[i];
    }
  } while (
    nums.length === 0 ||
    Array.from(nums).some(
      (n) => n === null || n === undefined || n === 0 || isNaN(Number(n))
    ) ||
    nums.reduce((a, b) => a + b, 0) >
      (additionSettings.additionRangeType == 3 &&
      additionSettings.additionRangeValue
        ? additionSettings.additionRangeValue
        : rangeValue) ||
    (additionSettings.additionType === 'with_carry' && !hasCarry(nums)) ||
    (additionSettings.additionType === 'without_carry' && hasCarry(nums))
  );

  return { nums, errorMessage };
}

// Tạo bài tập phép cộng
export function generateAdditionExercise(
  config: ExerciseConfig
): ExerciseResult {
  let nums: number[];
  if (
    config.additionSettings.additionRangeType &&
    config.additionSettings.additionType
  ) {
    const numbers = generateNumbersForAddition(
      config.numTerms,
      config.numsDigits,
      config.additionSettings
    );
    nums = numbers.nums;
  } else {
    nums = generateNumbersForAddition(
      config.numTerms,
      config.numsDigits,
      config.additionSettings
    ).nums;
  }

  const correctAnswer = nums.reduce((a, b) => a + b, 0);

  return {
    nums,
    correctAnswer: correctAnswer.toString(),
  };
}

export function generateSubtractionExercise(
  config: ExerciseConfig
): ExerciseResult {
  const numTerms = config.numTerms;
  const numsDigits = config.numsDigits;
  const subtractionSettings = config.subtractionSettings;

  let nums = [];

  let rangeValue = 0;
  switch (subtractionSettings.subtractionRangeType) {
    case 1:
      rangeValue = numTerms * 10;
      break;
    case 2:
      rangeValue = 100;
      break;
    case 3:
      rangeValue = subtractionSettings.subtractionRangeValue || 0;
      break;
  }

  let numsDigitsArray: number[];
  if (Array.isArray(numsDigits)) {
    numsDigitsArray = numsDigits;
  } else {
    numsDigitsArray = (numsDigits as unknown as string).split(',').map(Number);
  }

  const maxWhileLoop = 100;
  let indexWhileLoop = 0;
  let errorMessage = '';

  do {
    indexWhileLoop++;
    let randomSum = generateRandomNumberWithMax(rangeValue);

    if (indexWhileLoop > maxWhileLoop) {
      errorMessage =
        'Không tạo được bài tập, vui lòng thử lại hoặc kiểm tra lại cài đặt';
      break;
    }

    for (let i = 0; i < numTerms; i++) {
      if (numsDigitsArray[i] > countDigits(randomSum)) {
        continue;
      }
      nums[i] = generateRandomNumberWithMaxAndDigits(
        randomSum,
        numsDigitsArray[i]
      );
      if (nums[i] > randomSum) continue;

      if (i === 0) {
        randomSum = nums[i];
      } else {
        randomSum -= nums[i];
      }
    }
  } while (
    nums.length === 0 ||
    Array.from(nums).some(
      (n) => n === null || n === undefined || n === 0 || isNaN(Number(n))
    ) ||
    nums.reduce((a, b) => a - b) < 0 ||
    (subtractionSettings.subtractionType === 'with_carry' &&
      !hasBorrow(nums)) ||
    (subtractionSettings.subtractionType === 'without_carry' && hasBorrow(nums))
  );

  return {
    nums,
    errorMessage,
    correctAnswer: nums.reduce((a, b) => a - b).toString(),
  };
}

// Tạo bài tập phép nhân
export function generateMultiplicationExercise(
  config: ExerciseConfig
): ExerciseResult {
  let nums: number[] = [];
  let correctAnswer = '';

  const configExerciseType = config.exerciseType;

  if (configExerciseType === 'multi_multiplication_table') {
    nums[0] = config.multiplicationSettings.multiplicationTable;
    nums[1] = generateRandomNumberWithMax(9);
    correctAnswer = nums.reduce((a, b) => a * b).toString();
  }

  if (configExerciseType === 'multi_addition_to_multiplication') {
    nums[0] = config.multiplicationSettings.additionToMultiplicationTable;
    nums[1] = generateRandomNumberWithMinAndMax(2, 9);
    correctAnswer = nums[1].toString();
  }

  if (configExerciseType === 'multi_comparison') {
    nums[0] = generateRandomNumberWithMax(9);
    nums[1] = generateRandomNumberWithMax(9);
    nums[2] = generateRandomNumberWithMax(9);
    nums[3] = generateRandomNumberWithMax(9);

    if (nums[0] * nums[1] > nums[2] * nums[3]) {
      correctAnswer = '>';
    } else if (nums[0] * nums[1] < nums[2] * nums[3]) {
      correctAnswer = '<';
    } else {
      correctAnswer = '=';
    }
  }

  if (configExerciseType === 'multi_find_unknown') {
    nums[0] = generateRandomNumberWithMax(9);
    nums[1] = generateRandomNumberWithMax(9);
    nums[2] = generateRandomNumberWithMax(9);
    nums[3] = generateRandomNumberWithMax(9);
    const randomIndex = generateRandomNumberWithMax(3);

    correctAnswer = randomIndex.toString() + ',' + nums[randomIndex].toString();
  }

  if (configExerciseType === 'multi_other') {
    nums[0] = generateRandomNumberWithMax(9);
    nums[1] = generateRandomNumberWithMax(9);
    correctAnswer = nums.reduce((a, b) => a * b).toString();
  }

  return {
    nums,
    correctAnswer,
  };
}

// Tạo bài tập phép chia
export function generateDivisionExercise(
  config: ExerciseConfig
): ExerciseResult {
  // let num1: number = 0,
  //   num2: number;

  // do {
  //   num2 = generateRandomNumber(config.num2Digits);
  //   if (num2 === 1) continue;

  //   const quotient = generateRandomNumberForDivision(config.num1Digits, num2);
  //   num1 = num2 * quotient;
  // } while (countDigits(num1) !== config.num1Digits || num1 === num2);

  // const correctAnswer = Math.floor(num1 / num2);
  // const question = `${num1} ÷ ${num2}`;

  return {
    nums: [2163, 21],
    correctAnswer: '103',
  };
}

// Tạo danh sách bài tập
export function generateExerciseList(config: ExerciseConfig): ExerciseResult[] {
  const exercises: ExerciseResult[] = [];
  const seen = new Set<string>();

  let attempts = 0;

  while (exercises.length < config.totalQuestions) {
    let exercise: ExerciseResult;

    switch (config.operation) {
      case 'addition':
        exercise = generateAdditionExercise(config);
        break;
      case 'subtraction':
        exercise = generateSubtractionExercise(config);
        break;
      case 'multiplication':
        exercise = generateMultiplicationExercise(config);
        break;
      case 'division':
        exercise = generateDivisionExercise(config);
        break;
      default:
        throw new Error('Loại phép tính không hợp lệ');
    }

    const key = `${exercise.nums}`;

    if (!seen.has(key)) {
      seen.add(key);
      exercises.push(exercise);
      attempts = 0;
    } else {
      attempts++;
      if (attempts >= 10) {
        exercises.push(exercise);
        attempts = 0;
      }
    }
  }

  return exercises;
}
