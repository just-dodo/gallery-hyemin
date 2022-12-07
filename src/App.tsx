import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Text, Environment } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'
import * as getUuid from 'uuid-by-string'
import { Image as MyImage } from './Image'
import * as React from 'react'
import { ImageData } from './interfaces/imageData'

const GOLDENRATIO = 1.61803398875

export const App = ({ images }: { images: Array<ImageData> }) => {
  
  // const darkerBurgundy ='#541220'
  const blighterBurgundy  = '#722D32'

  const backgroundColor = blighterBurgundy
  
  return(
  <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
    <color attach="background" args={[backgroundColor]} />
    <fog attach="fog" args={[backgroundColor, 0, 15]} />
    <group position={[0, -0.5, 0]}>
      <Frames images={images} />
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={50}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
          mirror={0}
        />
      </mesh>
    </group>
    <Environment preset="city" />
  </Canvas>
)}

function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }: { images: Array<ImageData>; q?: THREE.Quaternion; p?: THREE.Vector3 }) {
  const ref = useRef(null)
  const clicked = useRef()
  const [, params] = useRoute('/item/:id')
  const [, setLocation] = useLocation()
  useEffect(() => {
    // @ts-ignore
    clicked.current = ref.current.getObjectByName(params?.id)
    if (clicked.current) {
      // @ts-ignore
      clicked.current.parent.updateWorldMatrix(true, true)
      // @ts-ignore
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25))
      // @ts-ignore
      clicked.current.parent.getWorldQuaternion(q)
    } else {
      p.set(0, 0, 5.5)
      q.identity()
    }
  })
  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt, 3)
    easing.dampQ(state.camera.quaternion, q, 0.4, dt, 3)
  })
  return (
    <group
      ref={ref}
      onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? '/' : '/item/' + e.object.name))}
      onPointerMissed={() => setLocation('/')}>
      {images.map((props) => props.url? <Frame key={props.url} {...props} /> : null /* prettier-ignore */)}
    </group>
  )
}

function Frame({ url, c = new THREE.Color(), ...props }: { url: string; c?: THREE.Color; [key: string]: any }) {
  const image = useRef(null)
  const frame = useRef(null)
  const [, params] = useRoute('/item/:id')
  const [hovered, hover] = useState(false)
  // const [rnd] = useState(() => Math.random())
  const caption = props.caption
  const name =  getUuid(url + caption)
  const isActive = params?.id === name
  useCursor(hovered)
  useFrame((state, dt) => {
    if (!image.current) return
    // @ts-ignore
    image.current.geometry.parameters.height = GOLDENRATIO
    // @ts-ignore
    image.current.material.zoom = 1.5 + Math.sin((Math.PI * 3) / 2 + state.clock.elapsedTime / 3) / 2
    // @ts-ignore
    easing.damp3(image.current?.scale, [0.85 * (!isActive && hovered ? 0.85 : 1), 0.9 * (!isActive && hovered ? 0.905 : 1), 1], 0.1, dt, 3)
    // @ts-ignore
    easing.dampC(frame?.current.material.color, hovered ? 'orange' : 'white', 0.1, dt, 3)
  })

  useEffect(() => {
    if (image.current) {
      // @ts-ignore
      image.current.geometry.parameters.height = GOLDENRATIO
      console.log(image.current)
      console.log(image.current)
    }
  }, [image?.current])
  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1, 1, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}>
        <boxGeometry args={[1, GOLDENRATIO, 1]} />
        <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
        <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
          <boxGeometry args={[1, GOLDENRATIO, 1]} />
          <meshBasicMaterial toneMapped={true} fog={true} />
        </mesh>
        <MyImage raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} geometryArgs={[1, GOLDENRATIO]} scale={[1, 1.6]} opacity={props.opacity} />
      </mesh>
      <Text maxWidth={0.1} anchorX="left" anchorY="top" position={[0.55, GOLDENRATIO, 0]} fontSize={0.025}>
        {caption.split('-').join(' ')}
      </Text>
    </group>
  )
}
