let angle = 0; // 用於控制搖晃的角度
let seaweeds = []; // 儲存水草的資料
const colors = ['#0077b6', '#e63946', '#588157', '#ffd500', '#6930c3']; // 指定的五種顏色

function setup() { // 初始值設定
  // 創建畫布，並讓畫布顯示在 iframe 前面
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('position', 'absolute');
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('z-index', '1'); // 將畫布放在 iframe 前面
  canvas.style('pointer-events', 'none'); // 讓滑鼠事件穿透畫布
  blendMode(BLEND); // 設定混合模式為 BLEND，允許顏色重疊
  initializeSeaweeds(); // 初始化 100 條水草

  // 創建 iframe，放在畫布後面
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  iframe.style('position', 'absolute');
  iframe.style('width', '100%');
  iframe.style('height', '100%');
  iframe.style('top', '0');
  iframe.style('left', '0');
  iframe.style('z-index', '0'); // 將 iframe 放在畫布後面
  iframe.style('border', 'none');
}

function initializeSeaweeds() {
  seaweeds = []; // 清空水草陣列
  for (let i = 0; i < 100; i++) {
    let x = random(width); // 隨機 X 座標
    let height = random(windowHeight / 8, windowHeight / 4); // 隨機高度，範圍為螢幕高度的 1/8 到 1/4
    let color = colors[int(random(colors.length))] + hex(int(random(50, 150)), 2); // 加入透明度 (50-150)
    let thickness = random(15, 30); // 隨機粗細
    let frequency = random(0.02, 0.05); // 隨機搖晃頻率
    seaweeds.push({ x, height, color, thickness, frequency }); // 儲存水草的屬性
  }
}

function draw() { // 畫圖
  clear(); // 清除畫布，讓背景透明

  for (let seaweed of seaweeds) {
    let baseX = seaweed.x; // 水草的基底 X 座標
    let baseY = height; // 水草的底部 Y 座標
    let lineHeight = seaweed.height; // 水草的高度
    let segments = 10; // 水草的線段數量
    let segmentHeight = lineHeight / segments; // 每段的高度

    let currentX = baseX; // 當前 X 座標
    let currentY = baseY; // 當前 Y 座標

    strokeWeight(seaweed.thickness); // 設定水草的粗細
    stroke(seaweed.color); // 設定水草的顏色 (包含透明度)
    noFill(); // 不填充內部

    beginShape(); // 開始繪製水草
    vertex(currentX, currentY); // 起始點

    for (let i = 0; i < segments; i++) {
      let sway = sin(angle * seaweed.frequency + i * 0.5) * (1 - i / segments) * 5; // 減小搖晃幅度，越靠近底部越小
      currentX += sway; // 計算下一段的 X 座標
      currentY -= segmentHeight; // 計算下一段的 Y 座標
      vertex(currentX, currentY); // 添加頂點
    }

    endShape(); // 結束繪製水草
  }

  angle += 1; // 控制搖晃速度，讓晃動更快
}

function windowResized() { // 畫布大小隨視窗大小改變
  resizeCanvas(windowWidth, windowHeight);
  initializeSeaweeds(); // 重新初始化水草
}