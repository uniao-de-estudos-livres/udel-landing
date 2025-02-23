'use client'

import { useState } from 'react'
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CalendarProps {
  activityDates?: Date[]
}

export function CustomCalendar({ activityDates = [] }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  // Get array of months to display
  const getMonths = () => {
    const months = []
    for (let i = 0; i < 4; i++) {
      const date = new Date(currentDate)
      date.setMonth(currentDate.getMonth() - (3 - i))
      months.push(date)
    }
    return months
  }

  // Get days in a month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const days = new Date(year, month + 1, 0).getDate()
    const firstDay = new Date(year, month, 1).getDay()
    return { days, firstDay }
  }

  // Check if a date has activity
  const hasActivity = (date: Date) => {
    return activityDates.some(activityDate => 
      activityDate.getDate() === date.getDate() &&
      activityDate.getMonth() === date.getMonth() &&
      activityDate.getFullYear() === date.getFullYear()
    )
  }

  // Format month name
  const formatMonth = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(date)
  }

  const months = getMonths()

  return (
    <div className="w-full bg-zinc-900 text-zinc-400 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => {
            const newDate = new Date(currentDate)
            newDate.setMonth(currentDate.getMonth() - 1)
            setCurrentDate(newDate)
          }}
          className="text-zinc-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="grid grid-cols-4 gap-4 flex-1 px-4">
          {months.map((month) => (
            <div key={month.getTime()} className="text-center">
              <span className="text-sm">
                {formatMonth(month)} ({month.getFullYear()})
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            const newDate = new Date(currentDate)
            newDate.setMonth(currentDate.getMonth() + 1)
            setCurrentDate(newDate)
          }}
          className="text-zinc-400 hover:text-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {months.map((month) => {
          const { days, firstDay } = getDaysInMonth(month)
          const daysArray = Array.from({ length: days }, (_, i) => i + 1)
          const emptyDays = Array.from({ length: firstDay }, (_, i) => null)

          return (
            <div key={month.getTime()} className="grid grid-cols-7 gap-1">
              {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => (
                <div key={i} className="h-8 flex items-center justify-center text-xs text-zinc-600">
                  {day}
                </div>
              ))}
              
              {emptyDays.map((_, i) => (
                <div key={`empty-${i}`} className="h-8" />
              ))}
              
              {daysArray.map((day) => {
                const date = new Date(month.getFullYear(), month.getMonth(), day)
                const isToday = new Date().toDateString() === date.toDateString()
                const hasActivityOnDay = hasActivity(date)

                return (
                  <div
                    key={day}
                    className={cn(
                      "h-8 flex items-center justify-center text-sm rounded-full transition-colors",
                      hasActivityOnDay && "bg-purple-500/20 text-purple-400",
                      isToday && "bg-purple-500 text-white",
                      !hasActivityOnDay && !isToday && "hover:bg-zinc-800"
                    )}
                  >
                    {day}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

