import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import './styles.css'
const MealPlanner = () => {
    
    return (
        
        <div className='calender-container'>
            <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            events={[
                { title: 'event 1', date: '2023-08-05' },
                { title: 'event 2', date: '2023-08-02' },
                { title: 'event 3', date: '2023-08-02' },
                { title: 'event 4', date: '2023-08-15' },
                { title: 'event 5', date: '2023-08-19' },
                { title: 'event 6', date: '2023-08-25' },
            ]}
            
        />
        </div>
        
    );
}

export default MealPlanner;