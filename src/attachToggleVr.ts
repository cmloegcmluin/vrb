import { AttachToggleVrParameters } from './types'

const attachToggleVr = async ({ cameras, renderer, toggle, mouseControls }: AttachToggleVrParameters): Promise<void> => {
    const toggleVr = () => cameras.currentCamera === cameras.perspectiveCamera ? exitPresent() : enterPresent()

    // @ts-ignore
    let device
    // @ts-ignore
    if (navigator.xr) {
        // @ts-ignore
        device = await navigator.xr.requestDevice()
        await device.supportsSession( { immersive: true, exclusive: true /* DEPRECATED */ } )
    } else {
        const displays = await navigator.getVRDisplays()
        device = displays[0]
    }
    renderer.vr.setDevice(device)

    const exitPresent = () => {
        // @ts-ignore
        device.exitPresent()
        mouseControls.enabled = true
        cameras.currentCamera = cameras.orthographicCamera
    }

    const enterPresent = () => {
        // @ts-ignore
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
