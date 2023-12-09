    uniform float uTime;
        mat4 rotationMatrix(vec3 axis, float angle) {
          axis = normalize(axis);
          float s = sin(angle);
          float c = cos(angle);
          float oc = 1.0 - c;
          
          return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                      oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                      oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                      0.0,                                0.0,                                0.0,                                1.0);
      }
      
          vec3 rotate(vec3 v, vec3 axis, float angle) {
            mat4 m = rotationMatrix(axis, angle);
            return (m * vec4(v, 1.0)).xyz;
          }
    
vec3 getIBLIrradiance( const in vec3 normal ) {

        #ifdef ENVMAP_TYPE_CUBE_UV

          vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

          vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );

          return PI * envMapColor.rgb * envMapIntensity ;

        #else

          return vec3( 0.0 );

        #endif

      }

      vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {

        #ifdef ENVMAP_TYPE_CUBE_UV

          vec3 reflectVec = reflect( - viewDir, normal );

          // Mixing the reflection with the normal is more accurate and keeps rough objects from gathering light from behind their tangent plane.
          reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );

          reflectVec = inverseTransformDirection( reflectVec, viewMatrix ) ;

          reflectVec = rotate( reflectVec, vec3(.4,1.,1.2), uTime * 0.01 ) ;

          // reflectVec += rotation3d(reflectVec, uTime * 0.1).xyz;
          vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );

          return envMapColor.rgb * envMapIntensity;

        #else

          return vec3( 0.0 );

        #endif

      }