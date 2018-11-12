const {OrthographicCamera, PerspectiveCamera} = require('three-full')

const buildCameras = ({camerasConfig}) => {
    const perspectiveCamera = new PerspectiveCamera(
        camerasConfig.PERSPECTIVE_FOV,
        camerasConfig.PERSPECTIVE_ASPECT_RATIO,
        camerasConfig.PERSPECTIVE_FRUSTUM_NEAR,
        camerasConfig.PERSPECTIVE_FRUSTUM_FAR
    )

    const orthographicCamera = new OrthographicCamera(
        camerasConfig.ORTHOGRAPHIC_FRUSTUM_LEFT,
        camerasConfig.ORTHOGRAPHIC_FRUSTUM_RIGHT,
        camerasConfig.ORTHOGRAPHIC_FRUSTUM_TOP,
        camerasConfig.ORTHOGRAPHIC_FRUSTUM_BOTTOM,
        camerasConfig.ORTHOGRAPHIC_FRUSTUM_NEAR,
        camerasConfig.ORTHOGRAPHIC_FRUSTUM_FAR,
    )

    let currentCamera = orthographicCamera

    perspectiveCamera.lookAt(...camerasConfig.INITIAL_PERSPECTIVE_TARGET)
    orthographicCamera.position.set(...camerasConfig.INITIAL_ORTHOGRAPHIC_POSITION)
    orthographicCamera.lookAt(...camerasConfig.INITIAL_ORTHOGRAPHIC_TARGET)

    return {
        perspectiveCamera,
        orthographicCamera,
        currentCamera,
    }
}

module.exports = buildCameras
