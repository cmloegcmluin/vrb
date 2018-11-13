import { BuildRequestAnimationFrameParameters } from './index'

const buildRequestAnimationFrame = ({vrEffect, animate}: BuildRequestAnimationFrameParameters): VoidFunction => {
    const requestAnimationFrame = () => {
        vrEffect.requestAnimationFrame(requestAnimationFrame)
        animate()
    }

    return requestAnimationFrame
}

export default buildRequestAnimationFrame
