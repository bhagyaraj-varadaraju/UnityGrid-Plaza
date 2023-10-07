const getAllEvents = async () => {
    try {
        const response = await fetch('http://localhost:3000/events');
        return await response.json();
    } catch (err) {
        console.error(err);
    }
}

const getEventById = async (eventId) => {
    try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`);
        return await response.json();
    } catch (err) {
        console.error(err);
    }
}

export default { getAllEvents, getEventById }