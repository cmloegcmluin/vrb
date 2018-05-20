import webVr from './src/webVr'
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

const buildWebVr = ({
                        camerasConfig: camerasConfigOverrides,
                        scene,
                        toggle,
                        viewer,
                        onAnimate = () => {
                        },
                        onControllerConnected = () => {
                        },
                    }) => {
    webVr.onAnimate = onAnimate
    webVr.changeAnimate = onAnimateChangingFunction => {
        webVr.onAnimate = onAnimateChangingFunction(webVr.onAnimate)
    }

    webVr.onControllerConnected = onControllerConnected
    webVr.changeOnControllerConnected = onControllerConnectedChangingFunction => {
        webVr.onControllerConnected = onControllerConnectedChangingFunction(webVr.onControllerConnected)
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

    webVr.createSpatialOscillator = () => listener.context.createOscillator()
    webVr.getIsPresenting = () => vrEffect.isPresenting
    webVr.setPresenting = presenting => vrEffect.isPresenting = presenting
    webVr.setBackgroundColor = color => renderer.setClearColor(color)
    webVr.player = player
    webVr.createPositionalSound = createPositionalSound
    webVr.requestAnimationFrame = requestAnimationFrame
    webVr.animate = animate

    return webVr
}

export default buildWebVr
