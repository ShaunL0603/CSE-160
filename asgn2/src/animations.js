// Global rotation variables for animal rotation
  // Left Arm rotation
  let g_rotateUpperLeftArm = Number(document.getElementById("rotateUpperLeftArm").defaultValue);
  let g_rotateLowerLeftArm = Number(document.getElementById("rotateLowerLeftArm").defaultValue);
  let g_rotateLeftWristX = Number(document.getElementById("rotateLeftWristX").defaultValue);
  let g_rotateLeftWristY = Number(document.getElementById("rotateLeftWristY").defaultValue);
  let g_rotateLeftWristZ = Number(document.getElementById("rotateLeftWristZ").defaultValue);

  // Left fingys rotation
  let g_rotateLeftThumb1 = Number(document.getElementById("rotateLeftFirstThumb").defaultValue);
  let g_rotateLeftThumb2 = Number(document.getElementById("rotateLeftSecondThumb").defaultValue);
  let g_rotateLeftIndexFinger = Number(document.getElementById("rotateLeftIndexFinger").defaultValue);
  let g_rotateLeftMiddleFinger = Number(document.getElementById("rotateLeftMiddleFinger").defaultValue);
  let g_rotateLeftPinkyFinger = Number(document.getElementById("rotateLeftPinkyFinger").defaultValue);

  // Right Arm rotations
  let g_rotateUpperRightArm = Number(document.getElementById("rotateUpperRightArm").defaultValue);
  let g_rotateLowerRightArm = Number(document.getElementById("rotateLowerRightArm").defaultValue);
  let g_rotateRightWristX = Number(document.getElementById("rotateRightWristX").defaultValue);
  let g_rotateRightWristY = Number(document.getElementById("rotateRightWristY").defaultValue);
  let g_rotateRightWristZ = Number(document.getElementById("rotateRightWristZ").defaultValue);

  // Right fingys rotation
  let g_rotateRightThumb1 = Number(document.getElementById("rotateRightFirstThumb").defaultValue);
  let g_rotateRightThumb2 = Number(document.getElementById("rotateRightSecondThumb").defaultValue);
  let g_rotateRightIndexFinger = Number(document.getElementById("rotateRightIndexFinger").defaultValue);
  let g_rotateRightMiddleFinger = Number(document.getElementById("rotateRightMiddleFinger").defaultValue);
  let g_rotateRightPinkyFinger = Number(document.getElementById("rotateRightPinkyFinger").defaultValue);

  // Head rotations
  let g_rotateHeadX = Number(document.getElementById("rotateHeadX").defaultValue);
  let g_rotateHeadY = Number(document.getElementById("rotateHeadY").defaultValue);
  let g_rotateHeadZ = Number(document.getElementById("rotateHeadZ").defaultValue);

  // Jaw rotations
  let g_rotateLowerJawY = Number(document.getElementById("rotateLowerJaw").defaultValue);

  // Left Leg rotations
  let g_rotateUpperLeftLeg = Number(document.getElementById("rotateUpperLeftLeg").defaultValue);
  let g_rotateLowerLeftLeg = Number(document.getElementById("rotateLowerLeftLeg").defaultValue);
  let g_rotateLeftAnkleX = Number(document.getElementById("rotateLeftAnkleX").defaultValue);
  let g_rotateLeftAnkleY = Number(document.getElementById("rotateLeftAnkleY").defaultValue);
  let g_rotateLeftAnkleZ = Number(document.getElementById("rotateLeftAnkleZ").defaultValue);

  // Left toes rotations
  let g_rotateLeftToe1 = Number(document.getElementById("rotateLeftToe1").defaultValue);
  let g_rotateLeftToe2 = Number(document.getElementById("rotateLeftToe2").defaultValue);
  let g_rotateLeftToe3 = Number(document.getElementById("rotateLeftToe3").defaultValue);
  let g_rotateLeftToe4 = Number(document.getElementById("rotateLeftToe4").defaultValue);
  let g_rotateLeftToe5 = Number(document.getElementById("rotateLeftToe5").defaultValue);

  // Right Leg rotations
  let g_rotateUpperRightLeg = Number(document.getElementById("rotateUpperRightLeg").defaultValue);
  let g_rotateLowerRightLeg = Number(document.getElementById("rotateLowerRightLeg").defaultValue);
  let g_rotateRightAnkleX = Number(document.getElementById("rotateRightAnkleX").defaultValue);
  let g_rotateRightAnkleY = Number(document.getElementById("rotateRightAnkleY").defaultValue);
  let g_rotateRightAnkleZ = Number(document.getElementById("rotateRightAnkleZ").defaultValue);

  // Right toes rotations
  let g_rotateRightToe1 = Number(document.getElementById("rotateRightToe1").defaultValue);
  let g_rotateRightToe2 = Number(document.getElementById("rotateRightToe2").defaultValue);
  let g_rotateRightToe3 = Number(document.getElementById("rotateRightToe3").defaultValue);
  let g_rotateRightToe4 = Number(document.getElementById("rotateRightToe4").defaultValue);
  let g_rotateRightToe5 = Number(document.getElementById("rotateRightToe5").defaultValue);

