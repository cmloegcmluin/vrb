import vrb from './vrb'
import { BuildAnimateParameters } from './types'

const buildAnimate = ({
                          scene,
                          mouseControls,
                          vrControls,
                          vrControllers,
                      }: BuildAnimateParameters): VoidFunction => {
    const animate = () => {
        vrb.onAnimate && vrb.onAnimate()
        mouseControls.update()

        vrControls.update()
        vrControllers.update()
    }

    return animate
}

export {
    buildAnimate,
}
