import axios from 'axios'
import {URL_API} from 'constants/config'

export const getBirthdays = (data) => {
    var params = new URLSearchParams(data);
    return axios({
        method: 'GET',
        url: `${URL_API}/api/birthdays`,
        params
    })
}
