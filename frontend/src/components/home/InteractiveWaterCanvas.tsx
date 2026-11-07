"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function InteractiveWaterCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, and WebGL Renderer
    const scene = new THREE.Scene();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 2. Aquatic Lighting (Subtle reflections, highlights)
    const ambientLight = new THREE.AmbientLight(0x0284c7, 1.2);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00e5ff, 2.5, 30);
    cyanLight.position.set(5, 5, 8);
    scene.add(cyanLight);

    const blueLight = new THREE.PointLight(0x38bdf8, 1.8, 30);
    blueLight.position.set(-6, -4, 6);
    scene.add(blueLight);

    // 3. 3D Floating Water Bubbles (Physical Water Transmission, IOR 1.33)
    const bubbleCount = 32;
    const bubbleGeometry = new THREE.SphereGeometry(1, 24, 24);

    const bubbleMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xdff6fc,
      transmission: 0.92,
      opacity: 0.95,
      transparent: true,
      roughness: 0.05,
      ior: 1.333, // True Index of Refraction for clean drinking water
      reflectivity: 0.6,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      specularIntensity: 1.2,
      specularColor: new THREE.Color(0xffffff),
    });

    interface BubbleData {
      mesh: THREE.Mesh;
      baseX: number;
      baseZ: number;
      speed: number;
      wobbleSpeed: number;
      wobbleAmplitude: number;
      scale: number;
      phase: number;
    }

    const bubbles: BubbleData[] = [];

    // Visible boundary calculation at z = 0
    const vFOV = (camera.fov * Math.PI) / 180;
    const visibleHeight = 2 * Math.tan(vFOV / 2) * camera.position.z;
    const visibleWidth = visibleHeight * (width / height);

    for (let i = 0; i < bubbleCount; i++) {
      const mesh = new THREE.Mesh(bubbleGeometry, bubbleMaterial);

      const scale = THREE.MathUtils.randFloat(0.12, 0.42);
      mesh.scale.set(scale, scale, scale);

      const baseX = THREE.MathUtils.randFloat(
        -visibleWidth * 0.48,
        visibleWidth * 0.48
      );
      const startY = THREE.MathUtils.randFloat(
        -visibleHeight * 0.55,
        visibleHeight * 0.55
      );
      const baseZ = THREE.MathUtils.randFloat(-2.5, 2.5);

      mesh.position.set(baseX, startY, baseZ);
      scene.add(mesh);

      bubbles.push({
        mesh,
        baseX,
        baseZ,
        speed: THREE.MathUtils.randFloat(0.008, 0.022),
        wobbleSpeed: THREE.MathUtils.randFloat(1.2, 2.8),
        wobbleAmplitude: THREE.MathUtils.randFloat(0.15, 0.45),
        scale,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // 4. Interactive Cursor Water Ripples
    interface Ripple {
      mesh: THREE.Mesh;
      birth: number;
      life: number;
      maxRadius: number;
    }

    const ripples: Ripple[] = [];
    const rippleGeometry = new THREE.RingGeometry(0.1, 0.16, 40);

    const mouseTarget = new THREE.Vector2(0, 0);
    const mouseCurrent = new THREE.Vector2(0, 0);
    let lastRippleTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      mouseTarget.set(x, y);

      const now = performance.now();
      if (now - lastRippleTime > 130 && ripples.length < 8) {
        lastRippleTime = now;
        spawnRipple(x, y);
      }
    };

    const spawnRipple = (ndcX: number, ndcY: number) => {
      // Unproject mouse coordinates into 3D world space at z = 0
      const pos = new THREE.Vector3(ndcX, ndcY, 0.5);
      pos.unproject(camera);
      const dir = pos.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const worldPos = camera.position.clone().add(dir.multiplyScalar(distance));

      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00c2e8,
        transparent: true,
        opacity: 0.55,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });

      const mesh = new THREE.Mesh(rippleGeometry, ringMat);
      mesh.position.set(worldPos.x, worldPos.y, -0.2);
      scene.add(mesh);

      ripples.push({
        mesh,
        birth: performance.now(),
        life: 1400, // 1.4s duration
        maxRadius: THREE.MathUtils.randFloat(2.5, 4.2),
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 5. Window Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 600;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // 6. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Mouse smooth interpolation
      mouseCurrent.lerp(mouseTarget, 0.05);

      // Animate Light reflections
      cyanLight.position.x = 5 + Math.sin(elapsedTime * 0.8) * 2.5;
      cyanLight.position.y = 4 + Math.cos(elapsedTime * 0.6) * 1.8;
      blueLight.position.x = -5 + Math.cos(elapsedTime * 0.7) * 2.5;

      // Animate 3D Water Bubbles
      const topBound = visibleHeight * 0.62;
      const bottomBound = -visibleHeight * 0.62;

      bubbles.forEach((b) => {
        // Natural upward buoyancy
        b.mesh.position.y += b.speed;

        // Gentle sinusoidal drift
        b.mesh.position.x =
          b.baseX + Math.sin(elapsedTime * b.wobbleSpeed + b.phase) * b.wobbleAmplitude;

        // Subtle mouse displacement
        const dx = b.mesh.position.x - mouseCurrent.x * (visibleWidth / 2);
        const dy = b.mesh.position.y - mouseCurrent.y * (visibleHeight / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 2.5 && dist > 0.01) {
          const push = (2.5 - dist) * 0.02;
          b.mesh.position.x += (dx / dist) * push;
          b.mesh.position.y += (dy / dist) * push;
        }

        // Respawn smoothly at bottom
        if (b.mesh.position.y > topBound) {
          b.mesh.position.y = bottomBound;
          b.baseX = THREE.MathUtils.randFloat(
            -visibleWidth * 0.48,
            visibleWidth * 0.48
          );
        }
      });

      // Animate Expanding Ripples
      const now = performance.now();
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        const age = now - r.birth;
        const progress = age / r.life;

        if (progress >= 1) {
          scene.remove(r.mesh);
          r.mesh.geometry.dispose();
          (r.mesh.material as THREE.Material).dispose();
          ripples.splice(i, 1);
        } else {
          const currentScale = progress * r.maxRadius;
          r.mesh.scale.set(currentScale, currentScale, 1);
          const mat = r.mesh.material as THREE.MeshBasicMaterial;
          mat.opacity = (1 - progress) * 0.45;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 7. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      ripples.forEach((r) => {
        scene.remove(r.mesh);
        r.mesh.geometry.dispose();
        (r.mesh.material as THREE.Material).dispose();
      });

      bubbles.forEach((b) => {
        scene.remove(b.mesh);
      });
      bubbleGeometry.dispose();
      bubbleMaterial.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
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

