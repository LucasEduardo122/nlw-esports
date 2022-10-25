module.exports = {
     convertHour(hourString) {
        const [hours, minutes] = hourString.split(':').map(Number);
    
        const MinutesAmount = (hours * 60) + minutes;
    
        return String(MinutesAmount);
    },

    convertMinutesHour(minutesString) {
        const hours = Math.floor(minutesString / 60)
        const minutes = minutesString % 60

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
    }
}