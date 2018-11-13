import { Cameras } from './buildCameras'
import { VrbVREffect } from './buildVrEffect'
import { OrbitControls } from 'three-full'

export interface AttachToggleVrParameters {
    cameras: Cameras,
    vrEffect: VrbVREffect,
    toggle?: HTMLDivElement,
    mouseControls: OrbitControls,
}

const attachToggleVr = ({cameras, vrEffect, toggle, mouseControls}: AttachToggleVrParameters): void => {
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

    if (toggle) {
        toggle.onclick = toggleVr
    } else {
        setTimeout(enterPresent, 1000)
    }
}

export default attachToggleVr
