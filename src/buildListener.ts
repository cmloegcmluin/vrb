import { BuildListenerParameters } from './types'

const buildListener = ({ perspectiveCamera }: BuildListenerParameters) => {
    const { AudioListener } = require('three')
    const listener = new AudioListener()
    perspectiveCamera.add(listener)

    return listener
}

export {
    buildListener,
}
