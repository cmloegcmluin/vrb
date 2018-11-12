import {Object3D} from 'three-full'

const buildPlayer = ({scene, perspectiveCamera, camerasConfig}) => {
    const player = new Object3D()
    player.add(perspectiveCamera)
    scene.add(player)

    player.position.set(...camerasConfig.INITIAL_PERSPECTIVE_POSITION)
    player.lookAt(...camerasConfig.INITIAL_PERSPECTIVE_TARGET)

    return player
}

export default buildPlayer
