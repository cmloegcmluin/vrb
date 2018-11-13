import { VREffect } from 'three-full'
import { VrbRenderer } from './buildRenderer'

export interface VrbVREffect extends VREffect {
    getVRDisplay: () => string,
    exitPresent: () => Promise<void>,
    requestPresent: () => Promise<void>,
    isPresenting: boolean,
    requestAnimationFrame: (requestAnimationFrame: VoidFunction) => void,
}

export interface BuildVrEffectParameters {
    renderer: VrbRenderer,
}

const buildVrEffect = ({renderer}: BuildVrEffectParameters): VrbVREffect => {
    const vrEffect = new VREffect(renderer) as VrbVREffect

    return vrEffect
}

export default buildVrEffect
