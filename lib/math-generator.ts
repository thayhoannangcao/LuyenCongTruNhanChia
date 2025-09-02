// Các loại phép tính
export type OperationType = 'addition' | 'subtraction' | 'multiplication' | 'division'

// Các phạm vi cho phép cộng
export type AdditionRange = 10 | 20 | 100

// Loại phép cộng (có nhớ hoặc không nhớ)
export type AdditionType = 'with_carry' | 'without_carry'

// Cấu hình bài tập
export interface ExerciseConfig {
  operation: OperationType
  num1Digits: number
  num2Digits: number
  totalQuestions: number
  additionRange?: AdditionRange
  additionType?: AdditionType
}

// Kết quả bài tập
export interface ExerciseResult {
  question: string
  correctAnswer: string
  userAnswer?: string
  isCorrect?: boolean
}

// Tạo số ngẫu nhiên với số chữ số cho trước
export function generateRandomNumber(digits: number): number {
  const min = Math.pow(10, digits - 1)
  const max = Math.pow(10, digits) - 1
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Tạo số ngẫu nhiên cho phép chia
export function generateRandomNumberForDivision(digits: number, divisor: number): number {
  const min = Math.pow(10, digits - 1)
  const max = Math.pow(10, digits) - 1
  const minDivided = min / divisor
  const maxDivided = max / divisor

  const randomDivided = Math.random() * (maxDivided - minDivided) + minDivided
  const result = Math.floor(randomDivided)

  return result === 0 ? 1 : result
}

// Đếm số chữ số của một số
export function countDigits(num: number): number {
  if (num === 0) return 1
  
  let count = 0
  while (num > 0) {
    num = Math.floor(num / 10)
    count += 1
  }
  return count
}

// Kiểm tra phép cộng có nhớ hay không
export function hasCarry(num1: number, num2: number): boolean {
  const str1 = num1.toString()
  const str2 = num2.toString()
  
  const maxLength = Math.max(str1.length, str2.length)
  
  for (let i = 0; i < maxLength; i++) {
    const digit1 = parseInt(str1[str1.length - 1 - i] || '0')
    const digit2 = parseInt(str2[str2.length - 1 - i] || '0')
    
    if (digit1 + digit2 >= 10) {
      return true
    }
  }
  
  return false
}

// Tạo số cho phép cộng trong phạm vi cụ thể
export function generateNumbersForAddition(
  range: AdditionRange, 
  type: AdditionType
): { num1: number; num2: number } {
  let num1: number, num2: number
  
  do {
    switch (range) {
      case 10:
        num1 = Math.floor(Math.random() * 10) + 1
        num2 = Math.floor(Math.random() * 10) + 1
        break
      case 20:
        num1 = Math.floor(Math.random() * 20) + 1
        num2 = Math.floor(Math.random() * 20) + 1
        break
      case 100:
        num1 = Math.floor(Math.random() * 100) + 1
        num2 = Math.floor(Math.random() * 100) + 1
        break
    }
  } while (
    num1 + num2 > range || 
    (type === 'with_carry' && !hasCarry(num1, num2)) ||
    (type === 'without_carry' && hasCarry(num1, num2))
  )
  
  return { num1, num2 }
}

// Tạo bài tập phép cộng
export function generateAdditionExercise(config: ExerciseConfig): ExerciseResult {
  let num1: number, num2: number
  
  if (config.additionRange && config.additionType) {
    const numbers = generateNumbersForAddition(config.additionRange, config.additionType)
    num1 = numbers.num1
    num2 = numbers.num2
  } else {
    num1 = generateRandomNumber(config.num1Digits)
    num2 = generateRandomNumber(config.num2Digits)
  }
  
  const correctAnswer = num1 + num2
  const question = `${num1} + ${num2}`
  
  return {
    question,
    correctAnswer: correctAnswer.toString(),
  }
}

// Tạo bài tập phép trừ
export function generateSubtractionExercise(config: ExerciseConfig): ExerciseResult {
  let num1: number, num2: number
  
  do {
    num1 = generateRandomNumber(config.num1Digits)
    num2 = generateRandomNumber(config.num2Digits)
  } while (num1 <= num2) // Đảm bảo kết quả không âm
  
  const correctAnswer = num1 - num2
  const question = `${num1} - ${num2}`
  
  return {
    question,
    correctAnswer: correctAnswer.toString(),
  }
}

// Tạo bài tập phép nhân
export function generateMultiplicationExercise(config: ExerciseConfig): ExerciseResult {
  const num1 = generateRandomNumber(config.num1Digits)
  const num2 = generateRandomNumber(config.num2Digits)
  const correctAnswer = num1 * num2
  const question = `${num1} × ${num2}`
  
  return {
    question,
    correctAnswer: correctAnswer.toString(),
  }
}

// Tạo bài tập phép chia
export function generateDivisionExercise(config: ExerciseConfig): ExerciseResult {
  let num1: number, num2: number
  
  do {
    num2 = generateRandomNumber(config.num2Digits)
    if (num2 === 1) continue
    
    const quotient = generateRandomNumberForDivision(config.num1Digits, num2)
    num1 = num2 * quotient
  } while (countDigits(num1) !== config.num1Digits || num1 === num2)
  
  const correctAnswer = Math.floor(num1 / num2)
  const question = `${num1} ÷ ${num2}`
  
  return {
    question,
    correctAnswer: correctAnswer.toString(),
  }
}

// Tạo danh sách bài tập
export function generateExerciseList(config: ExerciseConfig): ExerciseResult[] {
  const exercises: ExerciseResult[] = []
  
  for (let i = 0; i < config.totalQuestions; i++) {
    let exercise: ExerciseResult
    
    switch (config.operation) {
      case 'addition':
        exercise = generateAdditionExercise(config)
        break
      case 'subtraction':
        exercise = generateSubtractionExercise(config)
        break
      case 'multiplication':
        exercise = generateMultiplicationExercise(config)
        break
      case 'division':
        exercise = generateDivisionExercise(config)
        break
      default:
        throw new Error('Loại phép tính không hợp lệ')
    }
    
    exercises.push(exercise)
  }
  
  return exercises
}
