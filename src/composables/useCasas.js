import { collection, doc, deleteDoc} from 'firebase/firestore'
import { ref, computed } from 'vue';
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'
import {ref as refStorage, deleteObject} from 'firebase/storage'


export default function useCasas(){

    const db = useFirestore();
    const storage = useFirebaseStorage()
    const piscina = ref(false);
    const habitaciones = ref('')
    const casasCollection = useCollection(collection(db, 'casas'));
    
    


    const deleteCasa = async (id, imageUrl) => {
        const docRef = doc(db, "casas", id);
        const imageRef = refStorage(storage, imageUrl);

        await deleteObject(imageRef);
        await deleteDoc(docRef)
    }

    const casasFiltradas = computed(() => {
        return piscina.value ?
            casasCollection.value.filter(casa => casa.piscina)
            : casasCollection.value
    })
    const formatPrice = (precio) => {
        return Number(precio).toLocaleString('es-ES', {
            style: 'currency',
            currency: 'EUR'
        })
    };
 
    return {
        casasCollection,
        formatPrice,
        piscina,
        casasFiltradas,
        deleteCasa
    }
}