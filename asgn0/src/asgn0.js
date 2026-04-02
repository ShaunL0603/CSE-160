// DrawRectangle
function main() 
{
    // Retrieve <canvas> element <- (1)
    var canvas = document.getElementById('example');
    if (!canvas) 
    {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    
    // Get the rendering context for 2DCG <- (2)
    var ctx = canvas.getContext('2d');
    
    // fill the canvas with black
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, 400, 400);

    var v1 = new Vector3([2.25, 2.25, 0]);
}

function drawVector(v, color) 
{
    lineTo();
    return;
}