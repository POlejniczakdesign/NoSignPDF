/**
 * Smart Grid Snapping for official forms (Adobe XFA, PCC-3, PIT, etc.)
 * Analyzes rendered HTML5 canvas pixels to detect printed bounding boxes,
 * check squares, character cells (PESEL, NIP, Date), and field lines.
 */

export interface DetectedGridBox {
  found: boolean;
  x: number;          // Left position in canvas DOM pixels
  y: number;          // Top position in canvas DOM pixels
  width: number;      // Box width
  height: number;     // Box height
  centerX: number;    // Exact center X
  centerY: number;    // Exact center Y
  contentX: number;   // Recommended text start X
  contentY: number;   // Recommended text start Y
  isSquare: boolean;  // True if it's a checkbox square (e.g. 10-26px, aspect ~1:1)
  isCharCell: boolean;// True if it's a single digit/letter box (e.g. NIP/PESEL/date cell)
  cellWidth: number;  // Spacing width of one cell for letter-spacing
  confidence: number; // 0.0 - 1.0
}

/**
 * Checks whether a pixel is part of a dark printed line/border
 */
function isDarkPixel(r: number, g: number, b: number, a: number): boolean {
  if (a < 80) return false; // transparent
  // Luma calculation
  const luma = 0.299 * r + 0.587 * g + 0.114 * b;
  return luma < 140; // dark ink/border
}

/**
 * Checks whether a pixel is light background (white / off-white)
 */
function isLightPixel(r: number, g: number, b: number, a: number): boolean {
  if (a < 50) return true;
  const luma = 0.299 * r + 0.587 * g + 0.114 * b;
  return luma > 180;
}

/**
 * Scans the canvas around a user click (clickX, clickY) to identify the enclosing
 * or nearest bounding box (kratka) with sub-pixel precision.
 */
