import { CalendarMonthView } from "../components/CalendarMonthView"
import { createSampleCalendarMonth } from "../components/calendar-data"

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <CalendarMonthView initialCalendar={createSampleCalendarMonth()} />
    </main>
  )
}
