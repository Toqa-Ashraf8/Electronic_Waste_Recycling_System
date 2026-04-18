export const formatTime = (timeString) => {
    if (!timeString) return "--:--";
    const [hours, minutes] = timeString.split(':');
    const h = hours % 12 || 12; 
    const ampm = hours >= 12 ? 'PM' : 'AM';
    return `${h}:${minutes} ${ampm}`;
}