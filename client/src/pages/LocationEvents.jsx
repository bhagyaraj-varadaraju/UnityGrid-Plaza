import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import '../css/LocationEvents.css'
import { useLocation, useParams } from 'react-router-dom'
import LocationsAPI from '../services/LocationsAPI'

const LocationEvents = ({index}) => {
    const {locationId} = useParams();
    const [location, setLocation] = useState([])
    const [events, setEvents] = useState([])

    useEffect(() => {
        const getLocationDetails = async () => {
            const location = await LocationsAPI.getLocationDetails(locationId);
            const locationEvents = await LocationsAPI.getAllEvents(locationId);
            setLocation(location)
            setEvents(locationEvents);
        }
        
        getLocationDetails();
    }, [locationId]);

    if (!location) return null;

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.img_url} />
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p>{location.address}, {location.city}, {location.state} {location.zip}</p>
                </div>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event, index) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.name}
                            date={event.date}
                            time={event.time}
                            image={event.img_url}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents