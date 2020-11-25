import React from 'react'
import { useState } from 'react';

export default function RequirementStatusContainer({listOfStatuses}) {
    const [whiteboxIsOpen,setWhiteboxIsOpen] = useState(false);
    const openStatusSelection = () => {
        setWhiteboxIsOpen(!whiteboxIsOpen)
    }
    const renderStatuses = (statusList) => {
        console.log(statusList);
        var presets = ["satisfied","unsatisfied","WIP","review"];
        return statusList.map((item, i) => {
            console.log(item);
            if(presets.includes(item)){
            return (
            <span key = {i} className={item + " status-icon"}>
                {item}
            </span>
            )}
            else{
                switch(item[1]){
                    case "blue":
                        return (
                            <span key = {i} className="created-status-blue status-icon">
                                {item[0]}
                            </span>
                            )
                    case "red":
                        return (
                            <span key = {i} className="created-status-red status-icon">
                                {item[0]}
                            </span>
                            )
                    case "green":
                        return (
                            <span key = {i} className="created-status-green status-icon">
                                {item[0]}
                            </span>
                            )
                    case "yellow":
                        return (
                            <span key = {i} className="created-status-yellow status-icon">
                                {item[0]}
                            </span>
                            )
                    case "orange":
                        return (
                            <span key = {i} className="created-status-orange status-icon">
                                {item[0]}
                            </span>
                            )
                    case "grey":
                        return (
                            <span key = {i} className="created-status-grey status-icon">
                                {item[0]}
                            </span>
                            )
                    default:
                        return (
                            <span key = {i} className="created-status-grey status-icon">
                                {item[0]}
                            </span>
                            )
                }
                
            }
        });
    }
    return (
        <span className="status-node-container">
            <button className="add-status-button" onClick={()=>{openStatusSelection()}}>+</button>
            {whiteboxIsOpen==true ? <div className="white-box"></div> : <></>}
            {listOfStatuses != null ? renderStatuses(listOfStatuses) : ""}
        </span>
    )
}
