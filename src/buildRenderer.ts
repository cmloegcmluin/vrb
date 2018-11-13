import { WebGLRenderer } from 'three-full'
import { BuildRendererParameters, VrbRenderer } from './index'

const DEFAULT_PIXEL_RATIO = 4

const buildRenderer = ({viewer}: BuildRendererParameters): VrbRenderer => {
    const renderer = new WebGLRenderer({antialias: true})
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, DEFAULT_PIXEL_RATIO))
    renderer.setSize(window.innerWidth, window.innerHeight)

    viewer && viewer.appendChild(renderer.domElement)

    return renderer
}

export default buildRenderer
