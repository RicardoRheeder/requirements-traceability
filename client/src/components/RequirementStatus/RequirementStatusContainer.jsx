import React from 'react'

export default function RequirementStatusContainer({listOfStatuses}) {
    const renderStatuses = (statusList) => {
        console.log(statusList);
        return statusList.map((item, i) => {
            console.log(item);
            return (
            <span key = {i} className={item}>
                {item}
            </span>
            )
        });
    }
    return (
        <span className="status-node-container">
            {renderStatuses(listOfStatuses)}
        </span>
    )
}
