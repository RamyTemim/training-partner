import React, { useEffect, useState } from "react";

const LifeCycle = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log("[LifeCycle] componentDidMount");
        return () => {
            console.log("[LifeCycle] composentWillUnmount");
        }
    },[]);

    useEffect(() => {
        console.log("[LifeCycle] componentDidUpdate");
    },[count])

    const handleClick = () => {
        setCount(count+1);
    }

    return (
        <div>
            <p>Count : {count}</p>
            <button onClick={handleClick}>Incrément</button>
        </div>
    );
}

export default LifeCycle;