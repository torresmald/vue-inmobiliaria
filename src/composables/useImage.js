import { computed } from 'vue';
import {uid} from 'uid';
import { ref as refStorage} from 'firebase/storage'
import { useFirebaseStorage, useStorageFile } from 'vuefire'


export default function useImage() {
        
    const storage = useFirebaseStorage();
    const storageRefPath = refStorage(storage, `/casas/${uid()}.jpg`);

    const { url, upload} = useStorageFile(storageRefPath)

    const uploadImage = (event) => {
        const data = event.target.files[0];

        if(data){
            upload(data)
        }
    }

    const isUploaded = computed(() => {
        return url.value ? url.value : null
    })

    return {
        uploadImage,
        isUploaded,
        url
    }
}