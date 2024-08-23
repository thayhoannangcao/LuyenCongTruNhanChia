var num1Input = document.getElementById('num1');
var num2Input = document.getElementById('num2');
var num3Input = document.getElementById('num3');
var operatorSelect = document.getElementById('operator');
// var calculationDiv = document.getElementById('calculation');
var divCal = document.getElementById('divCal');
// var resultInput = document.getElementById('result');
var divStart = document.getElementById('start');
var numberGen1, numberGen2, chooseOperator, numOfCalDivision;

function generateRandomNumber(digits) {
    var min = Math.pow(10, digits - 1);
    var max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomNumberDivide(digits, num2) {
    var min = Math.pow(10, digits - 1);
    var max = Math.pow(10, digits) - 1;
    var minDivided = min / num2;
    var maxDivided = max / num2;

    var randomDivided = Math.random() * (maxDivided - minDivided) + minDivided;
    var result = Math.floor(randomDivided);

    // console.log("Min: " + minDivided);
    // console.log("Max: " + maxDivided);
    // console.log("Random: " + randomDivided);
    // console.log("Result: " + result);
    // console.log("Num2: " + num2);

    if (result === 0) return 1;

    return result;
}

function quanNum(num) {
    var num = parseInt(num);

    if (num == 0) {
        return 1;
    }

    var quan = 0;

    while (num > 0) {
        num = Math.floor(num / 10);
        quan += 1;
    }

    return quan;
}

function isArrayEmpty(arr) {
    return arr.every(element => element === undefined || element === null || element === '');
}

function checkAnswerDivision(num1, num2) {
    var arrAnwer = returnArrLineAnwerDivision(num1, num2);
    var answerDivision = num1 / num2;
    var quanAnswerDivision = quanNum(answerDivision);
    var quanNum1 = quanNum(num1);
    var arrInp = [];

    // console.log(numOfCalDivision);
    arrInp[0] = [];
    for (let i = 0; i < quanAnswerDivision; i++) {
        if (document.getElementById('inp_division_line_' + 0 + '_' + i).value != undefined) {
            arrInp[0].push(document.getElementById('inp_division_line_' + 0 + '_' + i).value);
        }
    }

    for (let i = 1; i <= numOfCalDivision; i++) {
        arrInp[i] = [];
        for (let j = 0; j < quanNum1; j++) {
            if (document.getElementById('inp_division_line_' + i + '_' + j).value != undefined) {
                arrInp[i].push(document.getElementById('inp_division_line_' + i + '_' + j).value);
            }
        }
    }

    console.log(arrInp);
    console.log(arrAnwer);

    // console.log(arrInp.length);
    // console.log(arrAnwer.length);

    if (JSON.stringify(arrInp[0]) != JSON.stringify(arrAnwer[0]))
        return 0;

    for (let i = 1; i <= numOfCalDivision; i++) {
        if (isArrayEmpty(arrInp[i])) {
            continue;
        }
        for (let j = 0; j < arrAnwer.length; j++) {
            if (JSON.stringify(arrInp[i]) == JSON.stringify(arrAnwer[j])) {
                // console.log(arrInp[i]);
                // console.log(arrAnwer[j]);
                break
            }

            if (j == arrAnwer.length - 1) {
                return 0;
            }
        }
    }

    return 1;
}

function checkAnswerMultiply(num1, num2) {
    var quanNum1 = quanNum(num1);
    var quanNum2 = quanNum(num2);
    var resultMulti = num1 * num2;
    var quanResultMulti = quanNum(resultMulti);
    var tichrieng = [];

    // Tính giá trị của từng tích riêng
    for (let i = 0; i < quanNum2; i++) {
        var tich = num1 * Math.floor(num2 / Math.pow(10, quanNum2 - i - 1));
        tichrieng.push(tich);
        num2 = num2 % Math.pow(10, quanNum2 - i - 1);
    }

    tichrieng.reverse();
    tichrieng.push(resultMulti);

    var arrTichRieng = [];
    for (let i = 0; i <= quanNum2; i++) {
        arrTichRieng.push(i + 1);
        arrTichRieng[i + 1] = [];

        let numberArr = Array.from(String(tichrieng[i]), Number);
        numberArr.reverse();
        // console.log(numberArr);
        let arr = new Array(quanResultMulti).fill('');

        for (let j = 1; j <= quanResultMulti; j++) {
            if (numberArr[j - 1] != undefined) {
                // console.log(j-1);
                // console.log(numberArr[j-1]);
                if (i != quanNum2) {
                    arr[quanResultMulti - i - j] = String(numberArr[j - 1]);
                } else {
                    arr[j - 1] = String(numberArr[j - 1]);
                }
            }

        }

        arrTichRieng[i + 1] = arr;

        if (i == quanNum2) {
            arrTichRieng[i + 1].reverse();
        }

        if (quanNum2 == 1) {
            // arrTichRieng[i + 1].reverse
            break;
        }
    }
    // console.log(arrTichRieng);

    var arrTichRiengInp = [];
    if (quanNum2 > 1) {
        for (let i = 1; i <= quanNum2 + 1; i++) {
            arrTichRiengInp.push(i);
            arrTichRiengInp[i] = [];
            for (let j = quanResultMulti; j >= 1; j--) {
                // console.log(document.getElementById('inp_line_' + i + '_' + j).value);
                arrTichRiengInp[i].push(document.getElementById('inp_line_' + i + '_' + j).value);
            }
        }
    } else {
        for (let i = 1; i <= quanNum2; i++) {
            arrTichRiengInp.push(i);
            arrTichRiengInp[i] = [];
            for (let j = 1; j <= quanResultMulti; j++) {
                // console.log(document.getElementById('inp_line_' + i + '_' + j).value);
                arrTichRiengInp[i].push(document.getElementById('inp_line_' + i + '_' + j).value);
            }
            arrTichRiengInp[i].reverse();
        }
    }

    // console.log(arrTichRieng);
    // console.log(arrTichRiengInp);

    for (let i = 1; i <= quanNum2 + 1; i++) {
        if (JSON.stringify(arrTichRieng[i]) != JSON.stringify(arrTichRiengInp[i])) {
            return 0;
        }
    }
    return 1;
}

function calculationOperatorMultiply(num1, num2, operator) {
    var quanNum1 = quanNum(num1);
    var quanNum2 = quanNum(num2);
    var resultMulti = num1 * num2;
    var quanResultMulti = quanNum(resultMulti);
    var number1 = num1;
    var number2 = num2;

    // Tạo phần tử div bao ngoài
    const divTableMulti = document.createElement('div');
    divTableMulti.className = 'divTableMulti';

    // Tạo phần tử table
    const table = document.createElement('table');
    // table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    divTableMulti.appendChild(table);

    // Tạo hàng đầu tiên
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    th.setAttribute('rowspan', 2);
    th.textContent = 'x';
    tr.appendChild(th);

    for (let i = 0; i < quanResultMulti - quanNum1; i++) {
        th = document.createElement('th');
        tr.appendChild(th);
    }

    for (let i = 0; i < quanNum1; i++) {
        th = document.createElement('th');
        th.textContent = Math.floor(num1 / Math.pow(10, quanNum1 - i - 1));
        num1 = num1 % Math.pow(10, quanNum1 - i - 1);
        tr.appendChild(th);
    }

    table.appendChild(tr);

    // Tạo hàng thứ hai với class border_bot_multi
    tr = document.createElement('tr');
    tr.className = 'border_bot_multi';

    for (let i = 0; i < quanResultMulti - quanNum2; i++) {
        th = document.createElement('th');
        if (quanNum2 > 1) {
            th.style.borderBottom = '2px solid black';
        }
        tr.appendChild(th);
    }

    for (let i = 0; i < quanNum2; i++) {
        th = document.createElement('th');
        th.textContent = Math.floor(num2 / Math.pow(10, quanNum2 - i - 1));
        num2 = num2 % Math.pow(10, quanNum2 - i - 1);
        if (quanNum2 > 1) {
            th.style.borderBottom = '2px solid black';
        }
        tr.appendChild(th);
    }

    table.appendChild(tr);

    // Tạo hàng trống với height 5px
    tr = document.createElement('tr');
    let td = document.createElement('td');
    td.style.height = '5px';
    tr.appendChild(td);
    table.appendChild(tr);


    // ***************************************************************************************
    // ***************************************************************************************
    // ***************************************************************************************
    // Tích riêng
    var idInputTichRieng = 1;
    var quanNum2Copy = quanNum2;
    if (quanNum2Copy > 1) {
        // Tạo hàng với dấu cộng và các ô input
        tr = document.createElement('tr');
        td = document.createElement('td');
        td.setAttribute('rowspan', quanNum2Copy * 2 - 1);
        td.textContent = '+';
        tr.appendChild(td);

        for (let i = 0; i < quanResultMulti; i++) {
            td = document.createElement('td');
            const input = document.createElement('input');
            input.className = 'inp_on_table';
            input.type = 'text';
            input.id = 'inp_line_' + idInputTichRieng + '_' + (quanResultMulti - i);
            input.maxLength = 1;
            input.autocomplete = 'off';
            td.appendChild(input);
            tr.appendChild(td);
        }
        idInputTichRieng += 1;
        table.appendChild(tr);

        while (quanNum2Copy > 1) {
            // Tạo hàng trống thứ hai với height 5px
            tr = document.createElement('tr');
            td = document.createElement('td');
            td.style.height = '5px';
            tr.appendChild(td);
            table.appendChild(tr);

            // Tạo hàng với các ô input khác
            tr = document.createElement('tr');

            for (let i = 0; i < quanResultMulti; i++) {
                td = document.createElement('td');
                const input = document.createElement('input');
                input.className = 'inp_on_table';
                input.type = 'text';
                input.id = 'inp_line_' + idInputTichRieng + '_' + (quanResultMulti - i);
                input.maxLength = 1;
                input.autocomplete = 'off';
                td.appendChild(input);
                tr.appendChild(td);
            }
            idInputTichRieng += 1;
            table.appendChild(tr);
            quanNum2Copy -= 1;
        }
    }

    // ***************************************************************************************
    // ***************************************************************************************
    // ***************************************************************************************
    // Kết quả
    // Tạo hàng với các ô có class td_border_bot_multi
    tr = document.createElement('tr');
    td = document.createElement('td');
    td.setAttribute('rowspan', 3);
    tr.appendChild(td);

    for (let i = 0; i < quanResultMulti; i++) {
        td = document.createElement('td');
        td.className = 'td_border_bot_multi';
        tr.appendChild(td);
    }

    table.appendChild(tr);

    // Tạo hàng trống cuối cùng với height 5px
    tr = document.createElement('tr');
    td = document.createElement('td');
    td.style.height = '5px';
    tr.appendChild(td);
    table.appendChild(tr);

    // Tạo hàng với các ô input khác và class inp_on_table1
    tr = document.createElement('tr');

    for (let i = 0; i < quanResultMulti; i++) {
        td = document.createElement('td');
        const input = document.createElement('input');
        input.className = 'inp_on_table1';
        input.type = 'text';
        input.id = 'inp_line_' + idInputTichRieng + '_' + (quanResultMulti - i);
        input.maxLength = 1;
        input.autocomplete = 'off';
        td.appendChild(input);
        tr.appendChild(td);
    }

    table.appendChild(tr);

    document.getElementById("divTableMulti").innerHTML = '';
    document.getElementById("divTableMulti").appendChild(divTableMulti);

    function handleInput(event) {
        var thisId = event.target.id;
        var numEnd = parseInt(thisId.charAt(thisId.length - 1));

        if (thisId.includes('inp_line_')) {
            if (event.inputType !== 'deleteContentBackward' && event.inputType !== 'deleteContentForward') {
                if (numEnd !== quanResultMulti) {
                    document.getElementById(thisId.slice(0, -1) + (numEnd + 1)).focus();
                }
            }
        }
    }

    // console.log(quanNum2);

    if (quanNum2 > 1) {
        document.addEventListener('input', handleInput);
        document.getElementById("inp_line_1_1").focus();
    } else {
        document.removeEventListener('input', handleInput);
        document.getElementById("inp_line_1_" + quanResultMulti).focus();
    }

    document.addEventListener('keydown', function (event) {
        var thisEventId = event.target.id;

        if (thisEventId.length >= 12) { // Đảm bảo rằng chuỗi ID có ít nhất 12 ký tự
            var newEventId;
            var newElement;

            switch (event.code) {
                case 'ArrowDown':
                    var newDownChar = String(parseInt(thisEventId[9]) + 1);
                    newEventId = thisEventId.substring(0, 9) + newDownChar + thisEventId.substring(10);
                    break;

                case 'ArrowUp':
                    var newUpChar = String(Math.max(0, parseInt(thisEventId[9]) - 1)); // Đảm bảo ký tự không âm
                    newEventId = thisEventId.substring(0, 9) + newUpChar + thisEventId.substring(10);
                    break;

                case 'ArrowLeft':
                    var newLeftChar = String(parseInt(thisEventId[11]) + 1);
                    newEventId = thisEventId.substring(0, 11) + newLeftChar + thisEventId.substring(12);
                    break;

                case 'ArrowRight':
                    var newRightChar = String(Math.max(0, parseInt(thisEventId[11]) - 1)); // Đảm bảo ký tự không âm
                    newEventId = thisEventId.substring(0, 11) + newRightChar + thisEventId.substring(12);
                    break;

                default:
                    return; // Không xử lý các phím khác
            }

            newElement = document.getElementById(newEventId);
            if (newElement) {
                newElement.focus(); // Chuyển tiêu điểm đến phần tử mới
            }
        }
    });
}

function checkNum1Division(num1, num2) {
    while (num1 / num2 >= 10) {
        num1 = Math.floor(num1 / 10);
    }

    return num1;
}

// Chia, Nhân, Trừ, Hạ xuống ngay trừ, tiếp

function returnArrLineAnwerDivision(num1, num2) {
    // 346
    var arrLineAnwer = [];
    arrLineAnwer[0] = [];
    var answerDivision = num1 / num2;
    var quanAnswerDivision = quanNum(answerDivision);
    var quanNum1 = quanNum(num1);

    var checkNum1 = checkNum1Division(num1, num2);
    var arrCheckNum1 = Array.from(String(checkNum1), Number);
    var arrNum1 = Array.from(String(num1), Number);

    var indexCheck = arrCheckNum1.length;

    // console.log(num1)

    // console.log(arrCheckNum1);
    // console.log(arrNum1);
    var i = 1;
    while (true) {
        var thuong = Math.floor(checkNum1 / num2);
        // console.log(checkNum1);
        arrLineAnwer[0].push(String(thuong));

        var arrLine = new Array(quanNum1).fill('');
        var tich1So = thuong * num2;
        var arrTich1So = Array.from(String(tich1So));
        var quanTich1So = quanNum(tich1So);

        // console.log(arrTich1So);

        var copyIndexCheck = indexCheck;
        for (let j = 0; j < quanTich1So; j++) {
            if (arrTich1So[quanTich1So - j - 1] != undefined) {
                arrLine[copyIndexCheck - 1] = arrTich1So[quanTich1So - j - 1];
                copyIndexCheck -= 1;
            }
        }

        arrLineAnwer[i] = [];
        arrLineAnwer[i] = arrLine;

        // console.log(quanTich1So);
        // console.log(arrTich1So);
        // console.log(arrLine);
        // console.log(checkNum1);

        indexCheck += 1;
        i += 1;
        var arrLine = new Array(quanNum1).fill('');

        checkNum1 = checkNum1 - thuong * num2;

        if (checkNum1 == 0) {
            var arrCheckNum1 = Array.from(String(checkNum1));
            arrCheckNum1.push(String(arrNum1[indexCheck - 1]));
            var quanCheckNum1 = 2;
            checkNum1 = checkNum1 * 10 + arrNum1[indexCheck - 1];
        } else {
            checkNum1 = checkNum1 * 10 + arrNum1[indexCheck - 1];
            var arrCheckNum1 = Array.from(String(checkNum1));
            var quanCheckNum1 = quanNum(checkNum1);

        }

        // console.log(arrCheckNum1);

        if (indexCheck > arrNum1.length) {
            var arrLine = new Array(quanNum1).fill('');
            arrLine[quanNum1 - 1] = '0';
            arrLineAnwer[i] = arrLine;
            break;
        }

        // checkNum1 = checkNum1 - thuong * num2;
        // // console.log(checkNum1);

        // checkNum1 = checkNum1 * 10 + arrNum1[indexCheck - 1];
        // // console.log(checkNum1);

        // if (indexCheck > arrNum1.length) {
        //     var arrLine = new Array(quanNum1).fill('');
        //     arrLine[quanNum1 - 1] = '0';
        //     arrLineAnwer[i] = arrLine;
        //     break;
        // }

        // var arrCheckNum1 = Array.from(String(checkNum1));
        // var quanCheckNum1 = quanNum(checkNum1);

        var copyIndexCheck = indexCheck;
        for (let j = 0; j < quanCheckNum1; j++) {
            if (arrCheckNum1[quanCheckNum1 - j - 1] != undefined) {
                arrLine[copyIndexCheck - 1] = arrCheckNum1[quanCheckNum1 - j - 1];
                copyIndexCheck -= 1;
            }
        }

        arrLineAnwer[i] = [];
        arrLineAnwer[i] = arrLine;

        // console.log(thuong);
        i += 1;
    }

    // console.log(arrLineAnwer);
    return arrLineAnwer;
}

function calculationOperatorDivision(num1, num2) {
    numberGen1 = num1;
    numberGen2 = num2;

    numOfCalDivision = 0;
    var quanNum1 = quanNum(num1);
    var quanNum2 = quanNum(num2);
    var resultDivision = num1 / num2;
    var quanResultDivision = quanNum(resultDivision);
    var number1 = num1;
    var number2 = num2;

    // Tạo div chính chứa bảng
    const divTableMulti = document.createElement('div');
    divTableMulti.className = 'divTableMulti';

    // Tạo phần tử bảng
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    divTableMulti.appendChild(table);

    let tr = document.createElement('tr');


    for (let i = 0; i < quanNum1; i++) {
        let th = document.createElement('th');
        th.textContent = Math.floor(num1 / Math.pow(10, quanNum1 - i - 1));
        num1 = num1 % Math.pow(10, quanNum1 - i - 1);
        if (i == 0) {
            th.id = 'width_exp';
        }
        tr.appendChild(th);
    }

    th = document.createElement('th');
    th.className = 'td_border_right_multi';
    th.style.width = '10px';
    tr.appendChild(th);

    th = document.createElement('th');
    th.className = 'border_bot_division';
    th.style.width = '10px';
    tr.appendChild(th);

    for (let i = 0; i < quanNum2; i++) {
        let th = document.createElement('th');
        th.className = 'border_bot_division';
        th.textContent = Math.floor(num2 / Math.pow(10, quanNum2 - i - 1));
        num2 = num2 % Math.pow(10, quanNum2 - i - 1);
        tr.appendChild(th);
    }

    table.appendChild(tr);

    // Tạo hàng thứ hai với các thẻ td
    tr = document.createElement('tr');
    for (let i = 0; i < quanNum1; i++) {
        const td = document.createElement('td');
        td.style.height = '5px';
        tr.appendChild(td);
    }

    let td = document.createElement('td');
    td.className = 'td_border_right_multi';
    td.style.height = '5px';
    tr.appendChild(td);

    table.appendChild(tr);

    // Tạo hàng thứ ba với các ô input
    tr = document.createElement('tr');
    for (let i = 0; i < quanNum1; i++) {
        td = document.createElement('td');
        const input = document.createElement('input');
        input.className = 'inp_on_table';
        input.id = 'inp_division_line_' + 1 + '_' + (i);
        input.type = 'text';
        input.maxLength = 1;
        input.autocomplete = 'off';
        td.appendChild(input);
        tr.appendChild(td);
    }
    numOfCalDivision += 1;

    th = document.createElement('th');
    th.className = 'td_border_right_multi';
    th.style.width = '10px';
    th.rowSpan = 2 * quanNum1 + 1;
    tr.appendChild(th);

    th = document.createElement('th');
    th.style.width = '10px';
    th.rowSpan = 2 * quanNum1 + 1;
    tr.appendChild(th);

    var idDivision = 2;
    for (let i = 0; i < quanNum1; i++) {
        td = document.createElement('td');
        if (i >= quanResultDivision) {
            // console.log(document.getElementById("width_exp").offsetWidth);
            td.style.width = 46 + 'px';
        } else {
            const input = document.createElement('input');
            input.className = 'inp_on_table';
            input.id = 'inp_division_line_' + 0 + '_' + (i);
            input.type = 'text';
            input.maxLength = 1;
            input.autocomplete = 'off';
            td.appendChild(input);
        }

        tr.appendChild(td);
    }

    table.appendChild(tr);

    // Tạo hàng trống với height 5px
    tr = document.createElement('tr');
    td = document.createElement('td');
    td.style.height = '5px';
    tr.appendChild(td);
    table.appendChild(tr);

    for (let k = 0; k < quanResultDivision - 1; k++) {
        // Tạo các hàng tiếp theo với các ô input
        tr = document.createElement('tr');
        for (let j = 0; j < quanNum1; j++) {
            td = document.createElement('td');
            const input = document.createElement('input');
            input.className = 'inp_on_table';
            input.id = 'inp_division_line_' + idDivision + '_' + (j);
            input.type = 'text';
            input.maxLength = 1;
            input.autocomplete = 'off';
            td.appendChild(input);
            tr.appendChild(td);
        }
        numOfCalDivision += 1;
        table.appendChild(tr);

        tr = document.createElement('tr');
        td = document.createElement('td');
        td.style.height = '5px';
        tr.appendChild(td);
        table.appendChild(tr);
        idDivision += 1;
    }

    // Tạo hàng cuối với nút bấm
    tr = document.createElement('tr');
    tr.id = 'tr_addRowTable';
    for (let i = 0; i < quanNum1 - 2; i++) {
        td = document.createElement('td');
        tr.appendChild(td);
    }

    td = document.createElement('td');
    td.colSpan = 2;
    const button = document.createElement('button');
    button.id = 'addRowTable';
    button.textContent = 'Thêm bước tính';
    td.appendChild(button);
    tr.appendChild(td);

    table.appendChild(tr);

    // Thêm bảng vào phần tử div với id="divTableMulti"

    document.getElementById("divTableMulti").innerHTML = '';
    document.getElementById('divTableMulti').appendChild(divTableMulti);

    document.getElementById('addRowTable').addEventListener('click', function () {
        var trAddRow = document.getElementById('tr_addRowTable');

        var newRow = document.createElement('tr');
        for (let i = 0; i < quanNum1; i++) {
            var td = document.createElement('td');
            var input = document.createElement('input');
            input.className = 'inp_on_table';
            input.id = 'inp_division_line_' + idDivision + '_' + i;
            input.type = 'text';
            input.maxLength = 1;
            input.autocomplete = 'off';
            td.appendChild(input);
            newRow.appendChild(td);
            
        }
        trAddRow.parentNode.insertBefore(newRow, trAddRow);

        var newRowHeight = document.createElement('tr');
        newRowHeight.innerHTML = `
            <td style="height: 5px;"></td>
        `;

        trAddRow.parentNode.insertBefore(newRowHeight, trAddRow);
        idDivision += 1;
    });

    // checkAnswerDivision(number1, number2);

    function handleInputDivision(event) {
        var thisId = event.target.id;
        var numEnd = parseInt(thisId.charAt(thisId.length - 1));

        if (thisId.includes('inp_division_line_')) {
            if (event.inputType !== 'deleteContentBackward' && event.inputType !== 'deleteContentForward') {
                if (numEnd !== quanNum1) {
                    document.getElementById(thisId.slice(0, -1) + (numEnd - 1)).focus();
                }
            }
        }
    }

    document.addEventListener('input', handleInputDivision);
    document.getElementById("inp_division_line_0_0").focus();

    document.addEventListener('keydown', function (event) {
        var thisEventId = event.target.id;

        if (thisEventId.length >= 18) { // Đảm bảo rằng chuỗi ID có ít nhất 12 ký tự
            var newEventId;
            var newElement;

            switch (event.code) {
                case 'ArrowDown':
                    var newDownChar = String(parseInt(thisEventId[18]) + 1);
                    newEventId = thisEventId.substring(0, 18) + newDownChar + thisEventId.substring(19);
                    break;

                case 'ArrowUp':
                    var newUpChar = String(Math.max(0, parseInt(thisEventId[18]) - 1)); // Đảm bảo ký tự không âm
                    newEventId = thisEventId.substring(0, 18) + newUpChar + thisEventId.substring(19);
                    break;

                case 'ArrowLeft':
                    var newLeftChar = String(parseInt(thisEventId[20]) - 1);
                    newEventId = thisEventId.substring(0, 20) + newLeftChar + thisEventId.substring(21);
                    break;

                case 'ArrowRight':
                    var newRightChar = String(Math.max(0, parseInt(thisEventId[20]) + 1)); // Đảm bảo ký tự không âm
                    newEventId = thisEventId.substring(0, 20) + newRightChar + thisEventId.substring(21);
                    break;

                default:
                    return; // Không xử lý các phím khác
            }

            newElement = document.getElementById(newEventId);
            if (newElement) {
                newElement.focus(); // Chuyển tiêu điểm đến phần tử mới
            }
        }
    });

}

function calculationOperatorNormal(num1, num2, operator) {
    var quanNum1 = quanNum(num1);
    var quanNum2 = quanNum(num2);
    // Tạo phần tử div bao ngoài
    const divTableMulti = document.createElement('div');
    divTableMulti.className = 'divTableMulti';
    divTableMulti.style.marginTop = "5%";

    // Tạo phần tử table
    const table = document.createElement('table');
    // table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.className = 'table_normal';
    divTableMulti.appendChild(table);

    // Tạo hàng đầu tiên
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    th.setAttribute('rowspan', 2);
    th.textContent = operator;
    tr.appendChild(th);

    th = document.createElement('th');
    th.textContent = num1;


    tr.appendChild(th);

    table.appendChild(tr);

    // Tạo hàng thứ hai với class border_bot_multi
    tr = document.createElement('tr');
    tr.className = 'border_bot_multi';


    th = document.createElement('th');
    th.textContent = num2;
    th.style.borderBottom = '2px solid black';

    tr.appendChild(th);

    table.appendChild(tr);

    // Tạo hàng trống với height 5px
    tr = document.createElement('tr');
    let td = document.createElement('td');
    td.style.height = '5px';

    tr.appendChild(td);
    table.appendChild(tr);

    // document.getElementById("divTableMulti").innerHTML = '';
    document.getElementById("divTableMulti").appendChild(divTableMulti);

    var doDaiGachChan = table.offsetWidth;

    // Kết quả
    tr = document.createElement('tr');
    tr.appendChild(td);
    td = document.createElement('td');

    const input = document.createElement('input');
    input.className = 'inp_on_table_normal';
    input.type = 'text';
    input.id = 'result';

    if (doDaiGachChan) {
        input.style.width = doDaiGachChan + 'px';
    } else {
        if (quanNum1 > quanNum2) {
            input.style.width = 52 + 20 * quanNum1 + 'px';
        } else {
            input.style.width = 52 + 20 * quanNum2 + 'px';
        }
    }

    td.appendChild(input);
    tr.appendChild(td);
    table.appendChild(tr);

    document.getElementById('result').focus();
}

function generateCalculation() {
    // calculationDiv.innerHTML = '';
    // divCal.style.width = "160px";
    // resultInput.style.width = "150px";
    var num1Digits = parseInt(num1Input.value);
    var num2Digits = parseInt(num2Input.value);

    var operator = operatorSelect.value;

    chooseOperator = operator;

    while (true) {
        var num1 = generateRandomNumber(num1Digits);
        var num2 = generateRandomNumber(num2Digits);

        if (operator == "*") {
            // document.getElementById("calcu").style.display = 'none';
            calculationOperatorMultiply(num1, num2, operator);
            numberGen1 = num1;
            numberGen2 = num2;
            return;
        } else {
            if (operator == "+") {
                if (num1Digits == 1 && num2Digits == 1) {
                    if (num1 + num2 <= 10) {
                        break;
                    } else continue
                }

                break;
            }

            if (operator == "-") {
                if (num1 > num2) {
                    break;
                }
            }

            if (operator == "/" && num2 === 1) {
                continue;
            }

            if (operator == "/") {
                var num = generateRandomNumberDivide(num1Digits, num2);
                while (num === 0) {
                    num = generateRandomNumberDivide(num1Digits, num2);
                }

                num1 = num2 * num;

                if (quanNum(num1) != num1Digits || num1 == num2)
                    continue;
                calculationOperatorDivision(num1, num2);
                // calculationOperatorDivision(7280, 8);
                return;
            }
        }
    }
    numberGen1 = num1;
    numberGen2 = num2;
    document.getElementById("divTableMulti").innerHTML = '';
    calculationOperatorNormal(num1, num2, operator);
    // document.getElementById("calcu").style.display = 'block';

}

document.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

function closeKiemtra() {
    document.getElementById('options').style.display = 'block';
    document.getElementById('scoreboardId').style.display = 'none';
    document.getElementById('start').style.display = 'none';
    document.getElementById('correct').innerText = 0;
    document.getElementById('incorrect').innerText = 0;
}

document.getElementById('setting').addEventListener('click', function () {
    closeKiemtra();
});

function showPopup(id) {
    var popup = document.getElementById(id);
    popup.style.display = "block";
    setTimeout(function () {
        popup.style.display = "none";
    }, 2000);
}

function checkAnswer() {
    if (chooseOperator == "+" || chooseOperator == "-") {
        var result = parseInt(document.getElementById('result').value);
        var correctAnswer = eval(numberGen1 + chooseOperator + numberGen2);

        if (result === correctAnswer) {
            showPopup("popup-correct");
            // console.log(numberGen1 + chooseOperator + numberGen2);
            // console.log("Correct answer: " + correctAnswer);
            // console.log("Your answer: " + result);
            incrementCorrectScore();
        } else {
            showPopup("popup-incorrect");
            // console.log(numberGen1 + chooseOperator + numberGen2);
            // console.log("Correct answer: " + correctAnswer);
            // console.log("Your answer: " + result);
            incrementIncorrectScore();
        }
    } else if (chooseOperator == "*") {
        // console.log(numberGen1);
        // console.log(numberGen2);
        var checkMulti = checkAnswerMultiply(numberGen1, numberGen2);

        if (checkMulti === 1) {
            showPopup("popup-correct");
            incrementCorrectScore();
        } else {
            showPopup("popup-incorrect");
            incrementIncorrectScore();
        }
    } else {
        var checkDivision = checkAnswerDivision(numberGen1, numberGen2);

        if (checkDivision === 1) {
            showPopup("popup-correct");
            incrementCorrectScore();
        } else {
            showPopup("popup-incorrect");
            incrementIncorrectScore();
        }
    }

    var num3Digits = document.getElementById('socau').innerText;
    var socau = parseInt(num3Digits.split('/')[0]);
    socau += 1;

    if (socau > parseInt(num3Digits.split('/')[1])) {
        alert("Kết thúc bài kiểm tra\nBạn được: " + parseInt(document.getElementById('correct').innerText) + "/" + parseInt(num3Digits.split('/')[1]) + " điểm!");
        closeKiemtra();
    } else {
        document.getElementById('socau').innerText = socau + "/" + num3Digits.split('/')[1];
        generateCalculation();
        // document.getElementById('result').value = '';
    }
}

function incrementCorrectScore() {
    var score = parseInt(document.getElementById('correct').innerText);
    document.getElementById('correct').innerText = score + 1;
}

function incrementIncorrectScore() {
    var score = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').innerText = score + 1;
}

function start() {
    var num1Digits = parseInt(num1Input.value);
    var num2Digits = parseInt(num2Input.value);
    var num3Digits = parseInt(num3Input.value);
    var operator = operatorSelect.value;

    if ((num1Digits < 1 || num1Digits > 9) || (num2Digits < 1 || num2Digits > 9)) {
        alert("Vui lòng nhập số chữ số từ 1 đến 9");
        return;
    }

    if (num3Digits < 1 || num3Digits > 50) {
        alert("Vui lòng nhập số câu hỏi từ 1 đến 50");
        return;
    }

    if (operator == "-" && num1Digits < num2Digits) {
        alert("Phép trừ bạn cài đặt không hợp lệ\nVui lòng chọn số chữ số của số thứ nhất lớn hơn hoặc bằng số chữ số của số thứ hai");
        return;
    }

    if (operator == "/" && num1Digits < num2Digits) {
        alert("Phép chia bạn cài đặt không hợp lệ\nVui lòng chọn số chữ số của số thứ nhất lớn hơn hoặc bằng số chữ số của số thứ hai");
        return;
    }

    generateCalculation();
    // if (document.getElementById('result').value)
    //     document.getElementById('result').value = '';
    document.getElementById('scoreboardId').style.display = 'block';
    document.getElementById('options').style.display = 'none';
    document.getElementById('start').style.display = 'block';
    document.getElementById('socau').innerText = "1/" + num3Digits;
}

//Test
// generateCalculation();



