export const formatPrice = (precio) => {
    return Number(precio).toLocaleString('es-ES', {
        style: 'currency',
        currency: 'EUR'
    })
};