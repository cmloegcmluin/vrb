const vrb = require('./src/vrb')
const attachResizeWindow = require('./src/attachResizeWindow')
const attachToggleVr = require('./src/attachToggleVr')
const buildAnimate = require('./src/buildAnimate')
const buildCameras = require('./src/buildCameras')
const buildCreatePositionalSound = require('./src/buildCreatePositionalSound')
const buildListener = require('./src/buildListener')
const buildMouseControls = require('./src/buildMouseControls')
const buildPlayer = require('./src/buildPlayer')
const buildRenderer = require('./src/buildRenderer')
const buildRequestAnimationFrame = require('./src/buildRequestAnimationFrame')
const buildVrControllers = require('./src/buildVrControllers')
const buildVrControls = require('./src/buildVrControls')
const buildVrEffect = require('./src/buildVrEffect')
const CAMERAS_CONFIG_DEFAULTS = require('./src/camerasConfigDefaults')

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

module.exports = buildVrb
