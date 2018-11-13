import { PerspectiveCamera, VRControls } from 'three-full'

export interface BuildVrControlsParameters {
    perspectiveCamera: PerspectiveCamera,
}

export interface VrbVRControls extends VRControls {
    standing: boolean,
    getStandingMatrix: () => string,
}

const buildVrControls = ({perspectiveCamera}: BuildVrControlsParameters): VrbVRControls => {
    const vrControls = new VRControls(perspectiveCamera) as VrbVRControls
    vrControls.standing = true

    return vrControls
}

export default buildVrControls
