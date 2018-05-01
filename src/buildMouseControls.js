import {OrbitControls} from 'three-full'

const buildMouseControls = ({renderer, cameras}) => {
    const mouseControls = new OrbitControls(cameras.orthographicCamera, renderer.domElement)
    mouseControls.enableDamping = true
    mouseControls.dampingFactor = 0.1
    mouseControls.rotateSpeed = 0.1

    return mouseControls
}

export default buildMouseControls
