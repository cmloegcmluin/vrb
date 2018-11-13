// @ts-ignore
import vrControllers from 'three-vrcontroller-module'
import vrb from './vrb'
import { BuildVrControllersParameters } from './index'

const buildVrControllers = ({player, vrControls}: BuildVrControllersParameters): any => {
    vrControllers.controllers = []

    window.addEventListener('vr controller connected', event => {
        // @ts-ignore
        const controller = event.detail
        player.add(controller)
        controller.standingMatrix = vrControls.getStandingMatrix()
        controller.meshGeometryIndex = 0
        vrControllers.controllers.push(controller)

        vrb.onControllerConnected && vrb.onControllerConnected(controller)
    })

    return vrControllers
}

export default buildVrControllers
