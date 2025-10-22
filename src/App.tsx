import Header from "./assets/Header"
import Clock from "./assets/Clock"
import Weather from "./assets/Weather"
import Forecast from "./assets/Forecast"
import { useState } from "react"


function App() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleRefresh = ()=> {
    setRefreshKey (prev=> prev+1)
  }

  return(
    <>
      <Header onRefresh={handleRefresh}/>
      <Clock />
      <Weather key={`weather-${refreshKey}`}/>
      <Forecast key={`forecast-${refreshKey}`}/>
    </>
  )
}

export default App
