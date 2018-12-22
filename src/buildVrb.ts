import vrb from './vrb'
import { Scene } from 'three-full'
import { CAMERAS_CONFIG_DEFAULTS } from './defaultCamerasConfig'
import { buildRenderer } from './buildRenderer'
import { buildVrEffect } from './buildVrEffect'
import { buildCameras } from './buildCameras'
import { buildPlayer } from './buildPlayer'
import { buildListener } from './buildListener'
import { buildCreatePositionalSound } from './buildCreatePositionalSound'
import { buildVrControls } from './buildVrControls'
import { buildMouseControls } from './buildMouseControls'
import { buildVrControllers } from './buildVrControllers'
import { buildAnimate } from './buildAnimate'
import { buildRequestAnimationFrame } from './buildRequestAnimationFrame'
import { attachToggleVr } from './attachToggleVr'
import { attachResizeWindow } from './attachResizeWindow'
import { BuildVrb, BuildVrbParameters, Vrb } from './types'

const noop: VoidFunction = () => {
}

const buildVrb: BuildVrb = (
    {
        camerasConfig: camerasConfigOverrides,
        scene = new Scene(),
        toggle,
        viewer,
        onAnimate = () => {
        },
        onControllerConnected = () => {
        },
    }: BuildVrbParameters,
): Vrb => {
    vrb.scene = scene
    vrb.onAnimate = onAnimate || noop
    vrb.changeOnAnimate = onAnimateChangingFunction => {
        vrb.onAnimate = onAnimateChangingFunction(vrb.onAnimate || noop)
    }

    vrb.onControllerConnected = onControllerConnected
    vrb.changeOnControllerConnected = onControllerConnectedChangingFunction => {
        // @ts-ignore
        vrb.onControllerConnected = onControllerConnectedChangingFunction(vrb.onControllerConnected)
    }

    const camerasConfig = Object.assign(CAMERAS_CONFIG_DEFAULTS, camerasConfigOverrides)

    const renderer = buildRenderer({ viewer })
    const vrEffect = buildVrEffect({ renderer })
    const cameras = buildCameras({ camerasConfig })
    const perspectiveCamera = cameras.perspectiveCamera

    const player = buildPlayer({ scene: vrb.scene, perspectiveCamera, camerasConfig })
    const listener = buildListener({ perspectiveCamera })
    const createPositionalSound = buildCreatePositionalSound({ listener })
    const vrControls = buildVrControls({ perspectiveCamera })
    const mouseControls = buildMouseControls({ renderer, cameras })
    const vrControllers = buildVrControllers({ player, vrControls })
    const animate = buildAnimate({
        renderer,
        scene: vrb.scene,
        mouseControls,
        vrControls,
        vrControllers,
        vrEffect,
        cameras,
    })
    const requestAnimationFrame = buildRequestAnimationFrame({ vrEffect, animate })

    attachToggleVr({ cameras, vrEffect, toggle, mouseControls })
    attachResizeWindow({ cameras, vrEffect, renderer, camerasConfig })

    vrb.createSpatialOscillator = () => listener.context.createOscillator()
    vrb.createSpatialBufferSource = () => listener.context.createBufferSource()
    vrb.getIsPresenting = () => vrEffect.isPresenting
    vrb.setBackgroundColor = color => renderer.setClearColor(color)
    vrb.player = player
    vrb.createPositionalSound = createPositionalSound
    vrb.requestAnimationFrame = requestAnimationFrame
    vrb.listener = listener
    vrb.cameras = cameras

    return vrb as Vrb
}

export {
    buildVrb,
}
