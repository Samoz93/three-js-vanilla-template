precision mediump float;
uniform float uTime;
varying vec2 vUv;
varying vec3 vNormal;
uniform sampler2D uTexture;
#include "noise.glsl";

void main() {
    float diff = dot(vec3(0.2),vNormal);
    float noise = snoise(vec3(vUv * 9.,uTime * 0.05));
    diff = diff;
    vec2 fakeUv = vec2(dot(vec3(1.),vNormal),dot(vec3(0.,1.,0.),vNormal));
    
    float frensel = 1. - dot(cameraPosition,vNormal);
    frensel = pow(frensel,3.) * .001;
    
    fakeUv = abs(fakeUv);
    fakeUv = fract(fakeUv * .3 + vec2(uTime * .004,uTime * .001));
    vec4 tex= texture2D(uTexture,fakeUv + noise * frensel);

    vec4 newText = vec4(mix(tex.rgb,vec3(1.),frensel),1.);

    diff = sin(diff * 1.);
    vec3 clr = mix(vec3(diff),vNormal,.2);
    gl_FragColor =  vec4(clr,1.);
    gl_FragColor =  vec4(tex);
    gl_FragColor =  vec4(newText);
    // gl_FragColor =  vec4(vec3(frensel),1.);

    // csm_DiffuseColor = gl_FragColor;
}
