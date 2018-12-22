import { AttachToggleVrParameters } from './types'

const attachToggleVr = ({ cameras, vrEffect, toggle, mouseControls }: AttachToggleVrParameters): void => {
    const toggleVr = () => cameras.currentCamera === cameras.perspectiveCamera ? exitPresent() : enterPresent()

    const exitPresent = () => {
        vrEffect.exitPresent().catch(() => {
        })
        mouseControls.enabled = true
        cameras.currentCamera = cameras.orthographicCamera
    }

    const enterPresent = () => {
        vrEffect.requestPresent().catch((error) => {
            console.log('Error when trying to enter VR: ', error)
        })
        mouseControls.enabled = false
        cameras.currentCamera = cameras.perspectiveCamera
    }

    if (toggle) {
        toggle.onclick = toggleVr
    } else {
        setTimeout(enterPresent, 1000)
    }
}

export {
    attachToggleVr,
}
