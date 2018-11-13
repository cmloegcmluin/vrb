import vrb from './vrb'
import attachResizeWindow from './attachResizeWindow'
import attachToggleVr from './attachToggleVr'
import buildAnimate from './buildAnimate'
import buildCameras from './buildCameras'
import buildCreatePositionalSound from './buildCreatePositionalSound'
import buildListener from './buildListener'
import buildMouseControls from './buildMouseControls'
import buildPlayer from './buildPlayer'
import buildRenderer from './buildRenderer'
import buildRequestAnimationFrame from './buildRequestAnimationFrame'
import buildVrControllers from './buildVrControllers'
import buildVrControls from './buildVrControls'
import buildVrEffect from './buildVrEffect'
import CAMERAS_CONFIG_DEFAULTS, { CamerasConfig } from './camerasConfigDefaults'
import { AudioListener, Color, Object3D, PositionalAudio, Scene } from 'three'

export interface Vrb {
    createSpatialOscillator: () => OscillatorNode,
    getIsPresenting: () => boolean,
    setBackgroundColor: (color: Color) => void,
    player: Object3D,
    createPositionalSound: () => PositionalAudio,
    requestAnimationFrame: VoidFunction,
    listener: AudioListener,
    scene: Scene,
    onAnimate: VoidFunction,
    changeOnAnimate: (newOnAnimate: (oldOnAnimate: VoidFunction) => VoidFunction) => void,
    onControllerConnected: (controller: any) => void,
    changeOnControllerConnected: (newOnControllerConnected: (oldOnControllerConnected: VoidFunction) => VoidFunction) => void
}

export interface BuildVrbParameters {
    scene: Scene,
    camerasConfig?: Partial<CamerasConfig>,
    toggle?: HTMLDivElement,
    viewer?: HTMLDivElement,
    onAnimate?: VoidFunction,
    onControllerConnected?: VoidFunction,
}

const noop: VoidFunction = () => {
}

const buildVrb: (buildVrbParameters: BuildVrbParameters) => Vrb =
    ({
         camerasConfig: camerasConfigOverrides,
         scene,
         toggle,
         viewer,
         onAnimate = () => {
         },
         onControllerConnected = () => {
         },
     }: BuildVrbParameters): Vrb => {
        vrb.scene = scene || new Scene()
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
        vrb.getIsPresenting = () => vrEffect.isPresenting
        vrb.setBackgroundColor = color => renderer.setClearColor(color)
        vrb.player = player
        vrb.createPositionalSound = createPositionalSound
        vrb.requestAnimationFrame = requestAnimationFrame
        vrb.listener = listener

        return vrb as Vrb
    }

export default buildVrb