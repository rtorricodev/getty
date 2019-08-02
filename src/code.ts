figma.showUI(__html__)

figma.ui.onmessage = msg => {
  if (isCreateRectangles(msg)) {
    const nodes = []

    for (let i = 0; i < msg.rows; i++) {
      for (let j = 0; j < msg.columns; j++) {      
        const rect = createRectangle(i,j);
        nodes.push(rect)
        addToFigma(rect);
      }
    }

    SelectOn(nodes);
    FocusOn(nodes);
  }

  figma.closePlugin()
}

function addToFigma(rect: RectangleNode) {
  figma.currentPage.appendChild(rect);
}

function FocusOn(nodes: any[]) {
  figma.viewport.scrollAndZoomIntoView(nodes);
}

function SelectOn(nodes: any[]) {
  figma.currentPage.selection = nodes;
}

function createRectangle(i: number,j: number) {
  const rectangle = figma.createRectangle();
  rectangle.x = i * 150;
  rectangle.y = j * 150;
  rectangle.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
  return rectangle;
}

function isCreateRectangles(msg: any) {
  return msg.type === 'create-rectangles';
}
