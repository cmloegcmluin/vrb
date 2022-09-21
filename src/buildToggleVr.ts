import vrb from './vrb'
import { AttachToggleVrParameters } from './types'

const buildToggleVr = ({ cameras, renderer, mouseControls, onNoVr }: AttachToggleVrParameters): VoidFunction => {
    // tslint:disable-next-line:no-any
    let currentSession: any

    let xr: XRSystem
    if (navigator.xr) {
        xr = navigator.xr
    } else {
        return () => {
        }
    }

    const exitPresent = async () => {
        console.log('someone is calling exit present')
        if (xr) {
            currentSession.end()
        } else {
            await currentSession.exitPresent()
        }
        mouseControls.enabled = true
        cameras.currentCamera = cameras.orthographicCamera
    }

    const enterPresent = async () => {
        console.log('someone is calling enter present')
        
        await currentSession.requestPresent([{ source: renderer.domElement }])
        console.log('success requesting VR present')

        mouseControls.enabled = false
        cameras.currentCamera = cameras.perspectiveCamera
    }

    xr.requestSession('immersive-vr').then((session: XRSession) => {
        console.log('success requesting XR session', session)
        currentSession = session
        renderer.xr.setSession(session)
        vrb.onReady && vrb.onReady()
    }).catch((err: Error) => {
        console.log('error requesting XR session', err)
        onNoVr()
    })

    return () => cameras.currentCamera === cameras.perspectiveCamera ? exitPresent() : enterPresent()
}

export {
    buildToggleVr,
}
