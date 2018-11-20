import { AudioListener } from 'three-full'
import { BuildListenerParameters } from './types'

const buildListener = ({ perspectiveCamera }: BuildListenerParameters) => {
    const listener = new AudioListener()
    perspectiveCamera.add(listener)

    return listener
}

export {
    buildListener,
}
