import { PositionalAudio } from 'three-full'
import { BuildCreatePositionalSoundParameters } from './types'

const buildCreatePositionalSound = ({ listener }: BuildCreatePositionalSoundParameters): () => PositionalAudio => {
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

export {
    buildCreatePositionalSound,
}
