import { AttachToggleVrParameters } from './types'

const attachToggleVr = async ({ cameras, renderer, toggle, mouseControls }: AttachToggleVrParameters): Promise<void> => {
    const toggleVr = () => cameras.currentCamera === cameras.perspectiveCamera ? exitPresent() : enterPresent()

    const displays = await navigator.getVRDisplays()
    const device = displays[ 0 ]
    renderer.vr.setDevice(device)

    const exitPresent = () => {
        device.exitPresent()
        mouseControls.enabled = true
        cameras.currentCamera = cameras.orthographicCamera
    }

    const enterPresent = () => {
        device.requestPresent([ { source: renderer.domElement } ])
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
