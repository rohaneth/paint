alert(`if you find any problem relode page after each selection of tool`);


document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');
    const lineWidthInput = document.getElementById('lineWidth');
    const toolSelector = document.getElementById('toolSelector');
    const clearCanvasBtn = document.getElementById('clearCanvas');
    const saveDrawingBtn = document.getElementById('saveDrawing');
    let painting = false;
    let erasing = false;
    let startX, startY;
    let lineStart = false;
    let isClicked = {no:0};
    let location = {x:0,y:0};
    let isDrawing = false;
    let startPoint = { x: 0, y: 0 };
    let endPoint = {x:0,y:0};
    let vertex = {x:0,y:0};
    let alerts = {c:0,n:0,p:0};
    let Triangle = {click:0};
    let t = {x1:0,
        y1:0,
        x2:0,
        y2:0,
        x3:0,
        y3:0
      }

  
    canvas.width = window.innerWidth - 50;
    canvas.height = window.innerHeight - 120;
  
    function startPosition(e) {
      painting = true;
      startX = e.clientX - canvas.offsetLeft;
      startY = e.clientY - canvas.offsetTop;

      draw(e);
    }
  
    function endPosition() {
      painting = false;
      erasing = false;
      ctx.beginPath();
    }
  
    function draw(e) {
      if (!painting) return;
  
      ctx.lineWidth = lineWidthInput.value;
      ctx.lineCap = 'round';
      ctx.strokeStyle = colorPicker.value;
      ctx.fillStyle = colorPicker.value;
  
      const x = e.clientX - canvas.offsetLeft;
      const y = e.clientY - canvas.offsetTop;
      
      if (toolSelector.value === 'pen') {
      
        // ctx.lineTo(x, y);
        // ctx.stroke();
        // ctx.beginPath();
        // ctx.moveTo(x, y);
        // console.log("pens");

        
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        
        
      } else if (toolSelector.value === 'eraser') {
        if (!erasing) {
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          erasing = true;
        }
  
        ctx.clearRect(x - lineWidthInput.value / 2, y - lineWidthInput.value / 2, lineWidthInput.value, lineWidthInput.value);
      } else if (toolSelector.value === 'rectangle') {
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(startX, startY, x - startX, y - startY);
      } else if (toolSelector.value === 'circle') {
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
        ctx.fill();
      }else if(toolSelector.value === 'line'){
        if(alerts.c == 0){
          alert(`
          dobule click touchpad and move cursor anywhere
           keeping fincer on cursor then lift fingure`);
           alerts.c = 1;
        }
        if(toolSelector.value !== 'line'){
          return;
        }
          
                canvas.addEventListener("mousedown",(e)=>{
                  if(toolSelector.value !== 'line'){
                    return;
                  }
                    isDrawing = true;
                    startPoint.x = e.clientX - canvas.offsetLeft;
                    startPoint.y = e.clientY - canvas.offsetTop;
                })
                canvas.addEventListener("mouseup",(e)=>{
                  if(toolSelector.value !== 'line'){
                    return;
                  }
                  if (!isDrawing) return;
                  endPoint.x = e.clientX - canvas.offsetLeft;
                  endPoint.y = e.clientY - canvas.offsetTop;
                  ctx.beginPath();
                  ctx.moveTo(startPoint.x,startPoint.y);
                  ctx.lineTo(endPoint.x,endPoint.y);
                  ctx.stroke();
                  //ctx.closePath();
                })
      }else if(toolSelector.value === 'path'){
        if(alerts.p == 0){
          alert(`
          click Touchpad once then dobuleclick at anywhere to extend path further`);
           alerts.p = 1;
        }
        if(toolSelector.value !== 'path'){
          return;
        }
        ctx.beginPath();
        ctx.moveTo(startX,startY);
        canvas.addEventListener('dblclick', ()=>{
          if(toolSelector.value !== 'path'){
            return;
          }
          ctx.lineTo(x,y);
          ctx.stroke();
          //ctx.beginPath();
          
        })

        
      }else if(toolSelector.value === 'net'){
        if(alerts.n == 0){
          alert(`
          tripel click the tuchpad as many times you can all points will connect`);
           alerts.n = 1;
        }
        if(toolSelector.value !== 'net'){
          return;
        }
        canvas.addEventListener('click', function (evt) {
          if (evt.detail === 3) {
            if(toolSelector.value !== 'net'){
              return;
            }
            ctx.beginPath();
            ctx.moveTo(startX,startY);
            ctx.lineTo(x,y);
            ctx.stroke();
            ctx.beginPath();
          }
      });       
      }else if(toolSelector.value === 'Triangle'){

        let isDrawing = false;
        let clickCount = 0;
        let clickLocations = [];
        
        canvas.addEventListener('mousedown', recordClick);
        
        function recordClick(e) {
          if(toolSelector.value !== 'Triangle'){
            return;
          }
          if (clickCount < 3) {
            const x = e.clientX - canvas.offsetLeft;
            const y = e.clientY - canvas.offsetTop;
            clickLocations.push({ x, y });
            clickCount++;
        
            if (clickCount === 3) {
              drawTriangle(clickLocations);
              clickCount = 0;
              clickLocations = [];
            }
          }
        }
        
        function drawTriangle(locations) {
          if(toolSelector.value !== 'Triangle'){
            return;
          }
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.beginPath();
          ctx.moveTo(locations[0].x, locations[0].y);
          ctx.lineTo(locations[1].x, locations[1].y);
          ctx.lineTo(locations[2].x, locations[2].y);
          ctx.closePath();
          ctx.stroke();
        }
        }
        
      
      
    }
  
    function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  
    function saveDrawing() {
      const dataUrl = canvas.toDataURL();
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'drawing.png';
      a.click();
    }
    //canvas.addEventListener('mouseup', endPoint);
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);
    clearCanvasBtn.addEventListener('click', clearCanvas);
    saveDrawingBtn.addEventListener('click', saveDrawing);
  });
  
