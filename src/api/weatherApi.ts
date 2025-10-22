const BASE_URL:string = 'https://api.weatherapi.com/v1'
const API_KEY:string = import.meta.env.VITE_WEATHER_API_KEY

export async function fetchWeatherNow(Lat:number, Lan:number) {
    const res = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${Lat},${Lan}&aqi=no`)
    if(!res.ok){
        throw new Error('API Error')
    }
    return res.json()
}

export async function fetchWeatherForecast(Lat:number, Lan:number) {
    const res = await fetch (`${BASE_URL}/forecast.json?key=${API_KEY}&q=${Lat},${Lan}&days=1&aqi=no`)
    if (!res.ok){
        throw new Error('API Error')
    }
    return res.json()
}
