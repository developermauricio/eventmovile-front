
import UAParser from 'ua-parser-js'

export const screenShareResolutions = [
  {
    name: 'default',
    value: 'default',
  },
  {
    name: '480p_1',
    value: '480p_1',
  },
  {
    name: '720p_1',
    value: '720p_1',
  },
  {
    name: '1080p_1',
    value: '1080p_1'
  }
]

const parser = new UAParser()

const userAgentInfo = parser.getResult()

export const isSafari = () => {
  return (
    userAgentInfo.browser.name === 'Safari' ||
    userAgentInfo.browser.name === 'Mobile Safari'
  )
}

export const isCompatibleChrome = () => {
  if (userAgentInfo.browser.name === 'Chrome') {
    const major = +userAgentInfo.browser.major
    if (major >= 72) return true
  }
  return false
}

export const isFirefox = () => {
  return userAgentInfo.browser.name === 'Firefox'
}

