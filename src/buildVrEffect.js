const {VREffect} = require('three-full')

const buildVrEffect = ({renderer}) => {
    const vrEffect = new VREffect(renderer)

    return vrEffect
}

module.exports = buildVrEffect
