import React from 'react'

export const SelectMultiple = ({selectedUsers, users, addToSelected, selected, deleteFromSelected}) => {
  if(users.length)
    return (
      <div>
        <div>
          {
            selectedUsers.length ?
              selectedUsers.map(selected => (<Selected user={selected}
                                                       deleteFromSelected={deleteFromSelected} /> )) : ''
          }
        </div>
        <select value={selected} onChange={addToSelected} form="eventInfo">
          <option value='All'>All</option>
          {users.map(user => (<option value={user.name}>{user.name}</option>))}
        </select>
      </div>
    )
  else return <select></select>
}

const Selected = ({user, deleteFromSelected}) =>
  (<button onClick={deleteFromSelected} id={user}>{user}</button>)
