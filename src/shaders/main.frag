uniform float time;

uniform vec2 resolution;


const float PI = 3.1415926535;



//stolen and modified from las @ pouet.net
vec3 hsv(in float h, in float s, in float v, in vec3 p){
    return mix(	vec3(1.),
               	clamp(	(abs(fract(h+(p/3.))*20.0-9.)-1.),
                   		0.,
                   		1.),
            	s)
    	*v;
}

vec3 palette(in float t){
    float r = sin(t);
    float g = cos(t/10.);
    float b = cos((t + 10.*PI)*.25) + 7.;
    return vec3(r,g,b);
}

void main()
{
  float t = time ;
  float scale = 2.;

	vec2 uv = -1. + 2.*(gl_FragCoord.xy / resolution.xy);
  uv.x *= resolution.x/resolution.y*.5+.5;
  uv *= scale;

  float a = .5;
  float b = .4;

  vec2 point = vec2(cos(t*a + PI/2.), sin(t*b))*1.;

  float cola = cos(distance(uv, point));

  float colb = cos(distance(uv + t*1., vec2(0.)));

  float colc = cos(uv.x + t*.5);

	gl_FragColor = vec4(hsv((cola + colb + colc)/5., 1., 1., palette(t)) ,1.0);
}
