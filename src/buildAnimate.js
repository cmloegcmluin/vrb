const vrb = require('./vrb')

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
        vrb.onAnimate()
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

module.exports = buildAnimate
