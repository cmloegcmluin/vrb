import { BuildRequestAnimationFrameParameters } from './types'

const buildRequestAnimationFrame = ({ vrEffect, animate }: BuildRequestAnimationFrameParameters): VoidFunction => {
    const requestAnimationFrame = () => {
        vrEffect.requestAnimationFrame(requestAnimationFrame)
        animate()
    }

    return requestAnimationFrame
}

export {
    buildRequestAnimationFrame,
}
