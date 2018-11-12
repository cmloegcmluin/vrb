const {Object3D} = require('three-full')

const buildPlayer = ({scene, perspectiveCamera, camerasConfig}) => {
    const player = new Object3D()
    player.add(perspectiveCamera)
    scene.add(player)

    player.position.set(...camerasConfig.INITIAL_PERSPECTIVE_POSITION)
    player.lookAt(...camerasConfig.INITIAL_PERSPECTIVE_TARGET)

    return player
}

module.exports = buildPlayer
