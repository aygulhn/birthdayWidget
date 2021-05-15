import React from 'react'
import { parseDateToTxt } from 'util/dateHelper'
import { URL_API } from 'constants/config'

const UserPannel = ({ user }) => {

    return (
        <div className="user-pannel">
            <div className="avatar">
                <img src={`${URL_API}${user.avatarUrl}`} alt="avatar" />
            </div>
            <div className="info">
                <p>{user.name}</p>
                <p className="light-clr">{user.jobTitle}</p>
                <p className="bold-txt">{parseDateToTxt(user.birthday)}</p>
            </div>

        </div>
    )
}

export default UserPannel;