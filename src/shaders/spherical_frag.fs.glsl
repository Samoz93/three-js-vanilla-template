precision mediump float;
varying float vPattern;

void main() {
    gl_FragColor =  vec4(vec3(1.,0.,vPattern),1.);
    csm_DiffuseColor = gl_FragColor;
}
