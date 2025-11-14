import axios from 'axios';
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });
export const fetchEvents = (start, end) => API.get(`/events?start=${start.toISOString()}&end=${end.toISOString()}`).then(r => r.data);
export const createEvent = (ev) => API.post('/events', ev).then(r => r.data);
export const updateEvent = (id, ev) => API.put(`/events/${id}`, ev).then(r => r.data);
export const deleteEvent = (id) => API.delete(`/events/${id}`).then(r => r.data);
