import { collection } from 'firebase/firestore'
import { useFirestore, useCollection } from 'vuefire'

export default function useCasas(){

    const db = useFirestore();

    const casasCollection = useCollection(collection(db, 'casas'))

    const formatPrice = (precio) => {
        return Number(precio).toLocaleString('es-ES', {
            style: 'currency',
            currency: 'EUR'
        })
    };

    const editarCasa = () => {
        console.log('editando...');
    }
 
    return {
        casasCollection,
        formatPrice
    }
}