import {AudioListener, PositionalAudio} from 'three-full'

export interface BuildCreatePositionalSoundParameters {
    listener: AudioListener,
}

const buildCreatePositionalSound = ({listener}: BuildCreatePositionalSoundParameters): () => PositionalAudio => {
    const createPositionalSound = () => {
        const positionalSound = new PositionalAudio(listener)
        positionalSound.setVolume(0)
        positionalSound.setRolloffFactor(2)
        // @ts-ignore
        positionalSound.setDistanceModel('exponential')
        // @ts-ignore
        positionalSound.getOutput().panningModel = 'HRTF'

        return positionalSound
    }

    return createPositionalSound
}

export default buildCreatePositionalSound
