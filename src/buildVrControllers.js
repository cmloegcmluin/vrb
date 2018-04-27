import vrControllers from 'three-vrcontroller-module'

const buildVrControllers = ({player, vrControls, onControllerConnected}) => {
    vrControllers.controllers = []

    window.addEventListener('vr controller connected', event => {
        const controller = event.detail
        player.add(controller)
        controller.standingMatrix = vrControls.getStandingMatrix()
        controller.meshGeometryIndex = 0
        vrControllers.controllers.push(controller)

        onControllerConnected(controller)
    })

    return vrControllers
}

export default buildVrControllers
