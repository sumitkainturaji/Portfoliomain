// 'use client'
// import { cn } from '@/lib/utils'
// import { Canvas, useFrame, useThree } from '@react-three/fiber'
// import React, { useMemo, useRef } from 'react'
// import * as THREE from 'three'

// export const CanvasRevealEffect = ({
//   animationSpeed = 0.4,
//   opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
//   colors = [[0, 255, 255]],
//   containerClassName,
//   dotSize,
//   showGradient = true,
// }: {
//   animationSpeed?: number
//   opacities?: number[]
//   colors?: number[][]
//   containerClassName?: string
//   dotSize?: number
//   showGradient?: boolean
// }) => {
//   return (
//     <div className={cn('h-full relative bg-white w-full', containerClassName)}>
//       <div className="h-full w-full">
//         <DotMatrix
//           colors={colors ?? [[0, 255, 255]]}
//           dotSize={dotSize ?? 3}
//           opacities={
//             opacities ?? [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1]
//           }
//           shader={`
//               float animation_speed_factor = ${animationSpeed.toFixed(1)};
//               float intro_offset = distance(u_resolution / 2.0 / u_total_size, st2) * 0.01 + (random(st2) * 0.15);
//               opacity *= step(intro_offset, u_time * animation_speed_factor);
//               opacity *= clamp((1.0 - step(intro_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
//             `}
//           center={['x', 'y']}
//         />
//       </div>
//       {showGradient && (
//         <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-[84%]" />
//       )}
//     </div>
//   )
// }

// interface DotMatrixProps {
//   colors?: number[][]
//   opacities?: number[]
//   totalSize?: number
//   dotSize?: number
//   shader?: string
//   center?: ('x' | 'y')[]
// }

// const DotMatrix: React.FC<DotMatrixProps> = ({
//   colors = [[0, 0, 0]],
//   opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14],
//   totalSize = 4,
//   dotSize = 2,
//   shader = '',
//   center = ['x', 'y'],
// }) => {
//   const uniforms = React.useMemo(() => {
//     let colorsArray = [
//       colors[0],
//       colors[0],
//       colors[0],
//       colors[0],
//       colors[0],
//       colors[0],
//     ]
//     if (colors.length === 2) {
//       colorsArray = [
//         colors[0],
//         colors[0],
//         colors[0],
//         colors[1],
//         colors[1],
//         colors[1],
//       ]
//     } else if (colors.length === 3) {
//       colorsArray = [
//         colors[0],
//         colors[0],
//         colors[1],
//         colors[1],
//         colors[2],
//         colors[2],
//       ]
//     }

//     return {
//       u_colors: {
//         value: colorsArray.map((color) => [
//           color[0] / 255,
//           color[1] / 255,
//           color[2] / 255,
//         ]),
//         type: 'uniform3fv',
//       },
//       u_opacities: {
//         value: opacities,
//         type: 'uniform1fv',
//       },
//       u_total_size: {
//         value: totalSize,
//         type: 'uniform1f',
//       },
//       u_dot_size: {
//         value: dotSize,
//         type: 'uniform1f',
//       },
//     }
//   }, [colors, opacities, totalSize, dotSize])

//   return (
//     <Shader
//       source={`
//         precision mediump float;
//         in vec2 fragCoord;

//         uniform float u_time;
//         uniform float u_opacities[10];
//         uniform vec3 u_colors[6];
//         uniform float u_total_size;
//         uniform float u_dot_size;
//         uniform vec2 u_resolution;
//         out vec4 fragColor;
//         float PHI = 1.61803398874989484820459;
//         float random(vec2 xy) {
//             return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
//         }
//         float map(float value, float min1, float max1, float min2, float max2) {
//             return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
//         }
//         void main() {
//             vec2 st = fragCoord.xy;
//             ${
//               center.includes('x')
//                 ? 'st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));'
//                 : ''
//             }
//             ${
//               center.includes('y')
//                 ? 'st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));'
//                 : ''
//             }
//       float opacity = step(0.0, st.x);
//       opacity *= step(0.0, st.y);

//       vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));

//       float frequency = 5.0;
//       float show_offset = random(st2);
//       float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency) + 1.0);
//       opacity *= u_opacities[int(rand * 10.0)];
//       opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
//       opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));

//       vec3 color = u_colors[int(show_offset * 6.0)];

//       ${shader}

//       fragColor = vec4(color, opacity);
//       fragColor.rgb *= fragColor.a;
//         }`}
//       uniforms={uniforms}
//       maxFps={60}
//     />
//   )
// }

// type Uniforms = {
//   [key: string]: {
//     value: number[] | number[][] | number
//     type: string
//   }
// }
// const ShaderMaterial = ({
//   source,
//   uniforms,
//   maxFps = 60,
// }: {
//   source: string
//   hovered?: boolean
//   maxFps?: number
//   uniforms: Uniforms
// }) => {
//   const { size } = useThree()
//   const ref = useRef<THREE.Mesh>()
//   let lastFrameTime = 0

//   useFrame(({ clock }) => {
//     if (!ref.current) return
//     const timestamp = clock.getElapsedTime()
//     if (timestamp - lastFrameTime < 1 / maxFps) {
//       return
//     }
//     lastFrameTime = timestamp

//     const material: any = ref.current.material
//     const timeLocation = material.uniforms.u_time
//     timeLocation.value = timestamp
//   })

//   const getUniforms = () => {
//     const preparedUniforms: any = {}

//     for (const uniformName in uniforms) {
//       const uniform: any = uniforms[uniformName]

