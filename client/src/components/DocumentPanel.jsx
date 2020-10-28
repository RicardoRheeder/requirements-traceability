import React from 'react'
import Dropdown from 'react-dropdown'

export const DocumentPanel = ({ documentTitle }) => {
  const testListOfVersions = ['1.1.0', '1.2.0']
  const defaultOption = testListOfVersions[0]

  const _onSelect = (thing) => {
    console.log(thing)
  }

  return (
    <div className="document-panel-component">
      <div className="document-panel-title">
        <button className="add-person-button">
            <img className="add-person-button-image" src="/assets/images/add-friend-icon.png"></img>
          </button>
        <h2>{documentTitle}</h2>
      </div>
      

      <div className="document-panel-dropdown">
        <Dropdown
          options={testListOfVersions}
          onChange={_onSelect}
          value={defaultOption}
          placeholder="Select an option"
          className="dropdown-custom-wrapper"
          controlClassName="dropdown-custom-control"
          placeholderClassName="dropdown-custom-placeholder"
          menuClassName="dropdown-custom-menu"
          arrowClassName="dropdown-custom-arrow"
        />
      </div>
    </div>
  )
}
