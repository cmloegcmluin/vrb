import vrControllers from 'three-vrcontroller-module'
import vrb from './vrb'

const buildVrControllers = ({player, vrControls}) => {
    vrControllers.controllers = []

    window.addEventListener('vr controller connected', event => {
        const controller = event.detail
        player.add(controller)
        controller.standingMatrix = vrControls.getStandingMatrix()
        controller.meshGeometryIndex = 0
        vrControllers.controllers.push(controller)

        vrb.onControllerConnected(controller)
    })

    return vrControllers
}

export default buildVrControllers
