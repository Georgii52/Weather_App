import { useState } from "react";
import { useEffect } from "react";

function Clock () {

    const [time, setTime] = useState (new Date());
    
    useEffect (()=>{
        const intervalId = setInterval(()=>{
            setTime(new Date())
        }, 1000)
        return ()=>{
            clearInterval(intervalId)
        }
    }, [])

    function format(): string {
        const hours: number = time.getHours()
        const minutes: number = time.getMinutes()
        const seconds: number = time.getSeconds()
        const hh = String(hours).padStart(2, '0')
        const mm = String(minutes).padStart(2, '0')
        const ss = String(seconds).padStart(2, '0')
        return `${hh}:${mm}:${ss}`
    }

    return (
        <div className='clock-container'>
            <div className="clock">
                <span>{format()}</span>
            </div>
        </div>
    )
}

export default Clock