export function quanNum(num: number) {
  var num = parseInt(num.toString());

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

export function calculationOperatorAddAndSub(
  num1: number,
  num2: number,
  operator: string
) {
  var quanNum1 = quanNum(num1);
  var quanNum2 = quanNum(num2);
  const divTableMulti = document.createElement('div');
  divTableMulti.className = 'divTableMulti';
  divTableMulti.style.marginTop = '5%';

  const table = document.createElement('table');
  table.style.borderCollapse = 'collapse';
  table.className = 'table_normal';
  divTableMulti.appendChild(table);

  let tr = document.createElement('tr');
  let th = document.createElement('th');
  th.setAttribute('rowspan', '2');
  th.textContent = operator;
  tr.appendChild(th);

  th = document.createElement('th');
  th.textContent = num1.toString();

  tr.appendChild(th);

  table.appendChild(tr);

  tr = document.createElement('tr');
  tr.className = 'border_bot_multi';

  th = document.createElement('th');
  th.textContent = num2.toString();
  th.style.borderBottom = '2px solid black';

  tr.appendChild(th);

  table.appendChild(tr);

  tr = document.createElement('tr');
  let td = document.createElement('td');
  td.style.height = '5px';

  tr.appendChild(td);
  table.appendChild(tr);

  document.getElementById('divTableMulti')!.innerHTML = '';
  document.getElementById('divTableMulti')!.appendChild(divTableMulti);

  var doDaiGachChan = table.offsetWidth;

  tr = document.createElement('tr');
  tr.appendChild(td);
  td = document.createElement('td');

  const input = document.createElement('input');
  input.className = 'inp_on_table_normal';
  input.type = 'text';
  input.id = 'result';
  input.dir = 'rtl';

  let original = '';

  input.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;

    const prevReversed = original.split('').reverse().join('');
    const newChar = target.value.replace(prevReversed, '');

    if (/^\d$/.test(newChar)) {
      original += newChar;
    }

    target.value = original.split('').reverse().join('');
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
      original = original.slice(0, -1);

      input.value = original.split('').reverse().join('');

      e.preventDefault();
    }
  });

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

  document.getElementById('result')!.focus();
}

