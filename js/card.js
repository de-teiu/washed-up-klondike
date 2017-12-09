/**
 * カードすべて3桁の数値で表される。
 * 先頭1桁がカードの種類を表し、残り2桁が数字。
 **/
var SUIT = {
    SPADES: 1,
    HEARTS: 2,
    CLUBS: 3,
    DIAMONDS: 4,
};



/* 場札 */
var field = [];
var FieldData = function (x) {
    this.x = x - 1;
    this.cardCount = x;
    this.topCard = 0;
};

/** 山札 */
var deck = [];
var DeckData = function (num) {
    this.num = num;
    this.cardCount = 3;
    this.card = [];
};


/** 未配置のカード一覧(52枚) */
var cardList = [];

/** 配置するカードの初期化 */
function cardSetup() {
    resetCardList();

    for (var i = 1; i <= 7; i++) {
        field.push(new FieldData(i));
    }
    for (i = 1; i <= 8; i++) {
        deck.push(new DeckData(i));
    }


    for (var obj of field) {
        obj.topCard = getCard();
        removeFromCardList(obj.topCard);
        //console.log(obj.topCard);
    }

    for (var deckObj of deck) {
        //３枚単位で表示される山札からめくったカードの先頭
        deckObj.card.unshift(getCard());
        removeFromCardList(deckObj.topCard);
        //残りの２枚
        deckObj.card.unshift(getFromCardList());
        removeFromCardList(deckObj.topCard);
        deckObj.card.unshift(getFromCardList());
        removeFromCardList(deckObj.topCard);
        //console.log(deckObj.card[2]);
    }
}

/** 未配置のカードリストに全カードセット */
function resetCardList() {
    for (var i = 1; i <= 4; i++) {
        for (var j = 1; j <= 13; j++) {
            cardList.push(i * 100 + j);
        }
    }
}

/** 山札から以下の条件で１枚取り出す。
 *・1ではないこと
 *・ほかの場札に移動できないこと
 **/
function getCard() {
    var result = 0;
    while (result === 0) {
        result = getFromCardList();
        if (result % 100 === 1) {
            result = 0;
            continue;
        }

        var resultCardInfo = getCardInfo(result);
        for (var obj of field) {
            var objCardInfo = getCardInfo(obj.topCard);
            if (resultCardInfo.suit % 2 != objCardInfo.suit % 2 &&
                Math.abs(resultCardInfo.num - objCardInfo.num) == 1) {
                result = 0;
                break;
            }
        }
    }
    return result;
}

/** カード情報をマークと数値に分割 */
function getCardInfo(value) {
    return {
        suit: Math.floor(value / 100),
        num: value % 100
    };
}

/** 山から１枚取り出す */
function getFromCardList() {
    var num = getRandomNumber(cardList.length - 1);
    var value = cardList[num];
    return value;
}

/** 山から特定のカードを除外 */
function removeFromCardList(value) {
    cardList.some(function (v, i) {
        if (v == value) cardList.splice(i, 1);
    });
}


/** 0～maxまでの範囲で乱数取得 */
function getRandomNumber(max) {
    var num = Number(floor(random(max + 1)));
    return num;
}
