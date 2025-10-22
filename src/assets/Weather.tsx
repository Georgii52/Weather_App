import { useEffect, useState } from "react"
import useGeolocation from '../hooks/useGeoLocation'
import { fetchWeatherNow } from "../api/weatherApi"

function Weather () {
    const { coords, error, loading } = useGeolocation()
    const [data, setData] = useState<any>(null)

    useEffect(()=> {
        if (!coords) return
        let cancelled:boolean = false;

        (async () => {
            try {
                const res=await fetchWeatherNow(coords.latitude, coords.longitude)
                if (!cancelled) setData(res)
                } catch (err) {
                    console.error (err)
                }
        })()
        return () => { cancelled = true}
    }, [coords])
    if (loading) return <div>Fetching data</div>
    if (error) return <div>Error: {error}</div>
    
    return (
        <div className="weather-data">
            {data ? (
                <>
                <p>City: {data.location.name}</p>
                <p>Country: {data.location.country}</p>
                <p>Temperature: {data.current.temp_c}°C</p>
                <p>Conditions: {data.current.condition.text}</p>
                </>
            ) : 'Loading data'}
        </div>
    )

}

export default Weather