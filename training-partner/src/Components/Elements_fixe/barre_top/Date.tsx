import React, { useEffect, useState } from "react";

function CurrentDate(){
    const[date, setDate] = useState(new Date());

    useEffect(() => {
        const timerID=setInterval(() => {
            setDate(new Date());
        },1000);

        return () => {
            clearInterval(timerID);
        }
    },[]);

        return (
            <div>
                <p>{date.toLocaleDateString()} </p>
            </div>
        )
}

export default CurrentDate;