uniform float uTime;
uniform float uProgress;

void main() {
    // csm_DiffuseColor = vec4(sin(uTime), uProgress, cos(uTime), 1.0);
    gl_FragColor =  vec4(sin(uTime), uProgress, cos(uTime), 1.0);
}