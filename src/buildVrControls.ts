import { VRControls } from 'three'
import { BuildVrControlsParameters, VrbVRControls } from './types'

const buildVrControls = ({ perspectiveCamera }: BuildVrControlsParameters): VrbVRControls => {
    const vrControls = new VRControls(perspectiveCamera) as VrbVRControls
    vrControls.standing = true

    return vrControls
}

export {
    buildVrControls,
}
