import { defineStore } from "pinia";
import {useFirebaseAuth} from 'vuefire'
import { ref, computed } from "vue";
import {signInWithEmailAndPassword} from 'firebase/auth'
export const useAuthStore = defineStore('auth', () => {
    const auth = useFirebaseAuth()
    const errorMsg = ref('');
    const hasError = computed(() => {
        return errorMsg.value
    })
    const errorCodes = {
        'auth/user-not-found': 'No existe el usuario',
        'auth/wrong-password': 'Contraseña Incorrecta'
    }
    const login = ({email, password}) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential);
        })
        .catch((error) => {
            errorMsg.value = errorCodes[error.code];
        })
    }

    return {
        login,
        hasError,
        errorMsg
    }
})