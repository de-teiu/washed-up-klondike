var cardImage = {};

/** 初期化 */
function preload() {

    //キャンバスのサイズをウィンドウサイズに合わせて調整
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("canv");

    for (var i = 1; i <= 4; i++) {
        for (var j = 1; j <= 13; j++) {
            var str = String(i * 100 + j);
            cardImage[str] = loadImage("./js/image/" + str + ".png");
        }
    }
    cardImage.back = loadImage("./js/image/back.png");
    cardImage.set = loadImage("./js/image/set.png");

    //山札のセット
    cardSetup();
}

var startX = 0;
var setterStartX = 0;
var objList = [];


/** preloadにてキャンバスが作成された後の初期化処理 */
function setup() {
    frameRate(60);
    noStroke();

    startX = (windowWidth - 820) / 2;
    setterStartX = startX + 3 * 120;

}


var deckStartY = 80;
var fieldStartY = 250;

/** 画面描画 */
function draw() {
    background(64, 128, 64);

    /** カード最終設置場所(飾り) */
    for (var i = 0; i < 4; i++) {
        image(cardImage.set, setterStartX + i * 120, deckStartY, 100, 150);
    }

    /** 山札 */
    if (deckViewNum < deck.length - 1) {
        image(cardImage.back, startX, deckStartY, 100, 150);
    } else {
        image(cardImage.set, startX, deckStartY, 100, 150);
    }
    if (deckViewNum > -1) {
        for (i = 0; i < 3; i++) {
            image(cardImage[deck[deckViewNum].card[i]], startX + 120 + i * 20, deckStartY, 100, 150);
        }
    }


    /** フィールド */
    for (var obj of field) {
        for (i = obj.cardCount; i > 0; i--) {
            if (i > 1) {
                image(cardImage.back, startX + obj.x * 120, fieldStartY + i * 20, 100, 150);
            } else {
                image(cardImage[obj.topCard], startX + obj.x * 120, fieldStartY + i * 20, 100, 150);
            }
        }
    }
}

var deckViewNum = -1;

/** マウスクリック時の処理 */
function mousePressed() {

    /** 山札がクリックされたらめくる */
    if (mouseX >= startX && mouseX <= startX + 100 &&
        mouseY >= deckStartY && mouseY <= deckStartY + 150) {
        deckViewNum++;
        if (deckViewNum >= deck.length) {
            deckViewNum = -1;
        }
        return;
    }

}

/** ウィンドウがリサイズされたらキャンバス再作成 */
var timer = false;
$(window).resize(function () {
    if (timer !== false) {
        clearTimeout(timer);
    }
    timer = setTimeout(function () {
        console.log('resized');
        //キャンバス再描画
        resizeCanvas(windowWidth, windowHeight);
        setup();
    }, 200);
});
