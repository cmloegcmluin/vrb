import { AudioListener } from 'three-full'
import { BuildListenerParameters } from './index'

const buildListener = ({perspectiveCamera}: BuildListenerParameters) => {
    const listener = new AudioListener()
    perspectiveCamera.add(listener)

    return listener
}

export default buildListener