export function snapToGridBox(
  canvas: HTMLCanvasElement,
  clickX: number,
  clickY: number,
  searchRadius: number = 32
): DetectedGridBox {
  const fallbackBox: DetectedGridBox = {
    found: false,
    x: Math.round(clickX),
    y: Math.round(clickY),
    width: 120,
    height: 22,
    centerX: Math.round(clickX),
    centerY: Math.round(clickY),
    contentX: Math.round(clickX),
    contentY: Math.round(clickY),
    isSquare: false,
    isCharCell: false,
    cellWidth: 20,
    confidence: 0,
  };

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return fallbackBox;

  const canvasW = canvas.width;
  const canvasH = canvas.height;

  // Window to inspect
  const winRadius = Math.max(30, Math.min(60, searchRadius + 15));
  const winX = Math.max(0, Math.floor(clickX - winRadius));
  const winY = Math.max(0, Math.floor(clickY - winRadius));
  const winW = Math.min(canvasW - winX, winRadius * 2);
  const winH = Math.min(canvasH - winY, winRadius * 2);

  if (winW < 10 || winH < 10) return fallbackBox;

  let imgData: ImageData;
  try {
    imgData = ctx.getImageData(winX, winY, winW, winH);
  } catch (err) {
    console.warn('Unable to get canvas ImageData for grid snapping:', err);
    return fallbackBox;
  }

  const { data } = imgData;

  const getPixel = (x: number, y: number): [number, number, number, number] => {
    if (x < 0 || x >= winW || y < 0 || y >= winH) return [255, 255, 255, 0];
    const idx = (y * winW + x) * 4;
    return [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]];
  };

  const isDarkAt = (x: number, y: number): boolean => {
    const [r, g, b, a] = getPixel(x, y);
    return isDarkPixel(r, g, b, a);
  };

  // Local click coordinates inside window
  const localClickX = Math.floor(clickX - winX);
  const localClickY = Math.floor(clickY - winY);

  // Candidate start positions to try (click point first, then small neighborhood)
  const candidateOffsets = [
    [0, 0],
    [0, -4],
    [0, 4],
    [-4, 0],
    [4, 0],
    [-8, 0],
    [8, 0],
    [0, -8],
    [0, 8],
    [-12, 0],
    [12, 0],
  ];

  let bestBox: DetectedGridBox | null = null;
  let highestScore = -1;

  for (const [ox, oy] of candidateOffsets) {
    const sx = localClickX + ox;
    const sy = localClickY + oy;

    if (sx < 2 || sx >= winW - 2 || sy < 2 || sy >= winH - 2) continue;

    // If starting point is dark, it's on a border. Skip to light center
    if (isDarkAt(sx, sy)) continue;

    // 1. Raycast LEFT to find vertical border
    let leftBorder = -1;
    for (let x = sx; x >= 0; x--) {
      // Check if at this x there is a vertical run of dark pixels
      let darkCount = 0;
      for (let dy = -3; dy <= 3; dy++) {
        if (isDarkAt(x, sy + dy)) darkCount++;
      }
      if (darkCount >= 3) {
        leftBorder = x;
        break;
      }
    }

    // 2. Raycast RIGHT to find vertical border
    let rightBorder = -1;
    for (let x = sx; x < winW; x++) {
      let darkCount = 0;
      for (let dy = -3; dy <= 3; dy++) {
        if (isDarkAt(x, sy + dy)) darkCount++;
      }
      if (darkCount >= 3) {
        rightBorder = x;
        break;
      }
    }

    // 3. Raycast UP to find horizontal border
    let topBorder = -1;
    for (let y = sy; y >= 0; y--) {
      let darkCount = 0;
      for (let dx = -3; dx <= 3; dx++) {
        if (isDarkAt(sx + dx, y)) darkCount++;
      }
      if (darkCount >= 3) {
        topBorder = y;
        break;
      }
    }

    // 4. Raycast DOWN to find horizontal border
    let bottomBorder = -1;
    for (let y = sy; y < winH; y++) {
      let darkCount = 0;
      for (let dx = -3; dx <= 3; dx++) {
        if (isDarkAt(sx + dx, y)) darkCount++;
      }
      if (darkCount >= 3) {
        bottomBorder = y;
        break;
      }
    }

    if (
      leftBorder !== -1 &&
      rightBorder !== -1 &&
      topBorder !== -1 &&
      bottomBorder !== -1
    ) {
      const boxW = rightBorder - leftBorder;
      const boxH = bottomBorder - topBorder;

      // Reasonable box dimension constraints
      if (boxW >= 8 && boxW <= 500 && boxH >= 8 && boxH <= 80) {
        // Validate perimeter: check top, bottom, left, right edge completeness
        let borderHits = 0;
        let borderTests = 0;

        // Sample top & bottom borders
        for (let x = leftBorder + 2; x < rightBorder - 2; x += 4) {
          borderTests += 2;
          if (isDarkAt(x, topBorder) || isDarkAt(x, topBorder - 1) || isDarkAt(x, topBorder + 1)) {
            borderHits++;
          }
          if (isDarkAt(x, bottomBorder) || isDarkAt(x, bottomBorder - 1) || isDarkAt(x, bottomBorder + 1)) {
            borderHits++;
          }
        }

        // Sample left & right borders
        for (let y = topBorder + 2; y < bottomBorder - 2; y += 4) {
          borderTests += 2;
          if (isDarkAt(leftBorder, y) || isDarkAt(leftBorder - 1, y) || isDarkAt(leftBorder + 1, y)) {
            borderHits++;
          }
          if (isDarkAt(rightBorder, y) || isDarkAt(rightBorder - 1, y) || isDarkAt(rightBorder + 1, y)) {
            borderHits++;
          }
        }

        const edgeRatio = borderTests > 0 ? borderHits / borderTests : 0;
        if (edgeRatio > 0.4) {
          const absX = winX + leftBorder;
          const absY = winY + topBorder;

          const isSquare = boxW <= 28 && boxH <= 28 && Math.abs(boxW - boxH) <= 7;
          const isCharCell = !isSquare && boxW >= 12 && boxW <= 34 && boxH >= 12 && boxH <= 36;

          // Check if there is an adjoining box to the right (like NIP, PESEL, date series)
          let hasSiblingCell = false;
          let siblingWidth = boxW;
          if (isCharCell || isSquare) {
            // Check pixel after rightBorder
            const nextX = rightBorder + 2;
            let nextDark = 0;
            for (let dy = -2; dy <= 2; dy++) {
              if (isDarkAt(nextX + boxW, (topBorder + bottomBorder) / 2 + dy)) {
                nextDark++;
              }
            }
            if (nextDark >= 2) {
              hasSiblingCell = true;
              siblingWidth = boxW;
            }
          }

          const centerX = absX + boxW / 2;
          const centerY = absY + boxH / 2;

          let contentX = absX + 3;
          let contentY = absY + Math.max(1, (boxH - 18) / 2);

          if (isSquare) {
            contentX = absX;
            contentY = absY;
          } else if (isCharCell) {
            contentX = absX + Math.max(1, (boxW - 12) / 2);
            contentY = absY + Math.max(1, (boxH - 18) / 2);
          }

          // Score based on edgeRatio and distance from click
          const dist = Math.hypot(clickX - centerX, clickY - centerY);
          const score = edgeRatio * 100 - dist;

          if (score > highestScore) {
            highestScore = score;
            bestBox = {
              found: true,
              x: absX,
              y: absY,
              width: boxW,
              height: boxH,
              centerX,
              centerY,
              contentX,
              contentY,
              isSquare,
              isCharCell: isCharCell || hasSiblingCell,
              cellWidth: boxW,
              confidence: edgeRatio,
            };
          }
        }
      }
    }
  }

  return bestBox || fallbackBox;
}
