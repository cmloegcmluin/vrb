const buildRequestAnimationFrame = ({vrEffect, animate}) => {
    const requestAnimationFrame = () => {
        vrEffect.requestAnimationFrame(requestAnimationFrame)
        animate()
    }

    return requestAnimationFrame
}

module.exports = buildRequestAnimationFrame
