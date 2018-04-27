const attachResizeWindow = ({cameras, vrEffect, renderer, camerasConfig}) => {
    const resizeWindow = () => {
        cameras.orthographicCamera.left = -camerasConfig.ORTHOGRAPHIC_DISTANCE * window.innerWidth / window.innerHeight
        cameras.orthographicCamera.right = camerasConfig.ORTHOGRAPHIC_DISTANCE * window.innerWidth / window.innerHeight

        vrEffect.setSize(window.innerWidth, window.innerHeight)

        renderer.domElement.style.width = `${window.innerWidth}px`
        renderer.domElement.style.height = `${window.innerHeight}px`

        Object.values(cameras).forEach(camera => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
        })
    }

    window.addEventListener('resize', resizeWindow)
}

export default attachResizeWindow
