const ID_TOKEN_KEY = 'token'

export function isLoggedIn () {
  const idToken = getIdToken()
  setAxiosHeader()
  return !!idToken
}

export function getIdToken () {
    return localStorage.getItem('_current_token')
}

export function logout () {
  clearIdToken()
}

export function login (idToken) {
  localStorage.setItem(('_current_token'), idToken)
  setAxiosHeader()
}

function clearIdToken () {
  localStorage.removeItem('_current_token')
}

export function setAxiosHeader () {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + getIdToken()
}