//       switch (uniform.type) {
//         case 'uniform1f':
//           preparedUniforms[uniformName] = { value: uniform.value, type: '1f' }
//           break
//         case 'uniform3f':
//           preparedUniforms[uniformName] = {
//             value: new THREE.Vector3().fromArray(uniform.value),
//             type: '3f',
//           }
//           break
//         case 'uniform1fv':
//           preparedUniforms[uniformName] = { value: uniform.value, type: '1fv' }
//           break
//         case 'uniform3fv':
//           preparedUniforms[uniformName] = {
//             value: uniform.value.map((v: number[]) =>
//               new THREE.Vector3().fromArray(v)
//             ),
//             type: '3fv',
//           }
//           break
//         case 'uniform2f':
//           preparedUniforms[uniformName] = {
//             value: new THREE.Vector2().fromArray(uniform.value),
//             type: '2f',
//           }
//           break
//         default:
//           console.error(`Invalid uniform type for '${uniformName}'.`)
//           break
//       }
//     }

//     preparedUniforms['u_time'] = { value: 0, type: '1f' }
//     preparedUniforms['u_resolution'] = {
//       value: new THREE.Vector2(size.width * 2, size.height * 2),
//     } // Initialize u_resolution
//     return preparedUniforms
//   }

//   // Shader material
//   const material = useMemo(() => {
//     const materialObject = new THREE.ShaderMaterial({
//       vertexShader: `
//       precision mediump float;
//       in vec2 coordinates;
//       uniform vec2 u_resolution;
//       out vec2 fragCoord;
//       void main(){
//         float x = position.x;
//         float y = position.y;
//         gl_Position = vec4(x, y, 0.0, 1.0);
//         fragCoord = (position.xy + vec2(1.0)) * 0.5 * u_resolution;
//         fragCoord.y = u_resolution.y - fragCoord.y;
//       }
//       `,
//       fragmentShader: source,
//       uniforms: getUniforms(),
//       glslVersion: THREE.GLSL3,
//       blending: THREE.CustomBlending,
//       blendSrc: THREE.SrcAlphaFactor,
//       blendDst: THREE.OneFactor,
//     })

//     return materialObject
//   }, [size.width, size.height, source])

//   return (
//     <mesh ref={ref as any}>
//       <planeGeometry args={[2, 2]} />
//       <primitive object={material} attach="material" />
//     </mesh>
//   )
// }

// const Shader: React.FC<ShaderProps> = ({ source, uniforms, maxFps = 60 }) => {
//   return (
//     <Canvas className="absolute inset-0  h-full w-full">
//       <ShaderMaterial source={source} uniforms={uniforms} maxFps={maxFps} />
//     </Canvas>
//   )
// }
// interface ShaderProps {
//   source: string
//   uniforms: {
//     [key: string]: {
//       value: number[] | number[][] | number
//       type: string
//     }
//   }
//   maxFps?: number
// }


'use client'
import { AnimatePresence, motion } from 'motion/react'
import React from 'react'
import { CanvasRevealEffect } from './ui/CanvasRevealEffect'

const Approach = () => {
  return (
    <section className="w-full py-20 ">
      <h1 className="md:text-4xl flex justify-center items-center gap-2 font-bold sm:text-2xl lg:text-5xl ">
        My <span className="text-[#8333ea]">Approach</span>
      </h1>
      <div className="my-20 flex flex-col lg:flex-row items-center justify-center gap-4">
        <Card
          title="Planning & Strategy"
          icon={<AceternityIcon order="Phase 1" />}
          description="We'll collaborate to map out your websites goals, target audience, and key functionalities. Well discuss things like site structure, navigation, and content requirements."
        >
          <CanvasRevealEffect
            animationSpeed={5.1}
            containerClassName="bg-emerald-900"
          />
        </Card>
        <Card
          title="Development & Progress  Update"
          icon={<AceternityIcon order="Phase 2" />}
          description="Once we agree on the plan, I cue my lofi playlist and dive into coding. From initial sketches to polished code, I keep you updated every step of the way."
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-black"
            colors={[
              [256, 74, 163],
              [262, 191, 209],
            ]}
            dotSize={1}
          />
        </Card>
        <Card
          title="Development & Launch"
          icon={<AceternityIcon order="Phase 3" />}
          description="This is where the magic happens! Based on the approved design, Ill translate everything into functional code building your website from the ground up."
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-sky-600"
            colors={[[125, 211, 252]]}
          />
        </Card>
      </div>
    </section>
  )
}

const Card = ({
  title,
  icon,
  children,
  description,
}: {
  title: string
  icon: React.ReactNode
  children?: React.ReactNode
  description?: string
}) => {
  const [hovered, setHovered] = React.useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2] max-w-sm w-full mx-auto p-4 relative h-[30rem] lg:h-[35rem] rounded-3xl group-hover:rounded-3xl transition-all duration-300"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0  "
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20">
        <div className="text-center group-hover/canvas-card:-translate-y-4 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center">
          {icon}
        </div>
        <h2 className="dark:text-white text-3xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200 text-center ">
          {title}
        </h2>
        <h2
          className="text-sm dark:text-white opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200 text-center"
          style={{ color: '#e4ecff' }}
        >
          {description}
        </h2>
      </div>
    </div>
  )
}

const AceternityIcon = ({ order }: { order: string }) => {
  return (
    <div>
      <button className="relative inline-flex h-12   overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-5 py-2 text-2xl font-bold  text-white backdrop-blur-3xl border-2">
          {order}
        </span>
      </button>
    </div>
  )
}

export const Icon = ({ className, ...rest }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  )
}
export default Approach

