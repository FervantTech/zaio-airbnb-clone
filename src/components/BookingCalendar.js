const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function parseDate(value) {
    return value ? new Date(`${value}T00:00:00`) : null;
}

function toDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function getCalendarDays(monthDate) {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = Array(firstWeekday).fill(null);

    for (let day = 1; day <= daysInMonth; day += 1) {
        cells.push(new Date(year, month, day));
    }

    return cells;
}

function MonthCalendar({ monthDate, checkIn, checkOut }) {
    const start = parseDate(checkIn);
    const end = parseDate(checkOut);
    const monthName = new Intl.DateTimeFormat("en", {
        month: "long",
        year: "numeric",
    }).format(monthDate);

    return (
        <div className="calendar-month">
            <h3>{monthName}</h3>
            <div className="calendar-grid calendar-weekdays">
                {DAY_NAMES.map((day) => <span key={day}>{day}</span>)}
            </div>
            <div className="calendar-grid">
                {getCalendarDays(monthDate).map((date, index) => {
                    if (!date) return <span key={`empty-${index}`} />;

                    const key = toDateKey(date);
                    const isEdge = key === checkIn || key === checkOut;
                    const isInRange = start && end && date > start && date < end;

                    return (
                        <span
                            className={`calendar-day ${isEdge ? "calendar-day-selected" : ""} ${isInRange ? "calendar-day-range" : ""}`}
                            key={key}
                        >
                            {date.getDate()}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

function BookingCalendar({ location, checkIn, checkOut, onClearDates }) {
    const start = parseDate(checkIn);
    const end = parseDate(checkOut);
    const nights = start && end ? Math.max(0, (end - start) / 86400000) : 0;
    const firstMonth = start || new Date();
    const secondMonth = new Date(firstMonth.getFullYear(), firstMonth.getMonth() + 1, 1);
    const dateFormatter = new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (
        <section className="information-section booking-calendar-section">
            <h2>
                {nights > 0
                    ? `${nights} ${nights === 1 ? "night" : "nights"} in ${location}`
                    : `Select dates for your stay in ${location}`}
            </h2>
            <p className="calendar-date-summary">
                {start && end
                    ? `${dateFormatter.format(start)} – ${dateFormatter.format(end)}`
                    : "Choose your dates in the booking section."}
            </p>
            <div className="booking-calendars">
                <MonthCalendar monthDate={firstMonth} checkIn={checkIn} checkOut={checkOut} />
                <MonthCalendar monthDate={secondMonth} checkIn={checkIn} checkOut={checkOut} />
            </div>
            {(checkIn || checkOut) && (
                <button className="clear-dates-button" type="button" onClick={onClearDates}>
                    Clear dates
                </button>
            )}
        </section>
    );
}

export default BookingCalendar;