export function checkAnswerMultiply(num1: number, num2: number) {
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
      (arrTichRieng[i + 1] as string[]).reverse();
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
        (arrTichRiengInp[i] as string[]).push(
          (
            document.getElementById(
              'inp_line_' + i + '_' + j
            ) as HTMLInputElement
          ).value
        );
      }
    }
  } else {
    for (let i = 1; i <= quanNum2; i++) {
      arrTichRiengInp.push(i);
      arrTichRiengInp[i] = [];
      for (let j = 1; j <= quanResultMulti; j++) {
        // console.log(document.getElementById('inp_line_' + i + '_' + j).value);
        (arrTichRiengInp[i] as string[]).push(
          (
            document.getElementById(
              'inp_line_' + i + '_' + j
            ) as HTMLInputElement
          ).value
        );
      }
      (arrTichRiengInp[i] as string[]).reverse();
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

export function calculationOperatorMultiply(num1: number, num2: number) {
  var quanNum1 = quanNum(num1);
  var quanNum2 = quanNum(num2);
  var resultMulti = num1 * num2;
  var quanResultMulti = quanNum(resultMulti);

  const divTableMulti = document.createElement('div');
  divTableMulti.className = 'divTableMulti';

  const table = document.createElement('table');
  table.style.borderCollapse = 'collapse';
  divTableMulti.appendChild(table);

  let tr = document.createElement('tr');
  let th = document.createElement('th');
  th.setAttribute('rowspan', '2');
  th.textContent = 'x';
  tr.appendChild(th);

  for (let i = 0; i < quanResultMulti - quanNum1; i++) {
    th = document.createElement('th');
    tr.appendChild(th);
  }

  for (let i = 0; i < quanNum1; i++) {
    th = document.createElement('th');
    th.textContent = Math.floor(
      num1 / Math.pow(10, quanNum1 - i - 1)
    ).toString();
    num1 = num1 % Math.pow(10, quanNum1 - i - 1);
    tr.appendChild(th);
  }

  table.appendChild(tr);

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
    th.textContent = Math.floor(
      num2 / Math.pow(10, quanNum2 - i - 1)
    ).toString();
    num2 = num2 % Math.pow(10, quanNum2 - i - 1);
    if (quanNum2 > 1) {
      th.style.borderBottom = '2px solid black';
    }
    tr.appendChild(th);
  }

  table.appendChild(tr);

  tr = document.createElement('tr');
  let td = document.createElement('td');
  td.style.height = '5px';
  tr.appendChild(td);
  table.appendChild(tr);

  var idInputTichRieng = 1;
  var quanNum2Copy = quanNum2;
  if (quanNum2Copy > 1) {
    tr = document.createElement('tr');
    td = document.createElement('td');
    td.setAttribute('rowspan', (quanNum2Copy * 2 - 1).toString());
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
      tr = document.createElement('tr');
      td = document.createElement('td');
      td.style.height = '5px';
      tr.appendChild(td);
      table.appendChild(tr);

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

  tr = document.createElement('tr');
  td = document.createElement('td');
  td.setAttribute('rowspan', '3');
  tr.appendChild(td);

  for (let i = 0; i < quanResultMulti; i++) {
    td = document.createElement('td');
    td.className = 'td_border_bot_multi';
    tr.appendChild(td);
  }

  table.appendChild(tr);

  tr = document.createElement('tr');
  td = document.createElement('td');
  td.style.height = '5px';
  tr.appendChild(td);
  table.appendChild(tr);

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

  document.getElementById('divTableMulti')!.innerHTML = '';
  document.getElementById('divTableMulti')?.appendChild(divTableMulti);

  function handleInput(event: any) {
    var thisId = event.target.id;
    var numEnd = parseInt(thisId.charAt(thisId.length - 1));

    if (thisId.includes('inp_line_')) {
      if (
        event.inputType !== 'deleteContentBackward' &&
        event.inputType !== 'deleteContentForward'
      ) {
        if (numEnd !== quanResultMulti) {
          document.getElementById(thisId.slice(0, -1) + (numEnd + 1))?.focus();
        }
      }
    }
  }

  if (quanNum2 > 1) {
    document.addEventListener('input', handleInput);
    document.getElementById('inp_line_1_1')?.focus();
  } else {
    document.removeEventListener('input', handleInput);
    document.getElementById('inp_line_1_' + quanResultMulti)?.focus();
  }

  document.addEventListener('keydown', function (event) {
    var thisEventId = (event.target as HTMLInputElement).id;

    if (thisEventId.length >= 12) {
      var newEventId;
      var newElement;

      switch (event.code) {
        case 'ArrowDown':
          var newDownChar = String(parseInt(thisEventId[9]) + 1);
          newEventId =
            thisEventId.substring(0, 9) +
            newDownChar +
            thisEventId.substring(10);
          break;

        case 'ArrowUp':
          var newUpChar = String(Math.max(0, parseInt(thisEventId[9]) - 1));
          newEventId =
            thisEventId.substring(0, 9) + newUpChar + thisEventId.substring(10);
          break;

        case 'ArrowLeft':
          var newLeftChar = String(parseInt(thisEventId[11]) + 1);
          newEventId =
            thisEventId.substring(0, 11) +
            newLeftChar +
            thisEventId.substring(12);
          break;

        case 'ArrowRight':
          var newRightChar = String(Math.max(0, parseInt(thisEventId[11]) - 1));
          newEventId =
            thisEventId.substring(0, 11) +
            newRightChar +
            thisEventId.substring(12);
          break;

        default:
          return;
      }

      newElement = document.getElementById(newEventId);
      if (newElement) {
        newElement.focus();
      }
    }
  });
}

export function calculationOperatorDivision(num1: number, num2: number) {
  var numOfCalDivision = 0;
  var quanNum1 = quanNum(num1);
  var quanNum2 = quanNum(num2);
  var resultDivision = num1 / num2;
  var quanResultDivision = quanNum(resultDivision);

  const divTableMulti = document.createElement('div');
  divTableMulti.className = 'divTableMulti';

  const table = document.createElement('table');
  table.style.width = '100%';
  table.style.borderCollapse = 'collapse';
  divTableMulti.appendChild(table);

  let tr = document.createElement('tr');

  for (let i = 0; i < quanNum1; i++) {
    let th = document.createElement('th');
    th.textContent = Math.floor(
      num1 / Math.pow(10, quanNum1 - i - 1)
    ).toString();
    num1 = num1 % Math.pow(10, quanNum1 - i - 1);
    if (i == 0) {
      th.id = 'width_exp';
    }
    tr.appendChild(th);
  }

  let th = document.createElement('th');
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
    th.textContent = Math.floor(
      num2 / Math.pow(10, quanNum2 - i - 1)
    ).toString();
    num2 = num2 % Math.pow(10, quanNum2 - i - 1);
    tr.appendChild(th);
  }

  table.appendChild(tr);

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

  tr = document.createElement('tr');
  for (let i = 0; i < quanNum1; i++) {
    td = document.createElement('td');
    const input = document.createElement('input');
    input.className = 'inp_on_table';
    input.id = 'inp_division_line_' + 1 + '_' + i;
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
      td.style.width = 0 + 'px';
    } else {
      const input = document.createElement('input');
      input.className = 'inp_on_table';
      input.id = 'inp_division_line_' + 0 + '_' + i;
      input.type = 'text';
      input.maxLength = 1;
      input.autocomplete = 'off';
      td.appendChild(input);
    }

    tr.appendChild(td);
  }

  table.appendChild(tr);

  tr = document.createElement('tr');
  td = document.createElement('td');
  td.style.height = '5px';
  tr.appendChild(td);
  table.appendChild(tr);

  for (let k = 0; k < quanResultDivision - 1; k++) {
    tr = document.createElement('tr');
    for (let j = 0; j < quanNum1; j++) {
      td = document.createElement('td');
      const input = document.createElement('input');
      input.className = 'inp_on_table';
      input.id = 'inp_division_line_' + idDivision + '_' + j;
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

  document.getElementById('divTableMulti')!.innerHTML = '';
  document.getElementById('divTableMulti')!.appendChild(divTableMulti);

  document
    .getElementById('addRowTable')!
    .addEventListener('click', function () {
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
      trAddRow!.parentNode!.insertBefore(newRow, trAddRow);

      var newRowHeight = document.createElement('tr');
      newRowHeight.innerHTML = `
            <td style="height: 5px;"></td>
        `;

      trAddRow!.parentNode!.insertBefore(newRowHeight, trAddRow);
      idDivision += 1;
    });

  function handleInputDivision(event: any) {
    var thisId = event.target.id;
    var numEnd = parseInt(thisId.charAt(thisId.length - 1));

    if (thisId.includes('inp_division_line_')) {
      if (
        event.inputType !== 'deleteContentBackward' &&
        event.inputType !== 'deleteContentForward'
      ) {
        if (numEnd !== quanNum1) {
          const prevEl = document.getElementById(
            thisId.slice(0, -1) + (numEnd - 1)
          );
          if (prevEl) {
            (prevEl as HTMLElement).focus();
          }
        }
      }
    }
  }

  document.addEventListener('input', handleInputDivision);
  document.getElementById('inp_division_line_0_0')!.focus();

  document.addEventListener('keydown', function (event) {
    var thisEventId = (event.target as HTMLInputElement).id;

    if (thisEventId.length >= 18) {
      var newEventId;
      var newElement;

      switch (event.code) {
        case 'ArrowDown':
          var newDownChar = String(parseInt(thisEventId[18]) + 1);
          newEventId =
            thisEventId.substring(0, 18) +
            newDownChar +
            thisEventId.substring(19);
          break;

        case 'ArrowUp':
          var newUpChar = String(Math.max(0, parseInt(thisEventId[18]) - 1));
          newEventId =
            thisEventId.substring(0, 18) +
            newUpChar +
            thisEventId.substring(19);
          break;

        case 'ArrowLeft':
          var newLeftChar = String(parseInt(thisEventId[20]) - 1);
          newEventId =
            thisEventId.substring(0, 20) +
            newLeftChar +
            thisEventId.substring(21);
          break;

        case 'ArrowRight':
          var newRightChar = String(Math.max(0, parseInt(thisEventId[20]) + 1));
          newEventId =
            thisEventId.substring(0, 20) +
            newRightChar +
            thisEventId.substring(21);
          break;

        default:
          return;
      }

      newElement = document.getElementById(newEventId);
      if (newElement) {
        newElement.focus();
      }
    }
  });
}
