function addActionsForHtmlUI() {
    // Add event listener for rotate sensitivity slider
    document.getElementById("rotateSensitivity").addEventListener("input", function(ev) {
    g_rotateSensitivity = parseFloat(ev.target.value);
    });

    // Action to start or stop animation
    document.getElementById("animationOn").onclick = function() { 
        // Turn on an animation based on the last animation played
        // Default will be walk
        switch (lastAnimation) {
            case EAT:
                g_eatingAnimation = true;
                break;
            default:
                g_walkAnimation = true;
        }
        resetKoala();
        renderAllShapes();
    };
    document.getElementById("animationOff").onclick = function() { 
        g_eatingAnimation = false;
        g_walkAnimation = false; 
    };

    // Add event listener for resetting animal to default
    document.getElementById("resetAnimal").addEventListener("click", function(ev) {
        g_walkAnimation = false;
        g_eatingAnimation = false;
        resetKoala();
        renderAllShapes();
    });

    document.getElementById("resetAnimalToDefaultPos").addEventListener("click", () => {
        g_koalaPosX = 0;
        g_koalaPosY = 0;
        g_koalaPosZ = 0;
    })

    document.getElementById("resetAnimalToDefaultRotation").addEventListener("click", () => {
        g_animalXAngle = 0.0;
        g_animalYAngle = 0.0;
        g_animalZAngle = 0.0;
    })

    // Add event listeners for inputs to rtoate the whole aniaml
    document.getElementById("rotateAnimalX").addEventListener("input", function(ev) {
        g_animalXAngle = numberInputHelper(ev.target.defaultValue, parseFloat(ev.target.value));
    });
    document.getElementById("rotateAnimalY").addEventListener("input", function(ev) {
        g_animalYAngle = numberInputHelper(ev.target.defaultValue, parseFloat(ev.target.value));
    });
    document.getElementById("rotateAnimalZ").addEventListener("input", function(ev) {
        g_animalZAngle = numberInputHelper(ev.target.defaultValue, parseFloat(ev.target.value));
    });

    actionsforHead();
    actionsforArms();
    actionsForLegs();
}

function actionsforHead() {
    //* Head rotation
    document.getElementById("rotateHeadX").addEventListener("input", function(ev) {
        g_rotateHeadX = numberInputHelper(ev.target.defaultValue, parseFloat(ev.target.value));
    });
        document.getElementById("rotateHeadY").addEventListener("input", function(ev) {
        g_rotateHeadY = numberInputHelper(ev.target.defaultValue, parseFloat(ev.target.value));
    });
        document.getElementById("rotateHeadZ").addEventListener("input", function(ev) {
        g_rotateHeadZ = numberInputHelper(ev.target.defaultValue, parseFloat(ev.target.value));
    });

    //* Lower jaw rotation
    document.getElementById("rotateLowerJaw").addEventListener("input", function(ev) {
        g_rotateLowerJawY = parseFloat(ev.target.value);
        renderAllShapes();
    });
}

function actionsforArms() {
    //* Left arm rotations
    document.getElementById("rotateUpperLeftArm").addEventListener("input", function(ev) {
        g_rotateUpperLeftArm = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateLowerLeftArm").addEventListener("input", function(ev) {
        g_rotateLowerLeftArm = -parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateLeftWristX").addEventListener("input", function(ev) {
        g_rotateLeftWristX = numberInputHelper(ev.target.defaultValue, parseFloat(ev.target.value));
        renderAllShapes();
    });
    document.getElementById("rotateLeftWristY").addEventListener("input", function(ev) {
        g_rotateLeftWristY = numberInputHelper(ev.target.defaultValue, parseFloat(ev.target.value));
        renderAllShapes();
    });
    document.getElementById("rotateLeftWristZ").addEventListener("input", function(ev) {
        g_rotateLeftWristZ = numberInputHelper(ev.target.defaultValue, parseFloat(ev.target.value));
        renderAllShapes();
    });

    //* Left fingys rotations
    document.getElementById("rotateLeftFirstThumb").addEventListener("input", function(ev) {
        g_rotateLeftThumb1 = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateLeftSecondThumb").addEventListener("input", function(ev) {
        g_rotateLeftThumb2 = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateLeftIndexFinger").addEventListener("input", function(ev) {
        g_rotateLeftIndexFinger = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateLeftMiddleFinger").addEventListener("input", function(ev) {
        g_rotateLeftMiddleFinger = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateLeftPinkyFinger").addEventListener("input", function(ev) {
        g_rotateLeftPinkyFinger = parseFloat(ev.target.value);
        renderAllShapes();
    });

    //* Right arm rotations
    document.getElementById("rotateUpperRightArm").addEventListener("input", function(ev) {
        g_rotateUpperRightArm = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateLowerRightArm").addEventListener("input", function(ev) {
        g_rotateLowerRightArm = -parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateRightWristX").addEventListener("input", function(ev) {
        g_rotateRightWristX = numberInputHelper(ev.target.defaultValue, parseFloat(ev.target.value));
        renderAllShapes();
    });
    document.getElementById("rotateRightWristY").addEventListener("input", function(ev) {
        g_rotateRightWristY = numberInputHelper(ev.target.defaultValue, parseFloat(ev.target.value));
        renderAllShapes();
    });
    document.getElementById("rotateRightWristZ").addEventListener("input", function(ev) {
        g_rotateRightWristZ = numberInputHelper(ev.target.defaultValue, parseFloat(ev.target.value));
        renderAllShapes();
    });

    //* Left fingys rotations
    document.getElementById("rotateRightFirstThumb").addEventListener("input", function(ev) {
        g_rotateRightThumb1 = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateRightSecondThumb").addEventListener("input", function(ev) {
        g_rotateRightThumb2 = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateRightIndexFinger").addEventListener("input", function(ev) {
        g_rotateRightIndexFinger = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateRightMiddleFinger").addEventListener("input", function(ev) {
        g_rotateRightMiddleFinger = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateRightPinkyFinger").addEventListener("input", function(ev) {
            g_rotateRightPinkyFinger = parseFloat(ev.target.value);
        renderAllShapes();
    });
}

