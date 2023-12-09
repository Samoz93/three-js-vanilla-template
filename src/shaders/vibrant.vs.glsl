uniform float uTime;
uniform float uRadius;
varying vec2 vUv;
const float PI = 3.141592653589793238;
varying vec3 vNormal;
#include "noise.glsl";


void main() {

    vec3 pos = position;
    
    gl_Position =  projectionMatrix  * modelViewMatrix * vec4(pos, 1.0);
    // csm_PositionRaw =  gl_Position;
    vUv = uv;
    vNormal = normal;
}