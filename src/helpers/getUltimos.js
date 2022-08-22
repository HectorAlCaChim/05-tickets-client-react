import React from "react";

export const getUltimos = async() => {
    const resp = await fetch('http://localhost:3001/ultimos'); 
    const data = await resp.json();

    return data.ultimos;
}