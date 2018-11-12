const {PositionalAudio} = require('three-full')

const buildCreatePositionalSound = ({listener}) => {
    const createPositionalSound = () => {
        const positionalSound = new PositionalAudio(listener)
        positionalSound.setVolume(0)
        positionalSound.setRolloffFactor(2)
        positionalSound.setDistanceModel('exponential')
        positionalSound.getOutput().panningModel = 'HRTF'

        return positionalSound
    }

    return createPositionalSound
}

module.exports = buildCreatePositionalSound
