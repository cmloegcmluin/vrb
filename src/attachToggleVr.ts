import { AttachToggleVrParameters } from './types'

const attachToggleVr = async ({ cameras, renderer, toggle, mouseControls }: AttachToggleVrParameters): Promise<void> => {
    const toggleVr = () => cameras.currentCamera === cameras.perspectiveCamera ? exitPresent() : enterPresent()

    let device: VRDisplay
    // @ts-ignore
    if (navigator.xr) {
        // @ts-ignore
        device = await navigator.xr.requestDevice()
    } else {
        const displays: VRDisplay[] = await navigator.getVRDisplays()
        device = displays[ 0 ]
    }
    renderer.vr.setDevice(device)

    const exitPresent = async () => {
        // @ts-ignore
        if (navigator.xr) {
            // @ts-ignore
            renderer.vr.setSession(null)
        } else {
            await device.exitPresent()
        }
        mouseControls.enabled = true
        cameras.currentCamera = cameras.orthographicCamera
    }

    const enterPresent = async () => {
        // @ts-ignore
        if (navigator.xr) {
            // @ts-ignore
            const session = await device.requestSession({ immersive: true, exclusive: true })
            // @ts-ignore
            renderer.vr.setSession(session)
        } else {
            await device.requestPresent([ { source: renderer.domElement } ])
        }

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
