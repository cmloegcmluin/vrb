const attachToggleVr = ({cameras, vrEffect, toggle, mouseControls}) => {
    const toggleVr = () => cameras.currentCamera === cameras.perspectiveCamera ? exitPresent() : enterPresent()

    const exitPresent = () => {
        vrEffect.exitPresent().catch(() => {
        })
        mouseControls.enabled = true
        cameras.currentCamera = cameras.orthographicCamera
    }

    const enterPresent = () => {
        vrEffect.requestPresent().catch(() => {
        })
        mouseControls.enabled = false
        cameras.currentCamera = cameras.perspectiveCamera
    }

    toggle.onclick = toggleVr
}

export default attachToggleVr
