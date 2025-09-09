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
export interface MultiplicationSettings {}

// Cấu hình bài tập phép chia
export interface DivisionSettings {}

// Cấu hình bài tập
export interface ExerciseConfig {
  operation: OperationType;
  additionSettings: AdditionSettings;
  subtractionSettings: SubtractionSettings;
  multiplicationSettings: MultiplicationSettings;
  divisionSettings: DivisionSettings;
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
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
  }

  const numsDigitsArray = (numsDigits as unknown as string)
    .split(',')
    .map(Number);
  const maxWhileLoop = 50;
  let indexWhileLoop = 0;
  let errorMessage = '';

  do {
    indexWhileLoop++;

    if (indexWhileLoop > maxWhileLoop) {
      errorMessage =
        'Không tạo được bài tập, vui lòng thử lại hoặc kiểm tra lại cài đặt';
      break;
    }

    switch (additionSettings.additionRangeType) {
      case 1:
        for (let i = 0; i < numTerms; i++) {
          nums[i] = generateRandomNumber(numsDigitsArray[i]);
        }
        break;
      case 2:
        for (let i = 0; i < numTerms; i++) {
          nums[i] = generateRandomNumber(numsDigitsArray[i]);
        }
        break;
      case 3:
        for (let i = 0; i < numTerms; i++) {
          if (
            countDigits(additionSettings.additionRangeValue || rangeValue) ===
            numsDigitsArray[i]
          ) {
            nums[i] = generateRandomNumberWithMaxAndDigits(
              additionSettings.additionRangeValue || rangeValue,
              numsDigitsArray[i]
            );
          } else {
            nums[i] = generateRandomNumber(numsDigitsArray[i]);
          }
        }
        break;
    }
  } while (
    nums.reduce((a, b) => a + b, 0) >
      (additionSettings.additionRangeType == 3 &&
      additionSettings.additionRangeValue
        ? additionSettings.additionRangeValue
        : rangeValue) ||
    (additionSettings.additionType === 'with_carry' && !hasCarry(nums)) ||
    (additionSettings.additionType === 'without_carry' && hasCarry(nums))
  );

  return { nums, errorMessage };
  // return { nums: [1,2,3,4] }
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

// Tạo bài tập phép trừ
export function generateSubtractionExercise(
  config: ExerciseConfig
): ExerciseResult {
  let num1: number, num2: number;

  do {
    num1 = generateRandomNumber(config.num1Digits);
    num2 = generateRandomNumber(config.num2Digits);
  } while (num1 <= num2); // Đảm bảo kết quả không âm

  const correctAnswer = num1 - num2;
  const question = `${num1} - ${num2}`;

  return {
    question,
    correctAnswer: correctAnswer.toString(),
  };
}

// Tạo bài tập phép nhân
export function generateMultiplicationExercise(
  config: ExerciseConfig
): ExerciseResult {
  const num1 = generateRandomNumber(config.num1Digits);
  const num2 = generateRandomNumber(config.num2Digits);
  const correctAnswer = num1 * num2;
  const question = `${num1} × ${num2}`;

  return {
    question,
    correctAnswer: correctAnswer.toString(),
  };
}

// Tạo bài tập phép chia
export function generateDivisionExercise(
  config: ExerciseConfig
): ExerciseResult {
  let num1: number = 0,
    num2: number;

  do {
    num2 = generateRandomNumber(config.num2Digits);
    if (num2 === 1) continue;

    const quotient = generateRandomNumberForDivision(config.num1Digits, num2);
    num1 = num2 * quotient;
  } while (countDigits(num1) !== config.num1Digits || num1 === num2);

  const correctAnswer = Math.floor(num1 / num2);
  const question = `${num1} ÷ ${num2}`;

  return {
    question,
    correctAnswer: correctAnswer.toString(),
  };
}

// Tạo danh sách bài tập
export function generateExerciseList(config: ExerciseConfig): ExerciseResult[] {
  const exercises: ExerciseResult[] = [];

  for (let i = 0; i < config.totalQuestions; i++) {
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

    exercises.push(exercise);
  }

  return exercises;
}
