import vrb from './vrb'
import { OrbitControls, Scene } from 'three-full'
import { VrbVREffect } from './buildVrEffect'
import { Cameras } from './buildCameras'
import { VrbVRControls } from './buildVrControls'
import { VrbRenderer } from './buildRenderer'

export interface BuildAnimateParameters {
    renderer: VrbRenderer,
    scene: Scene,
    mouseControls: OrbitControls,
    vrControls: VrbVRControls,
    vrControllers: any,
    vrEffect: VrbVREffect,
    cameras: Cameras,
}

const buildAnimate = ({
                          renderer,
                          scene,
                          mouseControls,
                          vrControls,
                          vrControllers,
                          vrEffect,
                          cameras,
                      } : BuildAnimateParameters): VoidFunction => {
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

export default buildAnimate
