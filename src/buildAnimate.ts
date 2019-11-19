import vrb from './vrb'
import { BuildAnimateParameters } from './types'

const buildAnimate = ({
                          scene,
                          mouseControls,
                          vrControllers,
                      }: BuildAnimateParameters): VoidFunction => {
    const animate = () => {
        vrb.onAnimate && vrb.onAnimate()
        mouseControls.update()
        // vrControllers.update()
    }

    return animate
}

export {
    buildAnimate,
}
