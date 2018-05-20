import webVr from './webVr'

const buildAnimate = ({
                          renderer,
                          scene,
                          locomotion,
                          mouseControls,
                          vrControls,
                          vrControllers,
                          vrEffect,
                          cameras,
                      }) => {
    const animate = () => {
        webVr.onAnimate()
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
