'use client'

import { useState, useEffect } from 'react'
import type { ExerciseResult } from '@/lib/math-generator'

interface SimpleExerciseProps {
  exercise: ExerciseResult
  onAnswer: (isCorrect: boolean) => void
  onNext: () => void
}

export default function SimpleExercise({ exercise, onAnswer, onNext }: SimpleExerciseProps) {
  console.log(exercise)
  const [userAnswer, setUserAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  useEffect(() => {
    setUserAnswer('')
    setShowResult(false)
  }, [exercise])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!userAnswer.trim()) {
      alert('Vui lòng nhập đáp án')
      return
    }

    const correct = userAnswer.trim() === exercise.correctAnswer
    setIsCorrect(correct)
    setShowResult(true)
    onAnswer(correct)

    // Tự động chuyển câu tiếp theo sau 2 giây
    setTimeout(() => {
      onNext()
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any)
    }
  }

  return (
    <div className="mx-auto bg-white p-6 rounded-lg shadow-md w-full">
      {/* <h2 className="text-6xl font-bold text-center mb-6">Phép tính</h2> */}
      
      <div className="text-center mb-8">
        <div className="text-4xl font-bold mb-4">
          {exercise.question} = ?
        </div>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập đáp án"
            className="w-full text-2xl text-center py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            autoFocus
            disabled={showResult}
          />
          
          {!showResult && (
            <button
              type="submit"
              className="mt-4 w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              Kiểm tra
            </button>
          )}
        </form>
      </div>

      {showResult && (
        <div className={`text-center p-4 rounded-md ${
          isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          <div className="text-lg font-semibold mb-2">
            {isCorrect ? 'Chính xác! 🎉' : 'Sai rồi! 😔'}
          </div>
          <div className="text-sm">
            Đáp án đúng: {exercise.correctAnswer}
          </div>
        </div>
      )}
    </div>
  )
}
