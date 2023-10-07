import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import '../css/LocationEvents.css'
import EventsAPI from '../services/EventsAPI'

const Events = ({index}) => {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const getEvents = async () => {
            const events = await EventsAPI.getAllEvents();
            setEvents(events);
        }
        getEvents();
    }, []);


    return (
        <div className='events'>
           {events && events.map((event) => (
               <Event key={event.id} {...event} />
           ))}
        </div>
    )
}

export default Events