function actionsForLegs() {
    // Left leg rotation
    document.getElementById("rotateUpperLeftLeg").addEventListener("input", function(ev) {
    g_rotateUpperLeftLeg = parseFloat(ev.target.value);
    renderAllShapes();
    });
    document.getElementById("rotateLowerLeftLeg").addEventListener("input", function(ev) {
    g_rotateLowerLeftLeg = -parseFloat(ev.target.value);
    renderAllShapes();
    });
    document.getElementById("rotateLeftAnkleX").addEventListener("input", function(ev) {
        g_rotateLeftAnkleX = numberInputHelper(ev.target.defaultValue, parseFloat(ev.target.value));
        renderAllShapes();
    });
    document.getElementById("rotateLeftAnkleY").addEventListener("input", function(ev) {
        g_rotateLeftAnkleY = numberInputHelper(ev.target.defaultValue, parseFloat(ev.target.value));
        renderAllShapes();
    });
    document.getElementById("rotateLeftAnkleZ").addEventListener("input", function(ev) {
        g_rotateLeftAnkleZ = numberInputHelper(ev.target.defaultValue, parseFloat(ev.target.value));
        renderAllShapes();
    });

    // Right leg rotation
    document.getElementById("rotateUpperRightLeg").addEventListener("input", function(ev) {
    g_rotateUpperRightLeg = parseFloat(ev.target.value);
    renderAllShapes();
    });
    document.getElementById("rotateLowerRightLeg").addEventListener("input", function(ev) {
    g_rotateLowerRightLeg = -parseFloat(ev.target.value);
    renderAllShapes();
    });
    document.getElementById("rotateRightAnkleX").addEventListener("input", function(ev) {
        g_rotateRightAnkleX = numberInputHelper(ev.target.defaultValue, parseFloat(ev.target.value));
        renderAllShapes();
    });
    document.getElementById("rotateRightAnkleY").addEventListener("input", function(ev) {
        g_rotateRightAnkleY = numberInputHelper(ev.target.defaultValue, parseFloat(ev.target.value));
        renderAllShapes();
    });
    document.getElementById("rotateRightAnkleZ").addEventListener("input", function(ev) {
        g_rotateRightAnkleZ = numberInputHelper(ev.target.defaultValue, parseFloat(ev.target.value));
        renderAllShapes();
    });

    // Left toes rotation
    document.getElementById("rotateLeftToe1").addEventListener("input", function(ev) {
        g_rotateLeftToe1 = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateLeftToe2").addEventListener("input", function(ev) {
        g_rotateLeftToe2 = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateLeftToe3").addEventListener("input", function(ev) {
        g_rotateLeftToe3 = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateLeftToe4").addEventListener("input", function(ev) {
        g_rotateLeftToe4 = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateLeftToe5").addEventListener("input", function(ev) {
        g_rotateLeftToe5 = parseFloat(ev.target.value);
        renderAllShapes();
    });

    // Right toes rotation
    document.getElementById("rotateRightToe1").addEventListener("input", function(ev) {
        g_rotateRightToe1 = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateRightToe2").addEventListener("input", function(ev) {
        g_rotateRightToe2 = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateRightToe3").addEventListener("input", function(ev) {
        g_rotateRightToe3 = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateRightToe4").addEventListener("input", function(ev) {
        g_rotateRightToe4 = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateRightToe5").addEventListener("input", function(ev) {
        g_rotateRightToe5 = parseFloat(ev.target.value);
        renderAllShapes();
    });
}

