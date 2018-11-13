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
import CAMERAS_CONFIG_DEFAULTS from './camerasConfigDefaults'
import {
    AudioListener,
    Color,
    Object3D,
    OrbitControls,
    OrthographicCamera,
    PerspectiveCamera,
    PositionalAudio, Renderer,
    Scene, VRControls, VREffect,
} from 'three'

export interface AttachResizeWindowParameters {
    cameras: Cameras,
    vrEffect: VrbVREffect,
    renderer: VrbRenderer,
    camerasConfig: CamerasConfig,
}

export interface AttachToggleVrParameters {
    cameras: Cameras,
    vrEffect: VrbVREffect,
    toggle?: HTMLDivElement,
    mouseControls: OrbitControls,
}

export interface BuildAnimateParameters {
    renderer: VrbRenderer,
    scene: Scene,
    mouseControls: OrbitControls,
    vrControls: VrbVRControls,
    vrControllers: any,
    vrEffect: VrbVREffect,
    cameras: Cameras,
}

export interface Cameras {
    perspectiveCamera: PerspectiveCamera,
    orthographicCamera: OrthographicCamera,
    currentCamera: PerspectiveCamera | OrthographicCamera,
}

export interface BuildCamerasParameters {
    camerasConfig: Partial<CamerasConfig>,
}

export interface BuildCreatePositionalSoundParameters {
    listener: AudioListener,
}

export interface BuildListenerParameters {
    perspectiveCamera: PerspectiveCamera,
}

export interface BuildMouseControlsParameters {
    renderer: VrbRenderer,
    cameras: Cameras,
}

export interface BuildPlayerParameters {
    scene: Scene,
    perspectiveCamera: PerspectiveCamera,
    camerasConfig: Partial<CamerasConfig>,
}

export interface BuildRendererParameters {
    viewer?: HTMLDivElement,
}

export interface VrbRenderer extends Renderer {
    setClearColor: (color: Color) => void,
}

export interface BuildRequestAnimationFrameParameters {
    vrEffect: VrbVREffect,
    animate: VoidFunction,
}

export interface BuildVrControllersParameters {
    player: Object3D,
    vrControls: VrbVRControls,
}

export interface BuildVrControlsParameters {
    perspectiveCamera: PerspectiveCamera,
}

export interface VrbVRControls extends VRControls {
    standing: boolean,
    getStandingMatrix: () => string,
}

export interface VrbVREffect extends VREffect {
    getVRDisplay: () => string,
    exitPresent: () => Promise<void>,
    requestPresent: () => Promise<void>,
    isPresenting: boolean,
    requestAnimationFrame: (requestAnimationFrame: VoidFunction) => void,
}

export interface BuildVrEffectParameters {
    renderer: VrbRenderer,
}

export interface CamerasConfig {
    ORTHOGRAPHIC_FRUSTUM_TOP: number,
    ORTHOGRAPHIC_FRUSTUM_BOTTOM: number,
    ORTHOGRAPHIC_FRUSTUM_LEFT: number,
    ORTHOGRAPHIC_FRUSTUM_RIGHT: number,
    ORTHOGRAPHIC_FRUSTUM_NEAR: number,
    ORTHOGRAPHIC_FRUSTUM_FAR: number,
    PERSPECTIVE_ASPECT_RATIO: number,
    PERSPECTIVE_FOV: number,
    PERSPECTIVE_FRUSTUM_FAR: number,
    PERSPECTIVE_FRUSTUM_NEAR: number,
    INITIAL_ORTHOGRAPHIC_POSITION: [ number, number, number ],
    INITIAL_ORTHOGRAPHIC_TARGET: [ number, number, number ],
    INITIAL_PERSPECTIVE_POSITION: [ number, number, number ],
    INITIAL_PERSPECTIVE_TARGET: [ number, number, number ],
}

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

const buildVrb: (buildVrbParameters: BuildVrbParameters) => Vrb = (
    {
        camerasConfig: camerasConfigOverrides,
        scene,
        toggle,
        viewer,
        onAnimate = () => {
        },
        onControllerConnected = () => {
        },
    }: BuildVrbParameters,
): Vrb => {
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

export {
    buildVrb,
}
