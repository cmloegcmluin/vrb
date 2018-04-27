import {AudioListener} from 'three-full'

const buildListener = ({perspectiveCamera}) => {
    const listener = new AudioListener()
    perspectiveCamera.add(listener)

    return listener
}

export default buildListener
