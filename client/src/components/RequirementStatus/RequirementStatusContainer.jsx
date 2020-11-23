import React from 'react'

export default function RequirementStatusContainer({listOfStatuses}) {
    const renderStatuses = (statusList) => {
        console.log(statusList);
        return statusList.map((item, i) => {
            console.log(item);
            return (
            <span>
            <span key = {i} className="status-node">
                {item}
            </span>
            </span>
            )
        });
    }
    return (
        <span className="status-node-container">
            {renderStatuses(listOfStatuses)}
            <button className="add-status-button">+</button>
        </span>
    )
}
