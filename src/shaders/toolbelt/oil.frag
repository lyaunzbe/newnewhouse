uniform vec2 resolution;
uniform float time;
uniform sampler2D texture;
varying vec2 vUv;
uniform vec2 mouse;
uniform float greyscale;

//RADIUS of our vignette, where 0.5 results in a circle fitting the screen
const float RADIUS = 0.75;

//softness of our vignette, between 0.0 and 1.0
const float SOFTNESS = 0.45;

void main( void ){
  vec2 uv = vUv;

  vec2 e = 1.0/resolution.xy;


  float am1 = 0.5 + 0.5*0.927180409;
  float am2 = 10.0;

  for( int i=0; i<5; i++ ){
  	float h  = dot( texture2D(texture, uv*0.99            ).xyz, vec3(0.5) );
  	float h1 = dot( texture2D(texture, uv+vec2(e.x,0.0)).xyz, vec3(0.5) );
  	float h2 = dot( texture2D(texture, uv+vec2(0.0,e.y)).xyz, vec3(0.5) );
  	vec2 g = 0.001*vec2( (h-h2), (h-h1) )/e;
//     	vec2 g = 0.001*vec2( (h1-h) (h2-h) )/e;
  	vec2 f = g.yx*vec2(3.0*mouse.x ,3.0*mouse.y);

 	  g = mix( g,f, am1 );
  	uv += 0.00005*g*am2;
  }

  vec3 col = texture2D(texture, uv).xyz;

  if (greyscale == 1.0) {
    vec2 position = (gl_FragCoord.xy / resolution.xy) - vec2(0.5);
    float len = length(position);
    float vignette = smoothstep(RADIUS, RADIUS-SOFTNESS, len);
    col.rgb = mix(col.rgb, col.rgb * vignette, 0.5);

    float gray = dot(col.rgb, vec3(0.299, 0.587, 0.114));

//     gl_FragColor = texture2D(texture,uv);
    gl_FragColor = vec4(gray,gray,gray, 1.0);
  } else {
    gl_FragColor = vec4(col, 1.0);
  }

  // gl_FragColor = vec4(col, 1.0);
}
