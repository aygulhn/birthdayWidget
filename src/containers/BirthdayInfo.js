import React from 'react'
import { parseDateToTxt } from 'util/dateHelper'
import { URL_API } from 'constants/config'

const BirthdayInfo = ({ user }) => {

    return (
        <div className="birthday-info">
            <div className="avatar">
                <img src={`${URL_API}${user.avatarUrl}`} alt="avatar" />
            </div>
            <div className="info">
                <p className="name">{user.name}</p>
                <p className="job light-clr">{user.jobTitle}</p>
                <p className="bold-txt">{parseDateToTxt(user.birthday)}</p>
            </div>

        </div>
    )
}

export default BirthdayInfo;