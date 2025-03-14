import dayjs from 'https://unpkg.com/dayjs@1.11.13/esm/index.js'

export function futureDate(nom) {
    let deliveryDate = dayjs().add( nom, 'days').format('dddd, MMMM D');
    return deliveryDate;
}