// src/Components/Hellmet.jsx
import React, { useEffect } from 'react'
import { useLoader } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function HelmetModel({ textureURL, color }) {
  const { scene } = useGLTF('/motorcycle_helmet.glb')
  const texture = useLoader(THREE.TextureLoader, textureURL || '/default.jpg')

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        if (textureURL) {
          child.material.map = texture
          child.material.color = new THREE.Color('#ffffff')
        } else {
          child.material.map = null
          child.material.color = new THREE.Color(color)
        }
        child.material.needsUpdate = true
      }
    })
  }, [scene, color, texture, textureURL])

  return <primitive object={scene} scale={0.02} />
}

export default HelmetModel
