import vrb from './src/vrb'
import attachResizeWindow from './src/attachResizeWindow'
import attachToggleVr from './src/attachToggleVr'
import buildAnimate from './src/buildAnimate'
import buildCameras from './src/buildCameras'
import buildCreatePositionalSound from './src/buildCreatePositionalSound'
import buildListener from './src/buildListener'
import buildMouseControls from './src/buildMouseControls'
import buildPlayer from './src/buildPlayer'
import buildRenderer from './src/buildRenderer'
import buildRequestAnimationFrame from './src/buildRequestAnimationFrame'
import buildVrControllers from './src/buildVrControllers'
import buildVrControls from './src/buildVrControls'
import buildVrEffect from './src/buildVrEffect'
import CAMERAS_CONFIG_DEFAULTS from './src/camerasConfigDefaults'

const buildVrb = ({
                        camerasConfig: camerasConfigOverrides,
                        scene,
                        toggle,
                        viewer,
                        onAnimate = () => {
                        },
                        onControllerConnected = () => {
                        },
                    }) => {
    vrb.onAnimate = onAnimate
    vrb.changeOnAnimate = onAnimateChangingFunction => {
        vrb.onAnimate = onAnimateChangingFunction(vrb.onAnimate)
    }

    vrb.onControllerConnected = onControllerConnected
    vrb.changeOnControllerConnected = onControllerConnectedChangingFunction => {
        vrb.onControllerConnected = onControllerConnectedChangingFunction(vrb.onControllerConnected)
    }

    const camerasConfig = Object.assign(CAMERAS_CONFIG_DEFAULTS, camerasConfigOverrides)

    const renderer = buildRenderer({viewer})
    const vrEffect = buildVrEffect({renderer})
    const cameras = buildCameras({camerasConfig})
    const perspectiveCamera = cameras.perspectiveCamera

    const player = buildPlayer({scene, perspectiveCamera, camerasConfig})
    const listener = buildListener({perspectiveCamera})
    const createPositionalSound = buildCreatePositionalSound({listener})
    const vrControls = buildVrControls({perspectiveCamera})
    const mouseControls = buildMouseControls({renderer, cameras})
    const vrControllers = buildVrControllers({player, vrControls})
    const animate = buildAnimate({
        renderer,
        scene,
        mouseControls,
        vrControls,
        vrControllers,
        vrEffect,
        cameras,
    })
    const requestAnimationFrame = buildRequestAnimationFrame({vrEffect, animate})

    attachToggleVr({cameras, vrEffect, toggle, mouseControls})
    attachResizeWindow({cameras, vrEffect, renderer, camerasConfig})

    vrb.createSpatialOscillator = () => listener.context.createOscillator()
    vrb.getIsPresenting = () => vrEffect.isPresenting
    vrb.setBackgroundColor = color => renderer.setClearColor(color)
    vrb.player = player
    vrb.createPositionalSound = createPositionalSound
    vrb.requestAnimationFrame = requestAnimationFrame

    return vrb
}

export default buildVrb
