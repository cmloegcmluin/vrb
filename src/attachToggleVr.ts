import { AttachToggleVrParameters } from './types'

const attachToggleVr = async ({ cameras, renderer, toggle, mouseControls }: AttachToggleVrParameters): Promise<void> => {
    const toggleVr = () => cameras.currentCamera === cameras.perspectiveCamera ? exitPresent() : enterPresent()

    let device: VRDisplay
    // @ts-ignore
    if (navigator.xr) {
        // @ts-ignore
        navigator.xr.requestDevice().then((requestedDevice: VRDisplay) => {
            console.log('success requesting XR device', requestedDevice)
            // @ts-ignore
            requestedDevice.supportsSession({ immersive: true, exclusive: true }).then((supportedDevice: VRDisplay) => {
                console.log('success supporting XR device', supportedDevice)
                device = supportedDevice
                renderer.vr.setDevice(supportedDevice)
            }).catch((err: Error) => {
                console.log('error supporting XR device', err)
            })
        }).catch((err: Error) => {
            console.log('error requesting XR device', err)
        })
    } else {
        const displays: VRDisplay[] = await navigator.getVRDisplays()
        device = displays[ 0 ]
        console.log('success requesting VR device', device)
        renderer.vr.setDevice(device)
    }

    const exitPresent = async () => {
        console.log('someone is calling exit present')
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
        console.log('someone is calling enter present')
        // @ts-ignore
        if (navigator.xr) {
            // @ts-ignore
            device.requestSession({ immersive: true, exclusive: true }).then(session => {
                console.log('success requesting XR session', session)
                // @ts-ignore
                renderer.vr.setSession(session)
            }).catch((err: Error) => {
                console.log('error requesting XR session', err)
            })
        } else {
            await device.requestPresent([ { source: renderer.domElement } ])
            console.log('success requesting VR present')
        }

        mouseControls.enabled = false
        cameras.currentCamera = cameras.perspectiveCamera
    }

    if (toggle) {
        toggle.onclick = () => {
            console.log('you clicked the toggle!')
            toggleVr()
        }
    } else {
        console.log('there was no toggle, so setting timeout')
        setTimeout(() => {
            console.log('entering present automatically')
            enterPresent()
        }, 1000)
    }
}

export {
    attachToggleVr,
}
