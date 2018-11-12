const {VRControls} = require('three-full')

const buildVrControls = ({perspectiveCamera}) => {
    const vrControls = new VRControls(perspectiveCamera)
    vrControls.standing = true

    return vrControls
}

module.exports = buildVrControls
