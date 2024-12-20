import axios from 'axios';

export const weatherData = async (latitude, longitude) => {
    const weather_url = `http://api.weatherstack.com/current?access_key=cbfe5d8b3810f958ace873608df5695e&query=${latitude},${longitude}&units=m`

    try {
        const response = await axios.get(weather_url, { timeout: 10000 })
        const { data: { current: { temperature, feelslike, weather_descriptions, humidity } } } = response

        return ({weather_descriptions:weather_descriptions[0],temperature,feelslike,humidity})
    } catch (error) {
        if (error.code === 'ETIMEDOUT') {
            throw new Error('Request timed out. Please check your connection or try again later.')
        } else if (error.response) {
            throw new Error(`API Error: ${error.response.data.error.info}`)
        } else if (error.request) {
            throw new Error('No response received from the server.')
        } else {
            throw new Error(`Error: ${error.message}`)
        }
    }
}