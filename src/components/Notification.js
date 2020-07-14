import React from 'react'

const Notification = ({ message }) => {
    const { msg, err } = message
    if(!msg){
        return null
    }

    return (
        <div className={err ? "notification error" : "notification"}>
            {msg}
        </div>
    )
}

export default Notification