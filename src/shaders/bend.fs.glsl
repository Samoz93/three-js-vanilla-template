precision mediump float;
uniform float uTime;

void main() {
    gl_FragColor =  vec4(vec3(uTime),1.);
    // csm_DiffuseColor = gl_FragColor;
}
