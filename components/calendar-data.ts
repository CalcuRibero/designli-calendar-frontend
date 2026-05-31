import { CalendarMonth, Day, Slot } from "./calendar-model"

const pad = (value: number) => String(value).padStart(2, "0")

const createDay = (year: number, month: number, day: number, slots: Slot[] = []): Day => ({
  date: `${year}-${pad(month)}-${pad(day)}`,
  slots,
})

const sampleSlots: Record<string, Slot[]> = {
  "2026-05-03": [
    { id: "slot-1", description: "Sales standup", startTime: "09:30", durationMinutes: 30 },
  ],
  "2026-05-12": [
    { id: "slot-2", description: "Client sync", startTime: "14:00", durationMinutes: 45 },
  ],
  "2026-05-18": [
    { id: "slot-3", description: "Project review", startTime: "11:00", durationMinutes: 60 },
  ],
}

export function createSampleCalendarMonth(year = 2026, month = 5): CalendarMonth {
  const daysInMonth = new Date(year, month, 0).getDate()
  const days = Array.from({ length: daysInMonth }, (_, index) => {
    const dayNumber = index + 1
    const date = `${year}-${pad(month)}-${pad(dayNumber)}`
    return createDay(year, month, dayNumber, sampleSlots[date] ?? [])
  })

  return { year, month, days }
}
