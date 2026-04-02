// DrawRectangle
function main() 
{
    // Retrieve <canvas> element <- (1)
    const canvas = document.getElementById('example');
    if (!canvas) 
    {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    
    // Get the rendering context for 2DCG <- (2)
    const ctx = canvas.getContext('2d');
    
    // fill the canvas with black
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.translate(canvas.width / 2, canvas.height / 2); // center coordinate system
    ctx.scale(1, -1);                                   // flip y-axis to point upwards
    ctx.fillRect(-200, -200, 400, 400);
}

function drawVector(v, color) 
{
    const canvas = document.getElementById('example');
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(v.elements[0] * 20, v.elements[1] * 20);
    ctx.strokeStyle = color;
    ctx.stroke();
}

function handleDrawEvent()
{
    clearRectangle();

    const v1x = document.getElementById('v1x').value;
    const v1y = document.getElementById('v1y').value;
    const v2x = document.getElementById('v2x').value;
    const v2y = document.getElementById('v2y').value;

    var v1 = new Vector3([parseFloat(v1x), parseFloat(v1y), 0]);
    var v2 = new Vector3([parseFloat(v2x), parseFloat(v2y), 0]);
    drawVector(v1, 'red');
    drawVector(v2, 'blue');
    return [v1, v2];
}

function handleDrawOperationEvent()
{
    clearRectangle();

    var v1, v2;
    [v1, v2] = handleDrawEvent();

    const operation = document.getElementById('operation').value;
    let res1, res2;
    let scalar;
    switch (operation)
    {
        case 'add':
            res1 = v1.add(v2);
            break;
        case 'subtract':
            res1 = v1.sub(v2);
            break;
        case 'multiply':
            scalar = parseFloat(document.getElementById('scalar').value);
            res1 = v1.mul(scalar);
            res2 = v2.mul(scalar);
            break;
        case 'divide':
            scalar = parseFloat(document.getElementById('scalar').value);
            res1 = v1.div(scalar);
            res2 = v2.div(scalar);
            break;
        case 'magnitude':
            res1 = v1.magnitude();
            res2 = v2.magnitude();
            console.log(`Magnitude of v1: ${res1}`);
            console.log(`Magnitude of v2: ${res2}`);
            break;
        case 'normalize':
            res1 = v1.normalize();
            res2 = v2.normalize();
            break;
        default:
            console.log(`Invalid operation: ${operation}`);
            return;
    }
    
    if (res1 instanceof Vector3)
    {
        drawVector(res1, 'green');
    }
    if (res2 instanceof Vector3)
    {
        drawVector(res2, 'green');
    }
}

function clearRectangle()
{
    const ctx = document.getElementById('example').getContext('2d');
    ctx.clearRect(-200, -200, 400, 400);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(-200, -200, 400, 400);
}