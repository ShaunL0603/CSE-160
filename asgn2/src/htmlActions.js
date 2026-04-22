function addActionsForHtmlUI() {
  // Add event listener for rotate sensitivity slider
  document.getElementById("rotateSensitivity").addEventListener("input", function(ev) {
    g_rotateSensitivity = parseFloat(ev.target.value);
  });

  // Add event listener for resetting animal position
  document.getElementById("resetAnimalPos").addEventListener("click", function(ev) {
    g_koalaPosX = 0;
    g_koalaPosY = 0;
    g_koalaPosZ = 0;
    renderAllShapes();
  });

  // Add event listeners for animal rotation inputs
  document.getElementById("rotateAnimalX").addEventListener("input", function(ev) {
    rotateAnimal("x", parseFloat(ev.target.value));
  });
  document.getElementById("rotateAnimalY").addEventListener("input", function(ev) {
    rotateAnimal("y", parseFloat(ev.target.value));
  });
  document.getElementById("rotateAnimalZ").addEventListener("input", function(ev) {
    rotateAnimal("z", parseFloat(ev.target.value));
  });

  //* ACTIONS FOR ARMS
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
        g_rotateLeftWristZ = parseFloat(ev.target.value);
        renderAllShapes();
    });

    // Left fingys rotations
    document.getElementById("rotateLeftFirstThumb").addEventListener("input", function(ev) {
        g_rotateLeftThumb1 = parseFloat(ev.target.value);
        renderAllShapes();
    });
    document.getElementById("rotateLeftIndexFinger").addEventListener("input", function(ev) {
        g_rotateLeftIndexFinger = parseFloat(ev.target.value);
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

  //* ACTIONS FOR HEAD
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

  //* Actions for legs
    // Left leg rotation
    document.getElementById("rotateUpperLeftLeg").addEventListener("input", function(ev) {
    g_rotateUpperLeftLeg = parseFloat(ev.target.value);
    renderAllShapes();
    });
    document.getElementById("rotateLowerLeftLeg").addEventListener("input", function(ev) {
    g_rotateLowerLeftLeg = parseFloat(ev.target.value);
    renderAllShapes();
    });
}
