function addActionsForHtmlUI() {
  // Add event listener for rotate sensitivity slider
  document.getElementById("rotateSensitivity").addEventListener("input", function(ev) {
    g_rotateSensitivity = parseFloat(ev.target.value);
  });

    // Action to start or stop animation
    document.getElementById("animationOn").onclick = function() { g_walkAnimation = true; };
    document.getElementById("animationOff").onclick = function() { g_walkAnimation = false; };

  // Add event listener for resetting animal position
  document.getElementById("resetAnimalPos").addEventListener("click", function(ev) {
    g_koalaPosX = 0;
    g_koalaPosY = 0;
    g_koalaPosZ = 0;
    renderAllShapes();
  });

  // Add event listeners for inputs to rtoate the whole aniaml
  document.getElementById("rotateAnimalX").addEventListener("input", function(ev) {
    rotateAnimalHelper("x", parseFloat(ev.target.value));
  });
  document.getElementById("rotateAnimalY").addEventListener("input", function(ev) {
    rotateAnimalHelper("y", parseFloat(ev.target.value));
  });
  document.getElementById("rotateAnimalZ").addEventListener("input", function(ev) {
    rotateAnimalHelper("z", parseFloat(ev.target.value));
  });

  actionsforHead();
  actionsforArms();
  actionsForLegs();
}

function actionsforHead() {
    // Head rotation
    document.getElementById("rotateHeadX").addEventListener("input", function(ev) {
        g_rotateHeadX = parseFloat(ev.target.value);
        renderAllShapes();
    });
        document.getElementById("rotateHeadY").addEventListener("input", function(ev) {
        g_rotateHeadY = parseFloat(ev.target.value);
        renderAllShapes();
    });
        document.getElementById("rotateHeadZ").addEventListener("input", function(ev) {
        g_rotateHeadZ = parseFloat(ev.target.value);
        renderAllShapes();
    });

    // Lower jaw rotation
    document.getElementById("rotateLowerJaw").addEventListener("input", function(ev) {
        g_rotateLowerJawY = parseFloat(ev.target.value);
        renderAllShapes();
    });
}

function actionsforArms() {
    // Left arm rotations
    document.getElementById("rotateUpperLeftArm").addEventListener("input", function(ev) {
        g_rotateUpperLeftArm = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateLowerLeftArm").addEventListener("input", function(ev) {
        g_rotateLowerLeftArm = -parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateLeftWristX").addEventListener("input", function(ev) {
        g_rotateLeftWristX = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateLeftWristY").addEventListener("input", function(ev) {
        g_rotateLeftWristY = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateLeftWristZ").addEventListener("input", function(ev) {
        g_rotateLeftWristZ = -parseFloat(ev.target.value);
        renderAllShapes();
    });

    // Left fingys rotations
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

    // Right arm rotations
    document.getElementById("rotateUpperRightArm").addEventListener("input", function(ev) {
        g_rotateUpperRightArm = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateLowerRightArm").addEventListener("input", function(ev) {
        g_rotateLowerRightArm = -parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateRightWristX").addEventListener("input", function(ev) {
        g_rotateRightWristX = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateRightWristY").addEventListener("input", function(ev) {
        g_rotateRightWristY = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateRightWristZ").addEventListener("input", function(ev) {
        g_rotateRightWristZ = parseFloat(ev.target.value);
        renderAllShapes();
    });

    // Left fingys rotations
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
        g_rotateLeftAnkleX = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateLeftAnkleY").addEventListener("input", function(ev) {
        g_rotateLeftAnkleY = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateLeftAnkleZ").addEventListener("input", function(ev) {
        g_rotateLeftAnkleZ = -parseFloat(ev.target.value);
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
        g_rotateRightAnkleX = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateRightAnkleY").addEventListener("input", function(ev) {
        g_rotateRightAnkleY = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateRightAnkleZ").addEventListener("input", function(ev) {
        g_rotateRightAnkleZ = -parseFloat(ev.target.value);
        renderAllShapes();
    });

    // Left toes rotation
    document.getElementById("rotateLeftFirstToe").addEventListener("input", function(ev) {
        g_rotateLeftToe1 = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateLeftSecondToe").addEventListener("input", function(ev) {
        g_rotateLeftToe2 = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateLeftThirdToe").addEventListener("input", function(ev) {
        g_rotateLeftToe3 = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateLeftFourthToe").addEventListener("input", function(ev) {
        g_rotateLeftToe4 = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateLeftFifthToe").addEventListener("input", function(ev) {
        g_rotateLeftToe5 = parseFloat(ev.target.value);
        renderAllShapes();
    });

    // Right toes rotation
    document.getElementById("rotateRightFirstToe").addEventListener("input", function(ev) {
        g_rotateRightToe1 = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateRightSecondToe").addEventListener("input", function(ev) {
        g_rotateRightToe2 = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateRightThirdToe").addEventListener("input", function(ev) {
        g_rotateRightToe3 = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateRightFourthToe").addEventListener("input", function(ev) {
        g_rotateRightToe4 = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateRightFifthToe").addEventListener("input", function(ev) {
        g_rotateRightToe5 = parseFloat(ev.target.value);
        renderAllShapes();
    });
}
