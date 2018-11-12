const attachResizeWindow = ({cameras, vrEffect, renderer, camerasConfig}) => {
    const resizeWindow = () => {
        cameras.orthographicCamera.left = -camerasConfig.ORTHOGRAPHIC_FRUSTUM_LEFT
        cameras.orthographicCamera.right = camerasConfig.ORTHOGRAPHIC_FRUSTUM_RIGHT

        if (vrEffect.getVRDisplay()) vrEffect.setSize(window.innerWidth, window.innerHeight)

        renderer.domElement.style.width = `${window.innerWidth}px`
        renderer.domElement.style.height = `${window.innerHeight}px`

        Object.values(cameras).forEach(camera => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
        })
    }

    window.addEventListener('resize', resizeWindow)
}

module.exports = attachResizeWindow
