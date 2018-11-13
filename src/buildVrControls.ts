import { VRControls } from 'three-full'
import { BuildVrControlsParameters, VrbVRControls } from './index'

const buildVrControls = ({perspectiveCamera}: BuildVrControlsParameters): VrbVRControls => {
    const vrControls = new VRControls(perspectiveCamera) as VrbVRControls
    vrControls.standing = true

    return vrControls
}

export default buildVrControls
