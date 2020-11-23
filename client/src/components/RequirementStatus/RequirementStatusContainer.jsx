import React from 'react'

export default function RequirementStatusContainer({listOfStatuses}) {
    const renderStatuses = (statusList) => {
        console.log(statusList);
        var presets = ["satisfied","unsatisfied","WIP","review"];
        return statusList.map((item, i) => {
            console.log(item);
            if(presets.includes(item)){
            return (
            <span key = {i} className={item}>
                {item}
            </span>
            )}
            else{
                return (
                    <span key = {i} className="created-status">
                        {item}
                    </span>
                    )
            }
        });
    }
    return (
        <span className="status-node-container">
            {renderStatuses(listOfStatuses)}
        </span>
    )
}
