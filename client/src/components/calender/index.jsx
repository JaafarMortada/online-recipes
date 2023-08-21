import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import './styles.css'
import { useState, useEffect } from 'react'
import { sendRequest } from "../../config/request";
import CalenderAnimation from '../../assets/animated/calender';

const MealPlanner = () => {
    
    const [events, setEvents] = useState([])
    
    useEffect(() => {
        const getEventsHandler = async () => {
            try {
                const response = await sendRequest({
                    method: "GET",
                    route: "/api/get_plans",
                });
                setEvents(response.events)
            } catch (error) {
                console.log(error);
            }
        };
        getEventsHandler()
    }, [])
    return (
        <div className='calender-container'>
            <div className='calender-animation-container'>
                <CalenderAnimation/>
            </div>
            
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={events}
            />
        </div>
    );
}

export default MealPlanner;