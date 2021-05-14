import React from 'react'
import { parseDateToTxt } from 'util/dateHelper'

const UserPannel = ({ user }) => {

    return (
        <div className="user-pannel">
            <div className="avatar">
                <img src={user.avatarUrl} alt="avatar"/>
            </div>
            <div className="info">
                <p>{user.name}</p>
                <p className="light-clr">{user.jobtitle}</p>
                <p className="bold-txt">{parseDateToTxt(user.birthday)}</p>
            </div>

        </div>
    )
}

export default UserPannel;