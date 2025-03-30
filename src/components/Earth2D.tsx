
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Earth3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 3;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    
    containerRef.current.appendChild(renderer.domElement);
    
    // Earth
    const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
    
    // Create simple materials with gradient colors for a stylized look
    const earthMaterial = new THREE.MeshBasicMaterial({
      color: 0x219ebc,
      transparent: true,
      opacity: 0.8,
    });
    
    const landMaterial = new THREE.MeshBasicMaterial({
      color: 0x52b788,
      transparent: true,
      opacity: 0.7,
    });
    
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    
    // Create stylized continents using simple geometry
    const continentsGeometry = new THREE.SphereGeometry(1.01, 32, 32);
    // Only use certain segments to create "continent" shapes
    for (let i = 0; i < continentsGeometry.attributes.position.count; i++) {
      const idx = i * 3;
      const x = continentsGeometry.attributes.position.array[idx];
      const y = continentsGeometry.attributes.position.array[idx + 1];
      const z = continentsGeometry.attributes.position.array[idx + 2];
      
      // Random pattern for continents
      if (Math.sin(5 * x) * Math.cos(4 * y) * Math.sin(3 * z) > 0.5) {
        continentsGeometry.attributes.position.array[idx] *= 1;
        continentsGeometry.attributes.position.array[idx + 1] *= 1;
        continentsGeometry.attributes.position.array[idx + 2] *= 1;
      } else {
        continentsGeometry.attributes.position.array[idx] *= 0.99;
        continentsGeometry.attributes.position.array[idx + 1] *= 0.99;
        continentsGeometry.attributes.position.array[idx + 2] *= 0.99;
      }
    }
    
    const continents = new THREE.Mesh(continentsGeometry, landMaterial);
    scene.add(continents);
    
    // Ambient light for base illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Directional light to create some shadows and dimension
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    // Animation
    const animate = () => {
      earth.rotation.y += 0.001;
      continents.rotation.y += 0.001;
      
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef.current as number);
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
  
  return <div ref={containerRef} className="w-full h-full min-h-[250px]" />;
};

export default Earth3D;
