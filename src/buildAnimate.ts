import vrb from './vrb'
import { BuildAnimateParameters } from './types'

const buildAnimate = ({
                          renderer,
                          scene,
                          mouseControls,
                          vrControls,
                          vrControllers,
                          vrEffect,
                          cameras,
                      }: BuildAnimateParameters): VoidFunction => {
    const animate = () => {
        vrb.onAnimate && vrb.onAnimate()
        mouseControls.update()

        if (vrEffect.isPresenting) {
            vrControls.update()
            vrControllers.update()
        }
        vrEffect.render(scene, cameras.currentCamera)
        if (vrEffect.isPresenting) renderer.render(scene, cameras.currentCamera)
    }

    return animate
}

export {
    buildAnimate,
}
