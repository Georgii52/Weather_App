import { useEffect, useState } from "react";

function useGeolocation (options?: PositionOptions) {
    const [coords, setCoords] = useState<GeolocationCoordinates | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        if (!navigator.geolocation){
            setError ("No geolocation")
            setLoading (false)
            return
        }
        navigator.geolocation.getCurrentPosition(
            (pos)=>{
                setCoords(pos.coords)
                setLoading(false)
            },
            (err)=>{
                setError(err.message)
                setLoading(false)
            },
            { enableHighAccuracy: true, timeout: 10000, ...options }
        )
    }, [options])

    return { coords, error, loading }
}

export default useGeolocation