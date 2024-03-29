import vrb from './vrb'
import { Scene } from 'three'
import { CAMERAS_CONFIG_DEFAULTS } from './defaultCamerasConfig'
import { buildRenderer } from './buildRenderer'
import { buildCameras } from './buildCameras'
import { buildPlayer } from './buildPlayer'
import { buildListener } from './buildListener'
import { buildCreatePositionalSound } from './buildCreatePositionalSound'
import { buildMouseControls } from './buildMouseControls'
import { buildVrControllers } from './buildVrControllers'
import { buildAnimate } from './buildAnimate'
import { buildToggleVr } from './buildToggleVr'
import { attachResizeWindow } from './attachResizeWindow'
import { BuildVrb, BuildVrbParameters, Vrb } from './types'

const noop: VoidFunction = () => {
}

const buildVrb: BuildVrb = (
    {
        camerasConfig: camerasConfigOverrides,
        scene = new Scene(),
        viewer,
        onAnimate = noop,
        onControllerConnected = noop,
        onNoVr = noop,
        onReady = noop,
    }: BuildVrbParameters,
): Vrb => {
    vrb.scene = scene
    vrb.onAnimate = onAnimate
    vrb.onReady = onReady
    vrb.changeOnAnimate = onAnimateChangingFunction => {
        vrb.onAnimate = onAnimateChangingFunction(vrb.onAnimate || noop)
    }

    vrb.onControllerConnected = onControllerConnected
    vrb.changeOnControllerConnected = onControllerConnectedChangingFunction => {
        // @ts-ignore
        vrb.onControllerConnected = onControllerConnectedChangingFunction(vrb.onControllerConnected)
    }

    const camerasConfig = Object.assign(CAMERAS_CONFIG_DEFAULTS, camerasConfigOverrides)

    const cameras = buildCameras({ camerasConfig })

    const renderer = buildRenderer({ viewer })
    const mouseControls = buildMouseControls({ renderer, cameras })
    const perspectiveCamera = cameras.perspectiveCamera

    const player = buildPlayer({ scene, perspectiveCamera, camerasConfig })
    const listener = buildListener({ perspectiveCamera })
    const createPositionalSound = buildCreatePositionalSound({ listener })
    const vrControllers = buildVrControllers({ player })
    const animate = buildAnimate({
        scene,
        mouseControls,
        vrControllers,
    })

    renderer.setAnimationLoop(() => {
        renderer.render(scene, cameras.currentCamera)
        animate()
    })
    vrb.toggleVr = buildToggleVr({ cameras, renderer, mouseControls, onNoVr })
    attachResizeWindow({ cameras, renderer, camerasConfig })

    vrb.createSpatialOscillator = () => listener.context.createOscillator()
    vrb.createSpatialBufferSource = () => listener.context.createBufferSource()
    vrb.setBackgroundColor = color => renderer.setClearColor(color)
    vrb.player = player
    vrb.createPositionalSound = createPositionalSound
    vrb.getIsPresenting = (): boolean => {
        const session = renderer.xr.getSession()
        return !!session
    }
    vrb.listener = listener
    vrb.cameras = cameras

    return vrb as Vrb
}

export {
    buildVrb,
}
