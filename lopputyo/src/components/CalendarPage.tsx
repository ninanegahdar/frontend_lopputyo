import { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { fi } from 'date-fns/locale';
import { getTrainingsWithCustomer } from '../api/trainingApi';

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: { fi },
    });

export default function CalendarPage() {
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
    getTrainingsWithCustomer()
        .then(data => {
        const trainings = data._embedded?.trainings || data;

        const mappedEvents = trainings.map((t: any) => ({
            title: t.activity,
            start: new Date(t.date),
            end: new Date(new Date(t.date).getTime() + (t.duration || 60) * 60000),
        }));

        setEvents(mappedEvents);
        console.log('Kalenterin eventit:', mappedEvents);
    })
        .catch(err => console.error(err));
    }, []);

    return (
    <div style={{ height: 600, margin: '20px' }}>
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView="week"
            views={['month', 'week', 'day']}
            defaultDate={new Date()}
            />
    </div>
    );
}
