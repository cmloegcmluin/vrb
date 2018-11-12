const {AudioListener} = require('three-full')

const buildListener = ({perspectiveCamera}) => {
    const listener = new AudioListener()
    perspectiveCamera.add(listener)

    return listener
}

module.exports = buildListener
