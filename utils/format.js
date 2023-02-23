import moment from 'moment';

export const formatDate=(date)=>{
    const newDate = moment(date)
    return newDate.format('HH:mm a | MMMM Do')
}