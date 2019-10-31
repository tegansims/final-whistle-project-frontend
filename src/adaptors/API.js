const baseUrl = 'http://localhost:3000/'
const logInUrl = baseUrl + 'login'
const validateUrl = baseUrl + 'validate'
const newUsersURL = baseUrl + 'signup'


const get = url => 
    fetch(url, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
}).then(resp => resp.json())


const post = (url, data) => 
fetch(url, {
    method: 'POST', 
    headers:  { 
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') 
    },
    body: JSON.stringify( data )
}).then(resp => resp.json())



const logIn = user => post(logInUrl, user)
const validate = () => get(validateUrl)
const signUp = (user) => post(newUsersURL, user)


window.validate = validate

export default { logIn, validate, signUp }