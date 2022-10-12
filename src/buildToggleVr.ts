import vrb from "./vrb"
import { AttachToggleVrParameters } from "./types"

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
        console.log("someone is calling exit present")
        if (xr) {
            currentSession.end()
        } else {
            await currentSession.exitPresent()
        }
        mouseControls.enabled = true
        cameras.currentCamera = cameras.orthographicCamera
    }

    const mode = "immersive-vr"
    const sessionInit = { optionalFeatures: ["local-floor", "bounded-floor", "hand-tracking", "layers"] }

    const enterPresent = async () => {
        console.log("someone is calling enter present")

        xr.requestSession(mode, sessionInit).then(async (session: XRSession) => {
            console.log("success requesting XR session", session)
            currentSession = session

            renderer.xr.setSession(session).then(async () => {
                vrb.onReady && vrb.onReady()

                mouseControls.enabled = false
                cameras.currentCamera = cameras.perspectiveCamera
            }).catch((err: Error) => {
                console.log("error *setting* XR session", err)
                onNoVr()
            })
        }).catch((err: Error) => {
            console.log("error requesting XR session", err)
            onNoVr()
        })
    }

    return () => cameras.currentCamera === cameras.perspectiveCamera ? exitPresent() : enterPresent()
}

export {
    buildToggleVr,
}
