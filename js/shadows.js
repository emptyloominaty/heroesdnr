function drawBuildingShadow(x2d,y2d,sizeX,sizeY) {
    // Setup
    let rad = (sunDir + 55) * Math.PI / 180;
    let shadowLength = 10 * shadowLen * zoom;
    let dx = Math.cos(rad) * shadowLength;
    let dy = Math.sin(rad) * shadowLength;
    let corners = [
        { x: x2d, y: y2d },                         // top-left
        { x: x2d + sizeX, y: y2d },                 // top-right
        { x: x2d + sizeX, y: y2d + sizeY },         // bottom-right
        { x: x2d, y: y2d + sizeY }                  // bottom-left
    ];
    let projected = corners.map(c => ({
        x: c.x + dx,
        y: c.y + dy
    }));
    for (let i = 0; i < 4; i++) {
        let curr = corners[i];
        let next = corners[(i + 1) % 4];
        let projCurr = projected[i];
        let projNext = projected[(i + 1) % 4];
        let edgeDx = next.x - curr.x;
        let edgeDy = next.y - curr.y;
        let normalX = -edgeDy;
        let normalY = edgeDx;
        let dot = normalX * dx + normalY * dy;
        if (dot > 0) {
            game2d.canvas.beginPath();
            game2d.canvas.moveTo(curr.x, curr.y);
            game2d.canvas.lineTo(next.x, next.y);
            game2d.canvas.lineTo(projNext.x, projNext.y);
            game2d.canvas.lineTo(projCurr.x, projCurr.y);
            game2d.canvas.closePath();
            game2d.canvas.fillStyle = 'rgba(0, 0, 0, '+(shadowAlpha-0.1)+')';
            game2d.canvas.fill();
        }
    }
    game2d.canvas.beginPath();
    game2d.canvas.moveTo(projected[3].x, projected[3].y); // bottom-left projected
    game2d.canvas.lineTo(projected[2].x, projected[2].y); // bottom-right projected
    game2d.canvas.lineTo(projected[1].x, projected[1].y); // top-right projected
    game2d.canvas.lineTo(projected[0].x, projected[0].y); // top-left projected
    game2d.canvas.closePath();
    game2d.canvas.fillStyle = 'rgba(0, 0, 0, '+shadowAlpha-0.1+')';
    game2d.canvas.fill();

    game2d.canvas.globalCompositeOperation = 'destination-out';
    game2d.canvas.fillStyle = 'rgba(255, 255, 255, 1)';
    game2d.canvas.beginPath();
    game2d.canvas.rect(x2d, y2d, sizeX, sizeY);
    game2d.canvas.fill();
    game2d.canvas.globalCompositeOperation = 'source-over';
}
