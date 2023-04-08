import React, { useEffect, useState } from "react";



function CurrentDate(){
    const [date,setDate] = useState("");

    useEffect(() => {
        fetch('http://localhost:3001/date')
        .then(response =>response.text())
        .then((data) =>{
            setDate(data);
        })
        console.log(date)
    },[]);

        return (
            <>
            {date}
            </>
        )
}

export default CurrentDate;