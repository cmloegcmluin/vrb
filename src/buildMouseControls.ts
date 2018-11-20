import { OrbitControls } from 'three-full'
import { BuildMouseControlsParameters } from './types'

const buildMouseControls = ({ renderer, cameras }: BuildMouseControlsParameters): OrbitControls => {
    const mouseControls = new OrbitControls(cameras.orthographicCamera, renderer.domElement)
    mouseControls.enableDamping = true
    mouseControls.dampingFactor = 0.1
    mouseControls.rotateSpeed = 0.1

    return mouseControls
}

export {
    buildMouseControls,
}
