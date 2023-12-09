precision mediump float;
uniform float uRadius;
uniform float uTime;
uniform float uDisplacement;
varying vec2 vUv;
uniform sampler2D uImage;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
    vec3 pos = position;
    vUv = uv;
    vec4 img = texture2D(uImage, vUv);
    // if(img.x == img.z)
    pos.z += img.x * uDisplacement;
    gl_Position =  projectionMatrix  * modelViewMatrix * vec4(pos, .1);
    gl_PointSize = uRadius;
}