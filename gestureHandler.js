// Función para escalar el modelo 3D en respuesta al gesto de pinza con dos dedos
function scaleModel(pinching) {
  if (pinching) {
    // Escala el modelo (ajusta según sea necesario)
    flower.scale.multiplyScalar(1.01);
  }
}

// Configuración de detección de gestos
const pinchGesture = new XRHandPinchGesture();
session.inputSources.forEach((inputSource) => {
  if (inputSource.hand) {
    inputSource.hand.addEventListener('pinchstart', (event) => scaleModel(true));
    inputSource.hand.addEventListener('pinchend', (event) => scaleModel(false));
  }
});
