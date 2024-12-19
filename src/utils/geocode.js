import axios from 'axios';

export const geocode = async (address) => {
    if (!address){
        throw new Error (`Adress Must Be Provided`)
    }

    const geo_url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(address)}&access_token=pk.eyJ1IjoiY2FybHVzaW5ub2NlbnQiLCJhIjoiY200Mzl4OXFrMDk5bDJsczd6NmU1dGk4NiJ9.A6sGeI0qH0p-QPJkBgnKfg`

    try{
        const response = await axios.get(geo_url, { timeout: 10000 })
        const targetData = response.data.features[0]

        if(targetData == undefined){
            throw new Error (`Provide correct geo-location`)
        }

        const { properties: { coordinates: { longitude, latitude }}} = targetData

        return ({longitude, latitude})
    } catch (error) {
        if (error.code === 'ETIMEDOUT') {
            throw new Error ('Request timed out. Please check your connection or try again later.')
        } else if (error.response) {
            throw new Error (`api_error ${error.response.data.error.info}`)
        } else if (error.request) {
            throw new Error ('No response received from the server.')
        } else {
            throw new Error (`${error.message}`)
        }
    }
}