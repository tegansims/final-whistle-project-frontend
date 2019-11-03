const baseUrl = 'http://localhost:3000/'
const logInUrl = baseUrl + 'login'
const validateUrl = baseUrl + 'validate'

const newUsersUrl = baseUrl + 'signup'
const newTeamUrl = baseUrl + 'createteam'
const newPlayerUrl = baseUrl + 'createplayer'
const newGameUrl = baseUrl + 'creategame'
const newCommentUrl = baseUrl + 'createcomment'
const newVoteUrl = baseUrl + 'createvote'

const gamesUrl = baseUrl + 'games'
const teamsUrl = baseUrl + 'teams'

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
const signUp = (user) => post(newUsersUrl, user)
const createTeam = (team) => post(newTeamUrl, team)
const createPlayer = (player) => post(newPlayerUrl, player)
const createGame = (game) => post(newGameUrl, game)
const createComment = (comment) => post(newCommentUrl, comment)
const games = () => get(gamesUrl)
const teams = () => get(teamsUrl)
const createVote = (vote) => post(newVoteUrl, vote)


window.validate = validate

export default { logIn, validate, signUp, createTeam, createPlayer, createGame, games, teams, createComment, createVote}