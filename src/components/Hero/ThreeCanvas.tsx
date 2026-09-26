"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 450;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for mouse interaction
    const group = new THREE.Group();
    scene.add(group);

    // 1. Center Sculptural Streetwear Emblem (Faceted Icosahedron / Luxury Talisman)
    const geometry = new THREE.IcosahedronGeometry(1.4, 1);
    
    // Luxury Chrome / Obsidian Metallic Material
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x111111,
      emissive: 0x050505,
      roughness: 0.15,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
      wireframe: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);

    // 2. Outer Wireframe Halo / Orbit Rings
    const wireframeGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xff4500,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeo, wireframeMat);
    group.add(wireframeMesh);

    // Ring 1 (Equatorial Gyroscope Ring)
    const ringGeo1 = new THREE.TorusGeometry(2.0, 0.02, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xff4500,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0xff3b00,
      emissiveIntensity: 0.3,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.5;
    group.add(ring1);

    // Ring 2 (Polar Orbit Ring)
    const ringGeo2 = new THREE.TorusGeometry(2.3, 0.015, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.9,
      roughness: 0.1,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 3;
    group.add(ring2);

    // 3. Floating Dust & Spark Particles
    const particlesCount = 90;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xff8c00,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const orangeKeyLight = new THREE.PointLight(0xff4500, 15, 15);
    orangeKeyLight.position.set(3, 3, 3);
    scene.add(orangeKeyLight);

    const whiteRimLight = new THREE.PointLight(0xffffff, 10, 15);
    whiteRimLight.position.set(-3, -2, -2);
    scene.add(whiteRimLight);

    const blueFillLight = new THREE.PointLight(0x0051ff, 6, 15);
    blueFillLight.position.set(0, -3, 2);
    scene.add(blueFillLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      mouseX = (x / rect.width) * 2;
      mouseY = (y / rect.height) * 2;

      // Update light position with cursor for realistic dynamic reflection
      orangeKeyLight.position.x = mouseX * 4;
      orangeKeyLight.position.y = -mouseY * 4;
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleDragMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;
      group.rotation.y += deltaX * 0.01;
      group.rotation.x += deltaY * 0.01;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleDragMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);
    setIsLoaded(true);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      if (!isDragging) {
        group.rotation.y = elapsedTime * 0.35 + targetX * 1.2;
        group.rotation.x = Math.sin(elapsedTime * 0.25) * 0.15 + targetY * 0.8;
      }

      // Counter-rotating rings
      ring1.rotation.z = elapsedTime * 0.5;
      ring2.rotation.x = -elapsedTime * 0.4;
      wireframeMesh.rotation.y = -elapsedTime * 0.2;

      // Gentle floating particles
      particles.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="relative w-full h-[380px] sm:h-[440px] lg:h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Three.js Render Target */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Floating HUD Badges & Interaction Hints */}
      <div className="absolute top-4 left-4 pointer-events-none">
        <div className="flex items-center gap-2 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded font-mono text-[9px] tracking-widest text-brand-orange uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping" />
          <span>INTERACTIVE 3D CANVAS</span>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 pointer-events-none">
        <div className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded font-mono text-[9px] tracking-widest text-white/50 uppercase">
          DRAG TO TILT // CURSOR REACTIVE
        </div>
      </div>

      {/* Futuristic Radial Background Glow */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-brand-orange/10 via-transparent to-transparent opacity-60" />
    </div>
  );
}
