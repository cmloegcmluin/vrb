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

const webVr = ({camerasConfig, scene, onControllerConnected, toggle, viewer, onAnimate}) => {
    const webVr = {}

    const renderer = buildRenderer({viewer})
    const vrEffect = buildVrEffect({renderer})
    const cameras = buildCameras({camerasConfig})
    const perspectiveCamera = cameras.perspectiveCamera

    const player = buildPlayer({scene, perspectiveCamera, camerasConfig})
    const listener = buildListener({perspectiveCamera})
    const createPositionalSound = buildCreatePositionalSound({listener})
    const vrControls = buildVrControls({perspectiveCamera})
    const mouseControls = buildMouseControls({renderer, cameras})
    const vrControllers = buildVrControllers({player, vrControls, onControllerConnected})
    const animate = buildAnimate({
        renderer,
        scene,
        mouseControls,
        vrControls,
        vrControllers,
        vrEffect,
        cameras,
        onAnimate,
    })
    const requestAnimationFrame = buildRequestAnimationFrame({vrEffect, animate})

    attachToggleVr({cameras, vrEffect, toggle, mouseControls})
    attachResizeWindow({cameras, vrEffect, renderer, camerasConfig})

    webVr.createSpatialOscillator = () => listener.context.createOscillator()
    webVr.isPresenting = () => vrEffect.isPresenting
    webVr.setPresenting = presenting => vrEffect.isPresenting = presenting
    webVr.setBackgroundColor = color => renderer.setClearColor(color)
    webVr.player = player
    webVr.createPositionalSound = createPositionalSound
    webVr.requestAnimationFrame = requestAnimationFrame
    webVr.animate = animate

    return webVr
}

export default webVr
