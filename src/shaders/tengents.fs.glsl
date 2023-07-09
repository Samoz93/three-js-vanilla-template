varying float vNoise;

varying vec2 vUv;



vec3 palette(float t)
{
    vec3 a = vec3(0.5, 0.5, 0.5		);
    vec3 b = vec3(0.5, 0.5, 0.5		);
    vec3 c = vec3(1.0, 1.0, 1.0	);
    vec3 d = vec3(0.00, 0.10, 0.20	);
    return a + b * cos( 6.28318*(c*t+d) );
}

void main() {
    vec3 color = palette(vNoise);
    // gl_FragColor = vec4(color, 1.0);
    // gl_FragColor =  vec4(vNoise,0,0, 1.0);
    // csm_DiffuseColor = gl_FragColor;
    csm_DiffuseColor.rgb = color;
    
}