function updateAnimationAngle() {
  if (!g_walkAnimation) return;
  lastAnimation = WALK;

  let speed = 2.0;
  let t = g_seconds * speed;
  let tRight = t + Math.PI;
  let lowerLeft = -51.5 - 56.5 * Math.sin(t) + 21.5 * Math.cos(t);
  let lowerRight = -51.5 - 56.5 * Math.sin(tRight) + 21.5 * Math.cos(tRight);

  // LEFT ARM ROTATION
  g_rotateUpperLeftArm = 10 + 65 * Math.sin(t);
  g_rotateLowerLeftArm = Math.max(-108, Math.min(5, lowerLeft));
  g_rotateLeftWristZ = -70 * Math.max(0, Math.cos(t)) - 40 * Math.min(0, Math.cos(t));

  // RIGHT ARM ROTATION
  g_rotateUpperRightArm = 10 + 65 * Math.sin(tRight);
  g_rotateLowerRightArm = Math.max(-108, Math.min(5, lowerRight));
  g_rotateRightWristZ = 70 * Math.max(0, Math.cos(tRight)) + 40 * Math.min(0, Math.cos(tRight));

  // LEFT LEG ROTATION
  // Using tRight and lowerRight so leg and arm movement is opposite
  g_rotateUpperLeftLeg = 10 + 65 * Math.sin(tRight);
  g_rotateLowerLeftLeg = Math.max(-108, Math.min(5, lowerRight));
  g_rotateLeftAnkleZ = -70 * Math.max(0, Math.cos(tRight)) - 40 * Math.min(0, Math.cos(tRight));

  // RIGHT LEG ROTATION
  // Use t and lowerLeft for opposite mmovements
  g_rotateUpperRightLeg = 10 + 65 * Math.sin(t);
  g_rotateLowerRightLeg = Math.max(-108, Math.min(5, lowerLeft));
  g_rotateRightAnkleZ = 70 * Math.max(0, Math.cos(t)) + 40 * Math.min(0, Math.cos(t));

  // Rotate butt
  rotateBehind = 2 * Math.sin(g_seconds);

  // Head rotations
  g_rotateHeadY = 11.25 * Math.max(Math.sin(g_seconds)) * 0.3;
  g_rotateLowerJawY = 10 * Math.max(0, Math.sin(g_seconds * 2));
}

