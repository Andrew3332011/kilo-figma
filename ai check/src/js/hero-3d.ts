import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';

export function initHero3D() {
  const canvas = document.getElementById('hero-canvas') as HTMLCanvasElement;
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
// here
  // const carGeometry = new THREE.BoxGeometry(4, 1.5, 8);
  // const carMaterial = new THREE.MeshPhysicalMaterial({
  //   color: 0xdc2626,
  //   metalness: 0.9,
  //   roughness: 0.1,
  //   clearcoat: 1,
  //   clearcoatRoughness: 0.1,
  // });
  // const car = new THREE.Mesh(carGeometry, carMaterial);
  // car.position.y = -1;
  // scene.add(car);
  let car: THREE.Group | null = null;

const loader = new GLTFLoader();

loader.load(
  '/3d-models/2020_ferrari_f8_tributo.glb', // <-- Change this to your model path
  (gltf) => {
    car = gltf.scene;

    car.position.set(0, -1, 0);
    car.scale.set(300, 300, 300); // Adjust if needed

    // Enable shadows
    car.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    scene.add(car);
  },
  (xhr) => {
    console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
  },
  (error) => {
    console.error('Model failed to load:', error);
  }
);
// here
  const groundGeometry = new THREE.PlaneGeometry(50, 50);
  const groundMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x111111,
    metalness: 0.8,
    roughness: 0.4,
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -2;
  scene.add(ground);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0x404040, 1);
  scene.add(ambientLight);

  const fillLight = new THREE.DirectionalLight(0xdc2626, 0.5);
  fillLight.position.set(-10, 5, -10);
  scene.add(fillLight);

  camera.position.z = 12;
  camera.position.y = 2;

  const animate = () => {
    requestAnimationFrame(animate);
    if (car) {
    car.rotation.y += 0.002;
    }
    renderer.render(scene, camera);
  };

  animate();

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener('resize', handleResize);
}