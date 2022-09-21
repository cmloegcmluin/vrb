import { WebGLRenderer } from 'three'
import { BuildRendererParameters } from './types'

const DEFAULT_PIXEL_RATIO = 4

const buildRenderer = ({viewer }: BuildRendererParameters): WebGLRenderer => {
    const renderer: WebGLRenderer = new WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, DEFAULT_PIXEL_RATIO))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.xr.enabled = true

    viewer && viewer.appendChild(renderer.domElement)

    return renderer
}

export {
    buildRenderer,
}
