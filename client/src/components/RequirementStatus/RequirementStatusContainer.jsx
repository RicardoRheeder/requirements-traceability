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
                switch(item[1]){
                    case "blue":
                        return (
                            <span key = {i} className="created-status-blue">
                                {item[0]}
                            </span>
                            )
                    case "red":
                        return (
                            <span key = {i} className="created-status-red">
                                {item[0]}
                            </span>
                            )
                    case "green":
                        return (
                            <span key = {i} className="created-status-green">
                                {item[0]}
                            </span>
                            )
                    case "yellow":
                        return (
                            <span key = {i} className="created-status-yellow">
                                {item[0]}
                            </span>
                            )
                    case "orange":
                        return (
                            <span key = {i} className="created-status-orange">
                                {item[0]}
                            </span>
                            )
                    case "grey":
                        return (
                            <span key = {i} className="created-status-grey">
                                {item[0]}
                            </span>
                            )
                    default:
                        return (
                            <span key = {i} className="created-status-grey">
                                {item[0]}
                            </span>
                            )
                }
                
            }
        });
    }
    return (
        <span className="status-node-container">
            {renderStatuses(listOfStatuses)}
        </span>
    )
}
