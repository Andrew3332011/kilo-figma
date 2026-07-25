// import * as THREE from 'three';
// import { GLTFLoader } from 'three-stdlib';
// const models = [
//   '/3d-models/sf90.glb',
//   '/3d-models/roma.glb',
//   '/3d-models/2020_ferrari_f8_tributo.glb',
// ];

// export function initGallery3D() {
//   const canvases = document.querySelectorAll('.gallery__model-canvas') as NodeListOf<HTMLCanvasElement>;
  
//   canvases.forEach((canvas, index) => {
//     if (index >= models.length) return;
    
//     const modelName = models[index];
//     initSingleModel(canvas, modelName);
//   });
// }

// function initSingleModel(canvas: HTMLCanvasElement, modelName: string) {
//   const scene = new THREE.Scene();
//   const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  
//   const renderer = new THREE.WebGLRenderer({
//     canvas,
//     antialias: true,
//     alpha: true,
//   });
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//   renderer.setSize(canvas.clientWidth, canvas.clientHeight);

//   const geometry = new THREE.BoxGeometry(2, 0.75, 4);
//   const material = new THREE.MeshPhysicalMaterial({
//     color: modelName === 'sf90' ? 0xdc2626 : modelName === 'roma' ? 0x1a1a1a : 0xff3b30,
//     metalness: 0.8,
//     roughness: 0.2,
//   });
//   const model = new THREE.Mesh(geometry, material);
//   scene.add(model);

//   const light = new THREE.DirectionalLight(0xffffff, 1.5);
//   light.position.set(5, 5, 5);
//   scene.add(light);

//   scene.add(new THREE.AmbientLight(0x404040, 0.5));

//   camera.position.z = 4;

//   const animate = () => {
//     requestAnimationFrame(animate);
//     model.rotation.y += 0.005;
//     renderer.render(scene, camera);
//   };

//   animate();
// }
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';

const models = [
  {
    path: '/3d-models/2020_ferrari_sf90_stradale.glb',
    scale: 110,
    y: -0.0,
  },
  {
    path: '/3d-models/2020_ferrari_roma.glb',
    scale: 110,
    y: -0.0,
  },
  {
    path: '/3d-models/2020_ferrari_f8_tributo.glb',
    scale: 110,
    y: -0.0,
  },
];

export function initGallery3D() {
  const canvases = document.querySelectorAll(
    '.gallery__model-canvas'
  ) as NodeListOf<HTMLCanvasElement>;

  canvases.forEach((canvas, index) => {
    if (index >= models.length) return;

    initSingleModel(canvas, models[index]);
  });
}

function initSingleModel(
  canvas: HTMLCanvasElement,
  config: {
    path: string;
    scale: number;
    y: number;
  }
) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100
  );

  camera.position.set(0, 1, 6);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 2);
  keyLight.position.set(5, 5, 5);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xffffff, 1);
  fillLight.position.set(-5, 3, -5);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
  rimLight.position.set(0, 5, -5);
  scene.add(rimLight);

  let model: THREE.Group | null = null;

  const loader = new GLTFLoader();

  loader.load(
    config.path,
    (gltf) => {
      model = gltf.scene;

      model.scale.setScalar(config.scale);

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      model.position.sub(center);
      model.position.y += config.y;

      // Auto-fit model nicely
      // const maxDim = Math.max(size.x, size.y, size.z);
      // camera.position.z = maxDim * 2.5;
camera.position.set(0, 1, 6);
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;

          if (Array.isArray(child.material)) {
            child.material.forEach((material) => {
              material.needsUpdate = true;
            });
          } else if (child.material) {
            child.material.needsUpdate = true;
          }
        }
      });

      scene.add(model);
    },
    undefined,
    (error) => {
      console.error(`Failed to load model: ${config.path}`, error);
    }
  );

  function animate() {
    requestAnimationFrame(animate);

    if (model) {
      model.rotation.y += 0.005;
    }

    renderer.render(scene, camera);
  }

  animate();

  function resize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  }

  window.addEventListener('resize', resize);
}