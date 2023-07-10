precision mediump float;
uniform float uTime;
uniform float uRadius;
uniform sampler2D uImage;
varying vec3 vColor;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;


    
const vec2 center = vec2(0.5);

float drawCircle(vec2 pos, float radius, vec2 st){
    return step(radius,distance(pos,st ));
}

float drawBox( in vec2 p, in vec2 b )
{
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

void main() {
    vec2 uv = vUv;
    float line = step(.999,1. - abs(vUv.x - 0.5));
    float circle =  1. - step(0.1, length(vUv-0.5));
    circle =  drawCircle(vUv, uRadius, center);
    float box =  step(0.1,drawBox(vUv-.5, vec2(uRadius)));
    // 
    vec3 color = vec3(line );
    color = vec3(circle );
    color = vec3(box );
    vec4 tex = texture2D(uImage, vUv );
    color = tex.rgb + vNormal;
    gl_FragColor =  vec4(color,1.);
}

// precision mediump float;
// uniform float uTime;
// uniform float uRadius;
// varying vec3 vColor;
// varying vec2 vUv;
// varying vec3 vPosition;
// varying vec3 vNormal;

// void main() {
//     vec2 uv = vUv;
//     uv -= vec2(uRadius);
//     uv*= 2.;
//     float radius = 0.5;
//     float len = length(uv);
//     // float smoothed = smoothstep(radius -.4, radius , len);
//     float fracted = mod(len * 20.,3.);
//     vec3 color = vec3(fracted);
//     color = normalize(cameraPosition - vPosition);
//     float fresnel = 1. - dot(color,vNormal) ;
//     // if ( color.y < 0.1 ) discard;
//     gl_FragColor =  vec4(fresnel  - color,1.);
// }