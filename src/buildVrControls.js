import {VRControls} from 'three-full'

const buildVrControls = ({perspectiveCamera}) => {
    const vrControls = new VRControls(perspectiveCamera)
    vrControls.standing = true

    return vrControls
}

export default buildVrControls
