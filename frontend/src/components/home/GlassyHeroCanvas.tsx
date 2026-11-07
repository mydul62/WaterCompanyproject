"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GlassyHeroCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, and Renderer
    const scene = new THREE.Scene();

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 2. Lighting for Glass Refractions
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.0);
    mainLight.position.set(8, 12, 10);
    scene.add(mainLight);

    const cyanPointLight = new THREE.PointLight(0x00e5ff, 3.0, 25);
    cyanPointLight.position.set(-6, 4, 6);
    scene.add(cyanPointLight);

    // Interactive mouse cursor follower light
    const mouseLight = new THREE.PointLight(0x38bdf8, 2.5, 20);
    mouseLight.position.set(0, 0, 8);
    scene.add(mouseLight);

    // 3. Glass / Water Sphere Geometry & Physical Material
    const glassGeometry = new THREE.SphereGeometry(1, 28, 28);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.95,
      opacity: 0.95,
      transparent: true,
      roughness: 0.04,
      ior: 1.45, // Optical glass refractive index
      reflectivity: 0.7,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      specularIntensity: 1.5,
      specularColor: new THREE.Color(0xffffff),
    });

    // 4. Botanical Leaf Shape Geometry (Matching user's reference image leaves)
    const leafShape = new THREE.Shape();
    leafShape.moveTo(0, 0);
    leafShape.bezierCurveTo(0.3, 0.4, 0.5, 0.9, 0, 1.6);
    leafShape.bezierCurveTo(-0.5, 0.9, -0.3, 0.4, 0, 0);

    const leafGeometry = new THREE.ShapeGeometry(leafShape);
    const leafMaterial = new THREE.MeshStandardMaterial({
      color: 0x4ade80, // Fresh emerald green
      roughness: 0.35,
      metalness: 0.1,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.88,
    });

    // Visible boundary at z = 0
    const vFOV = (camera.fov * Math.PI) / 180;
    const visibleHeight = 2 * Math.tan(vFOV / 2) * camera.position.z;
    const visibleWidth = visibleHeight * (width / height);

    // Create 3D Glass Spheres
    interface Orb {
      mesh: THREE.Mesh;
      baseX: number;
      baseY: number;
      baseZ: number;
      speed: number;
      phase: number;
      amplitude: number;
    }
    const orbs: Orb[] = [];
    const orbCount = 14;

    for (let i = 0; i < orbCount; i++) {
      const mesh = new THREE.Mesh(glassGeometry, glassMaterial);
      const scale = THREE.MathUtils.randFloat(0.18, 0.55);
      mesh.scale.set(scale, scale, scale);

      const baseX = THREE.MathUtils.randFloat(-visibleWidth * 0.45, visibleWidth * 0.45);
      const baseY = THREE.MathUtils.randFloat(-visibleHeight * 0.4, visibleHeight * 0.4);
      const baseZ = THREE.MathUtils.randFloat(-2, 3);

      mesh.position.set(baseX, baseY, baseZ);
      scene.add(mesh);

      orbs.push({
        mesh,
        baseX,
        baseY,
        baseZ,
        speed: THREE.MathUtils.randFloat(0.5, 1.2),
        phase: Math.random() * Math.PI * 2,
        amplitude: THREE.MathUtils.randFloat(0.3, 0.8),
      });
    }

    // Create 3D Botanical Leaves
    interface Leaf {
      mesh: THREE.Mesh;
      baseX: number;
      y: number;
      baseZ: number;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      fallSpeed: number;
      swingPhase: number;
    }
    const leaves: Leaf[] = [];
    const leafCount = 16;

    for (let i = 0; i < leafCount; i++) {
      const mesh = new THREE.Mesh(leafGeometry, leafMaterial);
      const scale = THREE.MathUtils.randFloat(0.35, 0.7);
      mesh.scale.set(scale, scale, scale);

      const baseX = THREE.MathUtils.randFloat(-visibleWidth * 0.48, visibleWidth * 0.48);
      const y = THREE.MathUtils.randFloat(-visibleHeight * 0.5, visibleHeight * 0.55);
      const baseZ = THREE.MathUtils.randFloat(-1, 3);

      mesh.position.set(baseX, y, baseZ);
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      scene.add(mesh);

      leaves.push({
        mesh,
        baseX,
        y,
        baseZ,
        rotSpeedX: THREE.MathUtils.randFloat(0.005, 0.02),
        rotSpeedY: THREE.MathUtils.randFloat(0.008, 0.025),
        rotSpeedZ: THREE.MathUtils.randFloat(0.005, 0.015),
        fallSpeed: THREE.MathUtils.randFloat(0.008, 0.02),
        swingPhase: Math.random() * Math.PI * 2,
      });
    }

    // Mouse Interaction
    let mouseTargetX = 0;
    let mouseTargetY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseTargetX = (x * visibleWidth) / 2;
      mouseTargetY = (y * visibleHeight) / 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse light follow
      currentMouseX += (mouseTargetX - currentMouseX) * 0.05;
      currentMouseY += (mouseTargetY - currentMouseY) * 0.05;
      mouseLight.position.set(currentMouseX, currentMouseY, 5);

      // Animate Glass Orbs
      for (const orb of orbs) {
        const t = elapsedTime * orb.speed + orb.phase;
        orb.mesh.position.y = orb.baseY + Math.sin(t) * orb.amplitude;
        orb.mesh.position.x = orb.baseX + Math.cos(t * 0.7) * (orb.amplitude * 0.5);

        // Gentle interactive repulsion from cursor
        const dx = orb.mesh.position.x - currentMouseX;
        const dy = orb.mesh.position.y - currentMouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 3.5 && dist > 0.01) {
          const force = (3.5 - dist) * 0.08;
          orb.mesh.position.x += (dx / dist) * force;
          orb.mesh.position.y += (dy / dist) * force;
        }

        orb.mesh.rotation.x += 0.005;
        orb.mesh.rotation.y += 0.008;
      }

      // Animate Botanical Leaves (Tumbling drift)
      const topBound = visibleHeight * 0.6;
      const bottomBound = -visibleHeight * 0.6;

      for (const leaf of leaves) {
        leaf.y -= leaf.fallSpeed;
        if (leaf.y < bottomBound) {
          leaf.y = topBound;
          leaf.baseX = THREE.MathUtils.randFloat(-visibleWidth * 0.48, visibleWidth * 0.48);
        }

        // Sinusoidal wind sway
        const sway = Math.sin(elapsedTime * 1.5 + leaf.swingPhase) * 0.6;
        leaf.mesh.position.set(leaf.baseX + sway, leaf.y, leaf.baseZ);

        leaf.mesh.rotation.x += leaf.rotSpeedX;
        leaf.mesh.rotation.y += leaf.rotSpeedY;
        leaf.mesh.rotation.z += leaf.rotSpeedZ;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      glassGeometry.dispose();
      glassMaterial.dispose();
      leafGeometry.dispose();
      leafMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
}

