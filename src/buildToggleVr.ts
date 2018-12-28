import { AttachToggleVrParameters } from './types'

const buildToggleVr = ({ cameras, renderer, mouseControls }: AttachToggleVrParameters): VoidFunction => {
    let device: VRDisplay

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

    // @ts-ignore
    if (navigator.xr) {
        // @ts-ignore
        navigator.xr.requestDevice().then((requestedDevice: VRDisplay) => {
            console.log('success requesting XR device', requestedDevice)
            // @ts-ignore
            requestedDevice.supportsSession({ immersive: true, exclusive: true }).then(() => {
                console.log('success supporting XR device')
                device = requestedDevice
                renderer.vr.setDevice(requestedDevice)
            }).catch((err: Error) => {
                console.log('error supporting XR device', err)
            })
        }).catch((err: Error) => {
            console.log('error requesting XR device', err)
        })
    } else {
        navigator.getVRDisplays().then((displays: VRDisplay[]) => {
            console.log('success getting VR device', device)
            device = displays[ 0 ]
            renderer.vr.setDevice(device)
        }).catch((err: Error) => {
            console.log('error getting VR device', err)
        })
    }

    return () => cameras.currentCamera === cameras.perspectiveCamera ? exitPresent() : enterPresent()
}

export {
    buildToggleVr,
}
