export const deliveryOptions = [{
    id: 1,
    deliveryDays: 3,
    priceCents: 0
}, {
    id: 2,
    deliveryDays: 1,
    priceCents: 500
}, {
    id: 3,
    deliveryDays: 0,
    priceCents: 1000
}]

export function getDeliveryOpt(id) {
    let deliveryOpt = deliveryOptions.find((opt) => opt.id === Number(id));
    return deliveryOpt ||  deliveryOptions[0];
}