// Default values to reset the koala 
function resetKoala() {
 // Left Arm rotation
  g_rotateUpperLeftArm = Number(document.getElementById("rotateUpperLeftArm").defaultValue);
  g_rotateLowerLeftArm = Number(document.getElementById("rotateLowerLeftArm").defaultValue);
  g_rotateLeftWristX = Number(document.getElementById("rotateLeftWristX").defaultValue);
  g_rotateLeftWristY = Number(document.getElementById("rotateLeftWristY").defaultValue);
  g_rotateLeftWristZ = Number(document.getElementById("rotateLeftWristZ").defaultValue);

  // Left fingys rotation
  g_rotateLeftThumb1 = Number(document.getElementById("rotateLeftFirstThumb").defaultValue);
  g_rotateLeftThumb2 = Number(document.getElementById("rotateLeftSecondThumb").defaultValue);
  g_rotateLeftIndexFinger = Number(document.getElementById("rotateLeftIndexFinger").defaultValue);
  g_rotateLeftMiddleFinger = Number(document.getElementById("rotateLeftMiddleFinger").defaultValue);
  g_rotateLeftPinkyFinger = Number(document.getElementById("rotateLeftPinkyFinger").defaultValue);

  // Right Arm rotations
  g_rotateUpperRightArm = Number(document.getElementById("rotateUpperRightArm").defaultValue);
  g_rotateLowerRightArm = Number(document.getElementById("rotateLowerRightArm").defaultValue);
  g_rotateRightWristX = Number(document.getElementById("rotateRightWristX").defaultValue);
  g_rotateRightWristY = Number(document.getElementById("rotateRightWristY").defaultValue);
  g_rotateRightWristZ = Number(document.getElementById("rotateRightWristZ").defaultValue);

  // Right fingys rotation
  g_rotateRightThumb1 = Number(document.getElementById("rotateRightFirstThumb").defaultValue);
  g_rotateRightThumb2 = Number(document.getElementById("rotateRightSecondThumb").defaultValue);
  g_rotateRightIndexFinger = Number(document.getElementById("rotateRightIndexFinger").defaultValue);
  g_rotateRightMiddleFinger = Number(document.getElementById("rotateRightMiddleFinger").defaultValue);
  g_rotateRightPinkyFinger = Number(document.getElementById("rotateRightPinkyFinger").defaultValue);

  // Head rotations
  g_rotateHeadX = Number(document.getElementById("rotateHeadX").defaultValue);
  g_rotateHeadY = Number(document.getElementById("rotateHeadY").defaultValue);
  g_rotateHeadZ = Number(document.getElementById("rotateHeadZ").defaultValue);

  // Jaw rotations
  g_rotateLowerJawY = Number(document.getElementById("rotateLowerJaw").defaultValue);

  // Left Leg rotations
  g_rotateUpperLeftLeg = Number(document.getElementById("rotateUpperLeftLeg").defaultValue);
  g_rotateLowerLeftLeg = Number(document.getElementById("rotateLowerLeftLeg").defaultValue);
  g_rotateLeftAnkleX = Number(document.getElementById("rotateLeftAnkleX").defaultValue);
  g_rotateLeftAnkleY = Number(document.getElementById("rotateLeftAnkleY").defaultValue);
  g_rotateLeftAnkleZ = Number(document.getElementById("rotateLeftAnkleZ").defaultValue);

  // Left toes rotations
  g_rotateLeftToe1 = Number(document.getElementById("rotateLeftToe1").defaultValue);
  g_rotateLeftToe2 = Number(document.getElementById("rotateLeftToe2").defaultValue);
  g_rotateLeftToe3 = Number(document.getElementById("rotateLeftToe3").defaultValue);
  g_rotateLeftToe4 = Number(document.getElementById("rotateLeftToe4").defaultValue);
  g_rotateLeftToe5 = Number(document.getElementById("rotateLeftToe5").defaultValue);

  // Right Leg rotations
  g_rotateUpperRightLeg = Number(document.getElementById("rotateUpperRightLeg").defaultValue);
  g_rotateLowerRightLeg = Number(document.getElementById("rotateLowerRightLeg").defaultValue);
  g_rotateRightAnkleX = Number(document.getElementById("rotateRightAnkleX").defaultValue);
  g_rotateRightAnkleY = Number(document.getElementById("rotateRightAnkleY").defaultValue);
  g_rotateRightAnkleZ = Number(document.getElementById("rotateRightAnkleZ").defaultValue);

  // Right toes rotations
  g_rotateRightToe1 = Number(document.getElementById("rotateRightToe1").defaultValue);
  g_rotateRightToe2 = Number(document.getElementById("rotateRightToe2").defaultValue);
  g_rotateRightToe3 = Number(document.getElementById("rotateRightToe3").defaultValue);
  g_rotateRightToe4 = Number(document.getElementById("rotateRightToe4").defaultValue);
  g_rotateRightToe5 = Number(document.getElementById("rotateRightToe5").defaultValue);
}

function numberInputHelper(defaultVal, rotateValue) {
  return (!(Number.isNaN(rotateValue))) ? rotateValue : defaultVal;
}