precision mediump float;
uniform float uTime;
uniform float uRadius;
uniform sampler2D uImage;
varying vec3 vColor;
varying vec2 vUv;
varying float uPSize;

float circle(vec2 uv,float border){
    float radius = .5;
    float dist = radius - distance(uv,vec2(.5));
    return smoothstep(0.,border,dist);
}

void main() {
    vec4 data =  texture2D(uImage, vUv );
    data.a *= circle(gl_PointCoord,.1);
    if(data.r < .3) discard;
    // if(data.r != data.b) discard;
    gl_FragColor = data;
}
