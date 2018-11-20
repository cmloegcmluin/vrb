import {OrthographicCamera, PerspectiveCamera} from 'three-full'
import { BuildCamerasParameters, Cameras } from './types'

const buildCameras = ({camerasConfig}: BuildCamerasParameters): Cameras => {
    const perspectiveCamera = new PerspectiveCamera(
        camerasConfig.PERSPECTIVE_FOV as number,
        camerasConfig.PERSPECTIVE_ASPECT_RATIO as number,
        camerasConfig.PERSPECTIVE_FRUSTUM_NEAR as number,
        camerasConfig.PERSPECTIVE_FRUSTUM_FAR as number
    )

    const orthographicCamera = new OrthographicCamera(
        camerasConfig.ORTHOGRAPHIC_FRUSTUM_LEFT as number,
        camerasConfig.ORTHOGRAPHIC_FRUSTUM_RIGHT as number,
        camerasConfig.ORTHOGRAPHIC_FRUSTUM_TOP as number,
        camerasConfig.ORTHOGRAPHIC_FRUSTUM_BOTTOM as number,
        camerasConfig.ORTHOGRAPHIC_FRUSTUM_NEAR as number,
        camerasConfig.ORTHOGRAPHIC_FRUSTUM_FAR as number,
    )

    let currentCamera = orthographicCamera

    // @ts-ignore
    perspectiveCamera.lookAt(...camerasConfig.INITIAL_PERSPECTIVE_TARGET)
    // @ts-ignore
    orthographicCamera.position.set(...camerasConfig.INITIAL_ORTHOGRAPHIC_POSITION)
    // @ts-ignore
    orthographicCamera.lookAt(...camerasConfig.INITIAL_ORTHOGRAPHIC_TARGET)

    return {
        perspectiveCamera,
        orthographicCamera,
        currentCamera,
    }
}

export {
    buildCameras,
}
