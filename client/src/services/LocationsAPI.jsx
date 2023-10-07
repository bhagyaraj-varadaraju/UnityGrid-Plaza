const getAllLocations = async () => {
    try {
        const response = await fetch('http://localhost:3000');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

const getLocationDetails = async (locationId) => {
    try {
        const response = await fetch(`http://localhost:3000/${locationId}`);
        const data = await response.json();
        return data
    } catch(err) {
        console.error(err);
    }
}

const getAllEvents = async (locationId) => {
    try {
        const response = await fetch(`http://localhost:3000/${locationId}/events`);
        return await response.json();
    } catch (err) {
        console.error(err);
    }
};

export default { getAllLocations, getLocationDetails, getAllEvents }
