const baseUrl = 'http://localhost:3000/'
const logInUrl = baseUrl + 'login'

const post = (url, data) => 
fetch(url, {
    method: 'POST', 
    headers:  { 'Content-Type': 'application/json' },
    body: JSON.stringify(  data  )
}).then(resp => resp.json())

const logIn = user => post(logInUrl, user)


export default { logIn }