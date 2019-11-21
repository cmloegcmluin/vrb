import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
import { BuildMouseControlsParameters } from './types'

const buildMouseControls = ({ renderer, cameras }: BuildMouseControlsParameters): TrackballControls => {
    const mouseControls = new TrackballControls(cameras.orthographicCamera, renderer.domElement)
    mouseControls.rotateSpeed = 0.1

    return mouseControls
}

export {
    buildMouseControls,
}
