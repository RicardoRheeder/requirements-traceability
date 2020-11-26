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
        <div className="requirement-status-field">
        <span className="status-node-container">
            <button className="add-status-button" onClick={()=>{openStatusSelection()}}>+</button>
            {listOfStatuses != null ? renderStatuses(listOfStatuses) : ""}
        </span>
            <div className="white-box-container">
                {whiteboxIsOpen==true ? <div className="white-box">
                    <div>
                        <span className="status-input-span status-span">
                            Status Name:
                            <input className="status-name-input"></input>
                        </span>
                        <br />
                        <span className="colour-select-span status-span">
                            Status Colour:
                            <button className="blue-select colour-button"></button>
                            <button className="red-select colour-button"></button>
                            <button className="green-select colour-button"></button>
                            <button className="yellow-select colour-button"></button>
                            <button className="orange-select colour-button"></button>
                            <button className="grey-select colour-button"></button>
                        </span>
                        <br />
                        <span className="available-status-span status-span">
                            Available Statuses:
                            <select className="available-statuses-selectbox">
                                <option value="unsatisifed">Unsatisfied</option>
                                <option value="satisifed">Satisfied</option>
                                <option value="WIP">WIP</option>
                                <option value="review">Review</option>
                            </select>
                        </span>
                    </div>
                </div> : <></>}
            </div>
        </div>
    )
}
