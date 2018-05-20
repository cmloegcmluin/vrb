import vrControllers from 'three-vrcontroller-module'
import webVr from './webVr'

const buildVrControllers = ({player, vrControls}) => {
    vrControllers.controllers = []

    window.addEventListener('vr controller connected', event => {
        const controller = event.detail
        player.add(controller)
        controller.standingMatrix = vrControls.getStandingMatrix()
        controller.meshGeometryIndex = 0
        vrControllers.controllers.push(controller)

        webVr.onControllerConnected(controller)
    })

    return vrControllers
}

export default buildVrControllers
