const baseUrl = 'https://damp-caverns-67228.herokuapp.com/'
// const baseUrl = 'http://localhost:3000/'
const logInUrl = baseUrl + 'login'
const validateUrl = baseUrl + 'validate'

const newUsersUrl = baseUrl + 'signup'
const newTeamUrl = baseUrl + 'teams/new'
const newPlayerUrl = baseUrl + 'players/new'
const newGameUrl = baseUrl + 'games/new'
const newCommentUrl = baseUrl + 'createcomment'
const newVoteUrl = baseUrl + 'createvote'
const newBoardUrl = baseUrl + 'boards/new'
const newScorerUrl = baseUrl + 'scorers/new'
const newAssistUrl = baseUrl + 'assists/new'

const gamesUrl = baseUrl + 'games'
const teamsUrl = baseUrl + 'teams'
const usersUrl = baseUrl + 'users'
const playersUrl = baseUrl + 'players'
const votesUrl = baseUrl + 'votes'
const usertypesUrl = baseUrl + 'usertypes'
const boardsUrl = baseUrl + 'boards'
const scorersUrl = baseUrl +'scorers'
const assistsUrl = baseUrl + 'assists'


const topScorerUrl = baseUrl + 'topscorer'
const topScorersUrl = baseUrl + 'topscorers'
const topAssisterUrl = baseUrl + 'topassister'
const topAssistersUrl = baseUrl + 'topassisters'

const boardCoordsUrl = baseUrl + 'boardcoords'

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


const patch = (url, id, objToUpdate) =>
fetch(`${url}/${id}`, {
    method: 'PATCH',
        headers: {
           'Content-Type': 'application/json',
           Authorization: localStorage.getItem('token') 
        },
        body: JSON.stringify(objToUpdate)
}).then(response => response.json())


const destroy = (url, id) =>
fetch(`${url}/${id}`, {
    method: 'DELETE'
}).then(response => response.json())




const logIn = user => post(logInUrl, user)
const validate = () => get(validateUrl)
const signUp = (user) => post(newUsersUrl, user)
const createTeam = (team) => post(newTeamUrl, team)
const createPlayer = (player) => post(newPlayerUrl, player)
const createGame = (game) => post(newGameUrl, game)
const createComment = (comment) => post(newCommentUrl, comment)
const createBoard = (board) => post(newBoardUrl, board)
const createScorer = (scorer) => post(newScorerUrl, scorer)
const createAssist = (assist) => post(newAssistUrl, assist)
const games = () => get(gamesUrl)
const game = (id) => get(`${gamesUrl}/${id}`)
const teams = () => get(teamsUrl)
const players = () => get(playersUrl)
const player = (id) => get(`${playersUrl}/${id}`)
const votes = () => get(votesUrl)
const users = () => get(usersUrl)
const boards = () => get(boardsUrl)
const usertypes = () => get(usertypesUrl)
const createVote = (vote) => post(newVoteUrl, vote)
const joinTeam = (user, id) => patch(usersUrl, id, user)
const updateGame = (game, id) => patch(gamesUrl, id, game)
const updateUser = (user, id) => patch(usersUrl, id, user)
const currentUser = (id) => get(`${usersUrl}/${id}`)

const deleteScorer = (scorer, id) => destroy(scorersUrl, id, scorer)
const deleteAssist = (assist, id) => destroy(assistsUrl, id, assist)

const topScorer = (id) => get(`${topScorerUrl}/${id}`)
const topScorers = (id) => get(`${topScorersUrl}/${id}`)
const topAssister = (id) => get(`${topAssisterUrl}/${id}`)
const topAssisters = (id) => get(`${topAssistersUrl}/${id}`)

const boardCoords = (id) => get(`${boardCoordsUrl}/${id}`)

// const topScorer = (id ) => fetch(`${topScorerUrl}/${id}`).then(console.log)
window.validate = validate
window.topScorer = topScorer

export default { logIn, validate, signUp, createTeam, createPlayer, createGame, games, teams, users,
    createComment, createVote, joinTeam, players, votes, usertypes, updateGame, topScorer, topScorers, 
    topAssister, topAssisters, currentUser, game, updateUser, boards, boardCoords, createBoard, createScorer, 
    createAssist, deleteScorer, deleteAssist, player}