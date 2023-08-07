import { ref } from "vue";

export default function useLocationMap() {

    const zoom = ref(30);

    const center = ref([40.190904294879104, -3.670920877387708])

    const pin = (event) => {
        const marker = event.target.getLatLng();
        center.value = [marker.lat, marker.lng]
    }
    return {
        center,
        zoom,
        pin
    }
}