import { useState, useEffect } from "react";
import useGeolocation from "../hooks/useGeoLocation";
import { fetchWeatherForecast } from "../api/weatherApi";

function Forecast () {
    const { coords, error, loading } = useGeolocation()
    const [data, setData] = useState<any>(null)

    useEffect(()=>{
        if(!coords) return
        let cancelled:boolean = false;

        (async () =>{
            try {
                const res = await fetchWeatherForecast(coords.latitude, coords.longitude)
                if (!cancelled) setData(res)
            } catch (err) {
                console.error (err)
            }
        })()
        return () => { cancelled = true }
    }, [coords])
    if (loading) return <div>Fetching data</div>
    if (error) return <div>Error: {error}</div>
    
    const now = new Date().getHours();
    const hours = data?.forecast?.forecastday?.[0]?.hour ?? []
    const visibleHours = hours.filter((h:any)=> new Date(h.time).getHours() >= now)


    return (
        <ul>
            {visibleHours.map((h:any) =>(
                    <li key={h.time_epoch}>
                        <div className="forecast-container">
                            <h3>Time: {h.time.slice(11,16)}</h3>
                            <p>Temperature: {h.temp_c}°C</p>
                            <p>Conditions: {h.condition?.text}</p>
                            <p>Chance of rain: {h.chance_of_rain ?? 0}%</p>
                        </div>
                    </li>
            ))}
        </ul>
    )
}

export default Forecast