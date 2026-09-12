"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Fondo 3D ligero (una sola escena, sin scroll-scrub) inspirado en el motor de
// scroll-flyover: mismo lenguaje de formas geométricas/wireframe y paleta de marca,
// pero como una escena idle fija de bajo costo, adecuada para vivir detrás de una
// sección corta de texto en vez de una secuencia de varias escenas.
export default function CollectiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const accent = new THREE.Color("#5b8cff");
    const dim = new THREE.Color("#3a3632");

    const group = new THREE.Group();
    scene.add(group);

    const geometries = [
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.OctahedronGeometry(0.9, 0),
      new THREE.TetrahedronGeometry(1.1, 0),
      new THREE.BoxGeometry(1.2, 1.2, 1.2),
    ];

    const meshes: {
      mesh: THREE.LineSegments;
      speed: number;
      axis: THREE.Vector3;
      floatOffset: number;
    }[] = [];

    const COUNT = 14;
    for (let i = 0; i < COUNT; i++) {
      const geo = geometries[i % geometries.length];
      const edges = new THREE.EdgesGeometry(geo);
      const isAccent = i % 3 === 0;
      const material = new THREE.LineBasicMaterial({
        color: isAccent ? accent : dim,
        transparent: true,
        opacity: isAccent ? 0.9 : 0.5,
      });
      const mesh = new THREE.LineSegments(edges, material);

      const radius = 3.2 + Math.random() * 3.2;
      const angle = (i / COUNT) * Math.PI * 2;
      mesh.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 4.5,
        Math.sin(angle) * radius - 2
      );
      const scale = 0.4 + Math.random() * 0.7;
      mesh.scale.setScalar(scale);
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      group.add(mesh);
      meshes.push({
        mesh,
        speed: 0.05 + Math.random() * 0.12,
        axis: new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ).normalize(),
        floatOffset: Math.random() * Math.PI * 2,
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    function handleMouseMove(e: MouseEvent) {
      const rect = container!.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }
    window.addEventListener("mousemove", handleMouseMove);

    function handleResize() {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener("resize", handleResize);

    let rafId = 0;
    const startTime = performance.now();

    function animate() {
      const elapsed = (performance.now() - startTime) / 1000;

      for (const item of meshes) {
        item.mesh.rotateOnAxis(item.axis, item.speed * 0.016);
        item.mesh.position.y += Math.sin(elapsed * 0.6 + item.floatOffset) * 0.0015;
      }

      group.rotation.y += (mouseX * 0.25 - group.rotation.y) * 0.02;
      group.rotation.x += (mouseY * 0.12 - group.rotation.x) * 0.02;

      renderer.render(scene, camera);
      if (!reducedMotion) rafId = requestAnimationFrame(animate);
    }

    if (reducedMotion) {
      renderer.render(scene, camera);
    } else {
      animate();
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
      meshes.forEach(({ mesh }) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 opacity-90"
    />
  );
}
