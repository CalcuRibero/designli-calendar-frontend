"use client"

import { useMemo, useState } from "react"
import { CalendarMonth, Day, Slot } from "./calendar-model"

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const formatMonthName = (month: number) =>
  new Date(2024, month - 1, 1).toLocaleString("en-US", { month: "long" })

const getWeekday = (dateString: string) => new Date(dateString).getDay()

const createSlotId = () => typeof crypto !== "undefined" && "randomUUID" in crypto
  ? crypto.randomUUID()
  : `slot-${Math.random().toString(36).slice(2, 10)}`

interface CalendarMonthViewProps {
  initialCalendar: CalendarMonth
}

export function CalendarMonthView({ initialCalendar }: CalendarMonthViewProps) {
  const [calendar, setCalendar] = useState<CalendarMonth>(initialCalendar)
  const [selectedDate, setSelectedDate] = useState<string>(calendar.days[0]?.date ?? "")
  const [description, setDescription] = useState("")
  const [startTime, setStartTime] = useState("09:00")
  const [durationMinutes, setDurationMinutes] = useState(30)

  const selectedDay = useMemo(
    () => calendar.days.find((day) => day.date === selectedDate) ?? calendar.days[0],
    [calendar.days, selectedDate],
  )

  const leadingBlankDays = useMemo(() => {
    if (!calendar.days.length) return []
    const firstWeekday = getWeekday(calendar.days[0].date)
    return Array.from({ length: firstWeekday }, (_, index) => index)
  }, [calendar.days])

  const handleAddSlot = () => {
    if (!selectedDay || !description.trim()) return

    const newSlot: Slot = {
      id: createSlotId(),
      description: description.trim(),
      startTime,
      durationMinutes,
    }

    setCalendar((current) => ({
      ...current,
      days: current.days.map((day) =>
        day.date === selectedDay.date
          ? { ...day, slots: [...day.slots, newSlot].sort((a, b) => a.startTime.localeCompare(b.startTime)) }
          : day,
      ),
    }))
    setDescription("")
    setDurationMinutes(30)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm ring-1 ring-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-zinc-700/50">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
              Calendar month
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              {formatMonthName(calendar.month)} {calendar.year}
            </h1>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Manage daily time slots and keep user availability organized.
            </p>
          </div>
          <div className="rounded-3xl bg-zinc-100 px-4 py-3 text-sm text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            Selected date: <span className="font-semibold text-zinc-950 dark:text-zinc-100">{selectedDay?.date}</span>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.8fr_1.2fr]">
          <section className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
              {weekdayLabels.map((label) => (
                <div key={label}>{label}</div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-7 gap-2">
              {leadingBlankDays.map((blank) => (
                <div key={`blank-${blank}`} className="min-h-[96px] rounded-3xl border border-transparent bg-transparent" />
              ))}
              {calendar.days.map((day) => {
                const weekday = getWeekday(day.date)
                const isSelected = day.date === selectedDay?.date

                return (
                  <button
                    key={day.date}
                    type="button"
                    onClick={() => setSelectedDate(day.date)}
                    className={`group min-h-[96px] rounded-3xl border p-3 text-left transition duration-150 ${
                      isSelected
                        ? "border-blue-500 bg-blue-50 text-blue-900 shadow-sm dark:border-blue-400 dark:bg-blue-950/70 dark:text-blue-100"
                        : "border-zinc-200 bg-white text-zinc-900 hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold">{Number(day.date.slice(-2))}</span>
                      <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-zinc-500 dark:text-zinc-400">
                        {weekdayLabels[weekday]}
                      </span>
                    </div>
                    <div className="mt-4 space-y-2 text-xs leading-5 text-zinc-600 dark:text-zinc-300">
                      {day.slots.length > 0 ? (
                        day.slots.slice(0, 3).map((slot) => (
                          <div key={slot.id} className="rounded-2xl bg-zinc-100 p-2 dark:bg-zinc-800">
                            <p className="font-medium text-zinc-900 dark:text-zinc-100">{slot.description}</p>
                            <p>{slot.startTime}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-zinc-400">No slots</p>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </section>

          <aside className="space-y-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">Daily slots</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Edit availability and add new bookings for {selectedDay?.date}.
              </p>
            </div>

            <div className="space-y-4">
              {selectedDay?.slots.length ? (
                selectedDay.slots.map((slot) => (
                  <div key={slot.id} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-zinc-950 dark:text-zinc-50">{slot.description}</p>
                      <span className="rounded-full bg-zinc-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                        {slot.durationMinutes} min
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Starts at {slot.startTime}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
                  No slots scheduled for this day yet.
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">Add new slot</h3>
              <div className="mt-4 space-y-4">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Description
                  <input
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-blue-400 dark:focus:ring-blue-900/40"
                    placeholder="Team sync, review, call..."
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Start time
                    <input
                      type="time"
                      value={startTime}
                      onChange={(event) => setStartTime(event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-blue-400 dark:focus:ring-blue-900/40"
                    />
                  </label>

                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Duration (minutes)
                    <input
                      type="number"
                      min={15}
                      step={15}
                      value={durationMinutes}
                      onChange={(event) => setDurationMinutes(Number(event.target.value))}
                      className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-blue-400 dark:focus:ring-blue-900/40"
                    />
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleAddSlot}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-950"
                >
                  Add slot
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
