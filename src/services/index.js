import axios from 'axios'

export const getBirthdays = (data) => {
    var params = new URLSearchParams(data);
    return axios({
        method: 'GET',
        url: 'https://birthday-api.anromsocial.com/api/birthdays',
        params
    })
}
