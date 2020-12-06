console.log(window['ngt-balance-info-bar'])

const TOTAL_WINS = 'TOTAL_WINS';
const WIN_UP_TO = 'WIN_UP_TO';
const BALANCE = 'BALANCE';
const TOTAL_COST = 'TOTAL_COST';

const texts = {
    TOTAL_WINS : 'TOTAL WINS',
    WIN_UP_TO : 'WIN UP TO',
    BALANCE : 'BALANCE',
    TOTAL_COST : 'TOTAL COST'
}

const config  = {
    height : 12,
    hasWinUpToPanel : true
}

let infoBar = new window['ngt-balance-info-bar'].default(config, texts);
infoBar.attach('root')


function createControl(id, TEXTS = [], value = 0, onTextChangeCb, onValueChangeCb, onCheckboxChangeCb) {

    let texts = TEXTS instanceof Array ? TEXTS : [TEXTS];

    let _html = document.getElementById(id);

    let _text = _html.getElementsByClassName('controls-item__inputs__text')[0];
    let _value = _html.getElementsByClassName('controls-item__inputs__value')[0];
    let _range = _html.getElementsByClassName('controls-item__inputs__range')[0];
    let _checkbox = _html.getElementsByClassName('controls-item__inputs__check')[0];

    function setText(text) {
        if (_text){
            _text.value = text
        }


        if (_checkbox){
            if (_checkbox.checked) {
                texts[0] = text
            } else {
                texts[1] = text;
            }
        }

    }


    function setValue(val) {
        _value.value = val;
        _range.value = val;
    }

    if (_text){
        _text.onchange = function(e){
            let checked = _checkbox && _checkbox.checked;
            onTextChangeCb(e.target.value, checked);

            if (_checkbox){
                if (_checkbox.checked) {
                    texts[0] = e.target.value
                } else {
                    texts[1] = e.target.value;
                }
            }
        }
    }


    _value.onchange = onValueChange;
    _range.onchange  = onValueChange;
    _range.oninput  = onValueChange;

    var values = {};
    if (_checkbox){
        _checkbox.onchange = onCheckBoxChanged;
        values.checked = value;
        values.unchecked = value;
    }


    function onValueChange(e) {
        setValue(e.target.value);
        onValueChangeCb(e.target.value);

        if (_checkbox){
            if (_checkbox.checked) {
                values.checked = e.target.value
            } else {
                values.unchecked = e.target.value
            }

            onValueChangeCb(e.target.value, _checkbox.checked);
        } else {
            onValueChangeCb(e.target.value, false);
        }
    }

    function onCheckBoxChanged(e){
        let checked = e.target.checked
        onCheckboxChangeCb(checked);
        let text = checked ? texts[0] : texts[1];
        let value = checked ? values.checked : values.unchecked;

        setText(text);
        setValue(value);

        onValueChangeCb(value, checked);
        onTextChangeCb(text, checked);
    }


    setText(texts[0]);
    setValue(value);

    onValueChangeCb(value, true)
}


function onBalanceTitleChanged(title) {
    console.log('onBalanceTitleChanged', title);
    infoBar.setBalanceTitle(title);
}

function onBalanceChanged(value) {
    console.log('onBalanceChanged', value);
    infoBar.updateBalance(value);

}


function onWinTitleChanged(title, isWinUp) {
    console.log('onWinTitleChanged', title);
    isWinUp ? infoBar.setWinUpToTitle(title) : infoBar.setTotalWinTitle(title);
}

function onWinChanged(value, isWinUp) {
    console.log('onWinChanged', value);
    isWinUp ? infoBar.updateWinUpTo(value) : infoBar.updateTotalWin(value);
}


function onWinCostChanged(title) {
    console.log('onWinCostChanged', title);
    infoBar.setTotalCostTitle(title);
}

function onCostChanged(value) {
    console.log('onCostChanged', value);
    infoBar.updateTotalCost(value);
}


function onWinUpWinSwitch(checked){
    if (checked) infoBar.showWinUpTo()
    else {
        infoBar.showWin();
    }
}

function onBarHeightChanged(value){
    infoBar.setHeight(value);
}

function onBarVisibilityChanged(checked){
    if (checked) {
        infoBar.show();
    } else {
        infoBar.hide();
    }
}

function onDebugModeChanged(checked){
    infoBar.debug(checked);
}

createControl('balance-item', texts.BALANCE, 100000, onBalanceTitleChanged, onBalanceChanged);
createControl('win-item', [texts.WIN_UP_TO, texts.TOTAL_WINS], 100000, onWinTitleChanged, onWinChanged, onWinUpWinSwitch);
createControl('total-cost-item', texts.TOTAL_COST, 100000, onWinCostChanged, onCostChanged);
createControl('height-item', null, 10, ()=>{}, onBarHeightChanged);
//

document.getElementById('show_chkbx').onchange = e => {
    onBarVisibilityChanged(e.target.checked);
}
document.getElementById('debug_chkbx').onchange = e => {
    onDebugModeChanged(e.target.checked);
}

