import {VREffect} from 'three-full'

const buildVrEffect = ({renderer}) => {
    const vrEffect = new VREffect(renderer)

    return vrEffect
}

export default buildVrEffect
