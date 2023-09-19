export const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: '2-digit', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
};

export const getLastDayOfThisMonth = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth() + 1, 0);
}

export const  isLastDayOfThisMonth = (endDate : string) => {
    return endDate === formatDateToISOString(getLastDayOfThisMonth());
};

export const formatDateToISOString = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // pad with 0 for single digit months
    const day = date.getDate().toString().padStart(2, '0'); // pad with 0 for single digit days
    return `${year}-${month}-${day}`;
}