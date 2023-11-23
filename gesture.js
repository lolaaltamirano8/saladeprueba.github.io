// gesture.js
let initialDistance = 0;

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

function handleTouchStart(event) {
  if (event.touches.length === 2) {
    const touch1 = event.touches[0];
    const touch2 = event.touches[1];
    initialDistance = getDistance(touch1, touch2);
  }
}

function handleTouchMove(event) {
  if (event.touches.length === 2) {
    const touch1 = event.touches[0];
    const touch2 = event.touches[1];
    const currentDistance = getDistance(touch1, touch2);

    if (currentDistance > initialDistance) {
      // Aumentar escala
      scaleModel(1.02); // Puedes ajustar el factor de escala según tus necesidades
    } else if (currentDistance < initialDistance) {
      // Reducir escala
      scaleModel(0.98); // Puedes ajustar el factor de escala según tus necesidades
    }

    initialDistance = currentDistance;
  }
}

function getDistance(touch1, touch2) {
  const dx = touch1.clientX - touch2.clientX;
  const dy = touch1.clientY - touch2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

function scaleModel(factor) {
  // Escala el modelo aquí según el factor proporcionado
  if (flower) {
    flower.scale.multiplyScalar(factor);
  }
}
