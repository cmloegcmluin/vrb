import { AudioListener, PerspectiveCamera } from 'three-full'

export interface BuildListenerParameters {
    perspectiveCamera: PerspectiveCamera,
}

const buildListener = ({perspectiveCamera}: BuildListenerParameters) => {
    const listener = new AudioListener()
    perspectiveCamera.add(listener)

    return listener
}

export default buildListener
