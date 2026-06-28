/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

import cardGLB from './card.glb';
import lanyard from './lanyard.png';

import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

// 1x1 transparent pixel — lets useTexture be called unconditionally when a
// lanyard image isn't supplied.
const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  lanyardImage = null,
  lanyardWidth = 1.05
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band
            isMobile={isMobile}
            lanyardImage={lanyardImage}
            lanyardWidth={lanyardWidth}
          />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  lanyardImage = null,
  lanyardWidth = 1.05
}) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  const { nodes, materials } = useGLTF(cardGLB);
  const texture = useTexture(lanyardImage || lanyard);

  // Profile image loading state to draw on canvas
  const [profileImg, setProfileImg] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = '/user_photo.png';
    img.onload = () => setProfileImg(img);
  }, []);

  // Composite user details & profile photo into the texture atlas
  const cardMap = useMemo(() => {
    const baseMap = materials.base.map;
    const baseImg = baseMap.image;
    const W = baseImg.width || 1024;
    const H = baseImg.height || 1024;

    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;

    // Draw the original baked atlas first for card frames & edges
    ctx.drawImage(baseImg, 0, 0, W, H);

    // Helper to draw details on front face (Left Half: 0 to 0.5 * W)
    const drawDetailsOnFront = (rx, ry, rw, rh) => {
      // 1. Dark tech background
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(rx, ry, rw, rh);

      // 2. High-contrast border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 14;
      ctx.strokeRect(rx + 7, ry + 7, rw - 14, rh - 14);

      // 3. Accent Header
      ctx.fillStyle = '#111111';
      ctx.fillRect(rx + 10, ry + 10, rw - 20, rh * 0.11);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 26px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('ACCESS PASS', rx + rw / 2, ry + rh * 0.075);

      // 4. Circle Profile photo
      const photoSize = rw * 0.44;
      const px = rx + (rw - photoSize) / 2;
      const py = ry + rh * 0.18;

      if (profileImg) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(px + photoSize / 2, py + photoSize / 2, photoSize / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(profileImg, px, py, photoSize, photoSize);
        ctx.restore();
        
        // Draw round outline border around profile picture
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(px + photoSize / 2, py + photoSize / 2, photoSize / 2, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        ctx.fillStyle = '#1e1e1e';
        ctx.fillRect(px, py, photoSize, photoSize);
      }

      // 5. Typography details
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 34px sans-serif';
      ctx.fillText('MAYANK PATEL', rx + rw / 2, ry + rh * 0.72);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText('FULLSTACK ENGINEER', rx + rw / 2, ry + rh * 0.77);

      // Separator line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(rx + rw * 0.12, ry + rh * 0.81);
      ctx.lineTo(rx + rw * 0.88, ry + rh * 0.81);
      ctx.stroke();

      // 6. Contact Details (Email & Phone Number)
      ctx.fillStyle = '#ffffff';
      ctx.font = '16px monospace';
      ctx.fillText('mayankpatelmehta@gmail.com', rx + rw / 2, ry + rh * 0.86);
      ctx.fillText('+91 98780 89375', rx + rw / 2, ry + rh * 0.90);

      // Stylized chip code
      ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.font = '11px monospace';
      ctx.fillText('ID: 98729351-85CA', rx + rw / 2, ry + rh * 0.95);
    };

    // Helper to draw details on back face (Right Half: 0.5 * W to W)
    const drawDetailsOnBack = (rx, ry, rw, rh) => {
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(rx, ry, rw, rh);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 14;
      ctx.strokeRect(rx + 7, ry + 7, rw - 14, rh - 14);

      // Grid background on card back
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      const step = 24;
      for (let x = rx; x < rx + rw; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, ry);
        ctx.lineTo(x, ry + rh);
        ctx.stroke();
      }
      for (let y = ry; y < ry + rh; y += step) {
        ctx.beginPath();
        ctx.moveTo(rx, y);
        ctx.lineTo(rx + rw, y);
        ctx.stroke();
      }

      // Large logo symbol
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 74px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('M', rx + rw / 2, ry + rh * 0.38);

      // Accent lines
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText('BUILDER • DEVELOPER', rx + rw / 2, ry + rh * 0.48);

      // Technical Barcode
      ctx.fillStyle = '#ffffff';
      const barcodeWidth = rw * 0.72;
      const bx = rx + (rw - barcodeWidth) / 2;
      const by = ry + rh * 0.65;
      const barcodeHeight = 55;

      ctx.fillRect(bx, by, barcodeWidth, barcodeHeight);
      ctx.fillStyle = '#0a0a0a';
      const stripes = [4, 6, 2, 8, 12, 2, 6, 4, 8, 10, 4, 4, 2, 12, 6, 8, 4, 2, 4];
      let currX = bx + 8;
      for (let i = 0; i < stripes.length; i++) {
        const stripeW = stripes[i];
        if (i % 2 === 0) {
          ctx.fillRect(currX, by, stripeW, barcodeHeight);
        }
        currX += stripeW + 2;
      }

      // Barcode digits
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '14px monospace';
      ctx.fillText('* 98780 89375 *', rx + rw / 2, by + barcodeHeight + 24);
    };

    // Paint front and back card UV face sections
    const fr = FRONT_UV_RECT;
    drawDetailsOnFront(fr.x * W, fr.y * H, fr.w * W, fr.h * H);

    const bk = BACK_UV_RECT;
    drawDetailsOnBack(bk.x * W, bk.y * H, bk.w * W, bk.h * H);

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [materials.base.map, profileImg]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={e => (
              e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            )}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}
