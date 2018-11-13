import { Object3D, PerspectiveCamera, Scene } from 'three-full'
import { CamerasConfig } from './camerasConfigDefaults'

export interface BuildPlayerParameters {
    scene: Scene,
    perspectiveCamera: PerspectiveCamera,
    camerasConfig: Partial<CamerasConfig>,
}

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
