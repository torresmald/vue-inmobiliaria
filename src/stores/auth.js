import { defineStore } from "pinia";
import { useFirebaseAuth } from 'vuefire'
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
    const auth = useFirebaseAuth();
    const authUser = ref(null);
    const errorMsg = ref('');
    const router = useRouter()
    const hasError = computed(() => {
        return errorMsg.value
    })

    onMounted(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                authUser.value = user
            }

        })
    })
    const errorCodes = {
        'auth/user-not-found': 'No existe el usuario',
        'auth/wrong-password': 'Contraseña Incorrecta'
    }
    const login = ({ email, password }) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                authUser.value = userCredential.user;
                router.push('/admin/casas')
            })
            .catch((error) => {
                errorMsg.value = errorCodes[error.code];
                setTimeout(() => {
                    errorMsg.value = ''
                }, 2000);
            })
    }

    const logout = () => {
        signOut(auth)
            .then(() => {
                authUser.value = null;
                router.push('/login')
            })
            .catch((error) => console.log(error))
    }
    const isLogged = computed(() => {
        return authUser.value
    });

    return {
        login,
        hasError,
        errorMsg,
        authUser,
        isLogged,
        logout
    }
})