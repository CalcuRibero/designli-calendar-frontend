export interface Slot {
  id: string
  description: string
  startTime: string // "HH:mm"
  durationMinutes: number
}

export interface Day {
  date: string // ISO 8601 "YYYY-MM-DD"
  slots: Slot[]
}

export interface CalendarMonth {
  year: number
  month: number // 1–12
  days: Day[]
}
