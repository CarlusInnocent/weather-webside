const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const success = document.getElementById('success')
const failure = document.getElementById('failure')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value.trim()

    success.textContent = 'Loading....'
    failure.textContent = ''
    
    const getData = async () => {
        try{
            const response = await fetch(`http://localhost:3000/weather?address=${location}`)
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json()
            if (data.error) {
                throw new Error(data.error);
            }
            
            const { weather_data: { feelslike, temperature, weather_descriptions } } = data

            success.innerHTML = `
                Feels-Like: ${feelslike}°C <br>
                Temperature: ${temperature}°C <br>
                Description: ${weather_descriptions}
            `
            failure.textContent = ''
        } catch (error) {
            success.textContent = ''
            failure.textContent = `${error.message}`
        }
    
    }
    getData()
    
})
