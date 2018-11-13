import { Object3D } from 'three-full'
import { BuildPlayerParameters } from './index'

const buildPlayer = ({scene, perspectiveCamera, camerasConfig}: BuildPlayerParameters): Object3D => {
    const player = new Object3D()
    player.add(perspectiveCamera)
    scene.add(player)

    // @ts-ignore
    player.position.set(...camerasConfig.INITIAL_PERSPECTIVE_POSITION)
    // @ts-ignore
    player.lookAt(...camerasConfig.INITIAL_PERSPECTIVE_TARGET)

    return player
}

export default buildPlayer