function updateEatingAnimation() {
  if (!g_eatingAnimation) return;
  lastAnimation = EAT;

  let totalCycleTime = 8.5;
  
  // localTime loops constantly between 0.0 and 8.999...
  let localTime = g_seconds % totalCycleTime;

  // set animal to static pose
  g_animalZAngle = -25;
  g_rotateHeadZ = 25; 
  
  g_rotateUpperLeftLeg = -35;
  g_rotateLowerLeftLeg = -30;
  g_rotateLeftAnkleX = 0; g_rotateLeftAnkleY = 0; g_rotateLeftAnkleZ = 0;
  
  g_rotateUpperRightLeg = -35;
  g_rotateLowerRightLeg = -30;
  g_rotateRightAnkleX = 0; g_rotateRightAnkleY = 0; g_rotateRightAnkleZ = 0;

  g_rotateUpperLeftArm = 25;
  g_rotateLowerLeftArm = 0;
  g_rotateLeftWristX = 0; g_rotateLeftWristY = 0; g_rotateLeftWristZ = -90;

  //* Phases for arm and jaw
  // PHASE 1: Reaching for food
  if (localTime < 2.0) {
    let p = localTime / 2.0;

    g_rotateUpperRightArm = lerp(25, -55, p); // Assuming it started at the 25 sitting pose
    
    g_rotateLowerRightArm = -30 * Math.sin(p * Math.PI); 
    
    g_rotateRightWristX = 0; 
    g_rotateRightWristY = 0;
    g_rotateRightWristZ = lerp(90, 0, p);

    let fingerAngle = lerp(5, 45, p);
    g_rotateRightThumb1 = fingerAngle;
    g_rotateRightThumb2 = fingerAngle;
    g_rotateRightIndexFinger = fingerAngle;
    g_rotateRightMiddleFinger = fingerAngle;
    g_rotateRightPinkyFinger = fingerAngle;

    g_rotateLowerJawY = 0; // Jaw closed
  }
  // PHASE 2: Grabbing food
  else if (localTime < 2.5) {
    g_rotateUpperRightArm = -55;
    g_rotateLowerRightArm = 0;
    g_rotateRightWristX = 0; g_rotateRightWristY = 0; g_rotateRightWristZ = 0;
    
    // Hold fingers at 45
    g_rotateRightThumb1 = 45; g_rotateRightThumb2 = 45; g_rotateRightIndexFinger = 45; 
    g_rotateRightMiddleFinger = 45; g_rotateRightPinkyFinger = 45;

    g_rotateLowerJawY = 0; 
  }
  // PHASE 3: Moving food to mouth
  else if (localTime < 4.5) {
    let p = (localTime - 2.5) / 2.0;

    g_rotateUpperRightArm = lerp(-55, -15, p);
    g_rotateLowerRightArm = lerp(0, -85, p);
    
    g_rotateRightWristX = lerp(0, 50, p);
    g_rotateRightWristY = lerp(0, 150, p);
    g_rotateRightWristZ = lerp(0, 20, p);

    g_rotateLowerJawY = lerp(0, 20, p); // Jaw opens to 20
  }
  // PHASE 4: Putting into mouth
  else if (localTime < 4.9) {
    let p = (localTime - 4.5) / 0.4; 

    g_rotateUpperRightArm = -15; // Hold
    g_rotateLowerRightArm = -85;   // Hold
    
    g_rotateRightWristX = lerp(50, 30, p);
    g_rotateRightWristY = 150; // Hold
    g_rotateRightWristZ = lerp(20, -20, p);

    // bite
    g_rotateLowerJawY = lerp(20, 6, p);
  }
  // PHASE 5: Eating & Resetting Arm
  else {
    let p = (localTime - 4.9) / 3.6; // Progress through final seconds
    g_rotateUpperRightArm = lerp(-15, 35, p); 
    g_rotateLowerRightArm = lerp(-85, -25, p); 
    
    g_rotateRightWristX = lerp(30, 0, p);
    g_rotateRightWristY = lerp(150, 0, p);
    g_rotateRightWristZ = lerp(-20, 90, p);

    let fingerAngle = lerp(45, 5, p);
    g_rotateRightThumb1 = fingerAngle;
    g_rotateRightThumb2 = fingerAngle;
    g_rotateRightIndexFinger = fingerAngle;
    g_rotateRightMiddleFinger = fingerAngle;
    g_rotateRightPinkyFinger = fingerAngle;

    // chewing
    g_rotateLowerJawY = 3 + 3 * Math.sin(localTime * 6); 
  }
}

// Helper function to smoothly transition between two angles
// a = start angle, b = end angle, t = progress from 0.0 to 1.0
function lerp(a, b, t) {
  return a + (b - a) * t;
}