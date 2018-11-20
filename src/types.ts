import {
    AudioListener,
    Color,
    Object3D,
    OrbitControls,
    OrthographicCamera,
    PerspectiveCamera,
    PositionalAudio,
    Renderer,
    Scene,
    VRControls,
    VREffect,
} from 'three-full'

interface AttachResizeWindowParameters {
    cameras: Cameras,
    vrEffect: VrbVREffect,
    renderer: VrbRenderer,
    camerasConfig: CamerasConfig,
}

interface AttachToggleVrParameters {
    cameras: Cameras,
    vrEffect: VrbVREffect,
    toggle?: HTMLDivElement,
    mouseControls: OrbitControls,
}

interface BuildAnimateParameters {
    renderer: VrbRenderer,
    scene: Scene,
    mouseControls: OrbitControls,
    vrControls: VrbVRControls,
    vrControllers: any,
    vrEffect: VrbVREffect,
    cameras: Cameras,
}

interface Cameras {
    perspectiveCamera: PerspectiveCamera,
    orthographicCamera: OrthographicCamera,
    currentCamera: PerspectiveCamera | OrthographicCamera,
}

interface BuildCamerasParameters {
    camerasConfig: Partial<CamerasConfig>,
}

interface BuildCreatePositionalSoundParameters {
    listener: AudioListener,
}

interface BuildListenerParameters {
    perspectiveCamera: PerspectiveCamera,
}

interface BuildMouseControlsParameters {
    renderer: VrbRenderer,
    cameras: Cameras,
}

interface BuildPlayerParameters {
    scene: Scene,
    perspectiveCamera: PerspectiveCamera,
    camerasConfig: Partial<CamerasConfig>,
}

interface BuildRendererParameters {
    viewer?: HTMLDivElement,
}

interface VrbRenderer extends Renderer {
    setClearColor: (color: Color) => void,
}

interface BuildRequestAnimationFrameParameters {
    vrEffect: VrbVREffect,
    animate: VoidFunction,
}

interface BuildVrControllersParameters {
    player: Object3D,
    vrControls: VrbVRControls,
}

interface BuildVrControlsParameters {
    perspectiveCamera: PerspectiveCamera,
}

interface VrbVRControls extends VRControls {
    standing: boolean,
    getStandingMatrix: () => string,
}

interface VrbVREffect extends VREffect {
    getVRDisplay: () => string,
    exitPresent: () => Promise<void>,
    requestPresent: () => Promise<void>,
    isPresenting: boolean,
    requestAnimationFrame: (requestAnimationFrame: VoidFunction) => void,
}

interface BuildVrEffectParameters {
    renderer: VrbRenderer,
}

interface CamerasConfig {
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

interface BuildVrbParameters {
    scene: Scene,
    camerasConfig?: Partial<CamerasConfig>,
    toggle?: HTMLDivElement,
    viewer?: HTMLDivElement,
    onAnimate?: VoidFunction,
    onControllerConnected?: VoidFunction,
}

type BuildVrb = (buildVrbParameters: BuildVrbParameters) => Vrb

interface Vrb {
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

export {
    AttachResizeWindowParameters,
    AttachToggleVrParameters,
    BuildAnimateParameters,
    BuildCamerasParameters,
    BuildCreatePositionalSoundParameters,
    BuildListenerParameters,
    BuildMouseControlsParameters,
    BuildPlayerParameters,
    BuildRendererParameters,
    BuildRequestAnimationFrameParameters,
    BuildVrb,
    BuildVrbParameters,
    BuildVrControllersParameters,
    BuildVrControlsParameters,
    BuildVrEffectParameters,
    CamerasConfig,
    Cameras,
    Vrb,
    VrbRenderer,
    VrbVRControls,
    VrbVREffect,
}
