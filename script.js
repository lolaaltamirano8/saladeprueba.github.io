//Código para detectar superficie, detectar al usuario tocando la pantalla (y dónde) y colocando el modelo únicamente con el primer toque.
let modelPlaced = false;
let flower;
let pinchStart = 0;
let pinchCurrent = 0;

async function activateXR() {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  const gl = canvas.getContext("webgl", {
    xrCompatible: true
  });

  const scene = new THREE.Scene();
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
  directionalLight.position.set(10, 15, 10);
  scene.add(directionalLight);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    preserveDrawingBuffer: true,
    canvas: canvas,
    context: gl
  });
  renderer.autoClear = false;

  const camera = new THREE.PerspectiveCamera();
  camera.matrixAutoUpdate = false;

  const session = await navigator.xr.requestSession("immersive-ar", {
    requiredFeatures: ['hit-test']
  });
  session.updateRenderState({
    baseLayer: new XRWebGLLayer(session, gl)
  });

  const hitTestSourceSpace = await session.requestReferenceSpace('viewer');
  const hitTestSource = await session.requestHitTestSource({
    space: hitTestSourceSpace
  });

  const referenceSpace = await session.requestReferenceSpace('local');

  const loader = new THREE.GLTFLoader();
  let reticle;
  loader.load("https://immersive-web.github.io/webxr-samples/media/gltf/reticle/reticle.gltf", function (gltf) {
    reticle = gltf.scene;
    reticle.visible = false;
    scene.add(reticle);
  });

  loader.load("https://raw.githubusercontent.com/lolaaltamirano8/lolaaltamirano8.github.io/main/prensa_husillo.gltf", function (gltf) {
    flower = gltf.scene;
    setupGestures(camera, renderer, flower);
  });

  const onXRFrame = (time, frame) => {
    session.requestAnimationFrame(onXRFrame);
    gl.bindFramebuffer(gl.FRAMEBUFFER, session.renderState.baseLayer.framebuffer)

    const pose = frame.getViewerPose(referenceSpace);
    if (pose) {
      const view = pose.views[0];
      const viewport = session.renderState.baseLayer.getViewport(view);
      renderer.setSize(viewport.width, viewport.height)

      camera.matrix.fromArray(view.transform.matrix)
      camera.projectionMatrix.fromArray(view.projectionMatrix);
      camera.updateMatrixWorld(true);

      const hitTestResults = frame.getHitTestResults(hitTestSource);
      if (hitTestResults.length > 0 && reticle) {
        const hitPose = hitTestResults[0].getPose(referenceSpace);
        reticle.visible = true;
        reticle.position.set(hitPose.transform.position.x, hitPose.transform.position.y, hitPose.transform.position.z)
        reticle.updateMatrixWorld(true);
      }

      // Escalar el modelo con el gesto de pellizco
      if (pinchStart !== undefined && pinchCurrent !== undefined) {
        const pinchDelta = pinchCurrent - pinchStart;
        const scale = Math.max(0.1, flower.scale.x + pinchDelta);
        flower.scale.set(scale, scale, scale);
      }

      renderer.render(scene, camera)
    }
  }
  session.requestAnimationFrame(onXRFrame);

  canvas.addEventListener('touchstart', onTouchStart);
  canvas.addEventListener('touchmove', onTouchMove);
  canvas.addEventListener('touchend', onTouchEnd);

  function onTouchStart(event) {
    if (event.touches.length === 2) {
      pinchStart = Math.hypot(
        event.touches[0].clientX - event.touches[1].clientX,
        event.touches[0].clientY - event.touches[1].clientY
      );
    }
  }

  function onTouchMove(event) {
    if (event.touches.length === 2) {
      const pinchCurrent = Math.hypot(
        event.touches[0].clientX - event.touches[1].clientX,
        event.touches[0].clientY - event.touches[1].clientY
      );
    }
  }

  function onTouchEnd(event) {
    pinchStart = undefined;
    pinchCurrent = undefined;
  }

  session.addEventListener("select", (event) => {
    if (flower && !modelPlaced) {
      const clone = flower.clone();
      clone.position.copy(reticle.position);
      scene.add(clone);
      modelPlaced = true;
    }
  });
}

function setupGestures(camera, renderer, model) {
  // Aquí puedes agregar configuración adicional para la detección de gestos si es necesario.
}
