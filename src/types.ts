import {
    AudioListener,
    Color,
    Object3D,
    OrthographicCamera,
    PerspectiveCamera,
    PositionalAudio,
    Scene,
    VRControls,
    WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three-orbitcontrols-ts'

interface AttachResizeWindowParameters {
    cameras: Cameras,
    renderer: WebGLRenderer,
    camerasConfig: CamerasConfig,
}

interface BuildAnimateParameters {
    scene: Scene,
    mouseControls: OrbitControls,
    vrControls: VrbVRControls,
    vrControllers: any,
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
    renderer: WebGLRenderer,
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
    scene?: Scene,
    camerasConfig?: Partial<CamerasConfig>,
    toggle?: HTMLDivElement,
    viewer?: HTMLDivElement,
    onAnimate?: VoidFunction,
    onControllerConnected?: VoidFunction,
}

type BuildVrb = (buildVrbParameters: BuildVrbParameters) => Vrb

interface Vrb {
    cameras: Cameras,
    createSpatialBufferSource: () => AudioBufferSourceNode,
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
    BuildAnimateParameters,
    BuildCamerasParameters,
    BuildCreatePositionalSoundParameters,
    BuildListenerParameters,
    BuildMouseControlsParameters,
    BuildPlayerParameters,
    BuildRendererParameters,
    BuildVrb,
    BuildVrbParameters,
    BuildVrControllersParameters,
    BuildVrControlsParameters,
    CamerasConfig,
    Cameras,
    Vrb,
    WebGLRenderer,
    VrbVRControls,
}
