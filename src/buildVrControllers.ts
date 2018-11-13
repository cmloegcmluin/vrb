// @ts-ignore
import vrControllers from 'three-vrcontroller-module'
import vrb from './vrb'
import { Object3D } from 'three-full'
import { VrbVRControls } from './buildVrControls'

interface BuildVrControllersParameters {
    player: Object3D,
    vrControls: VrbVRControls,
}

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
