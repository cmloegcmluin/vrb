import { VrbVREffect } from './buildVrEffect'

export interface BuildRequestAnimationFrameParameters {
    vrEffect: VrbVREffect,
    animate: VoidFunction,
}

const buildRequestAnimationFrame = ({vrEffect, animate}: BuildRequestAnimationFrameParameters): VoidFunction => {
    const requestAnimationFrame = () => {
        vrEffect.requestAnimationFrame(requestAnimationFrame)
        animate()
    }

    return requestAnimationFrame
}

export default buildRequestAnimationFrame
