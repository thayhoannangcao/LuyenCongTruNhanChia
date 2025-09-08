// function calculationOperatorMultiply(num1, num2, operator) {
//     var quanNum1 = quanNum(num1);
//     var quanNum2 = quanNum(num2);
//     var resultMulti = num1 * num2;
//     var quanResultMulti = quanNum(resultMulti);
//     var number1 = num1;
//     var number2 = num2;

//     // Tạo phần tử div bao ngoài
//     const divTableMulti = document.createElement('div');
//     divTableMulti.className = 'divTableMulti';

//     // Tạo phần tử table
//     const table = document.createElement('table');
//     // table.style.width = '100%';
//     table.style.borderCollapse = 'collapse';
//     divTableMulti.appendChild(table);

//     // Tạo hàng đầu tiên
//     let tr = document.createElement('tr');
//     let th = document.createElement('th');
//     th.setAttribute('rowspan', 2);
//     th.textContent = 'x';
//     tr.appendChild(th);

//     for (let i = 0; i < quanResultMulti - quanNum1; i++) {
//         th = document.createElement('th');
//         tr.appendChild(th);
//     }

//     for (let i = 0; i < quanNum1; i++) {
//         th = document.createElement('th');
//         th.textContent = Math.floor(num1 / Math.pow(10, quanNum1 - i - 1));
//         num1 = num1 % Math.pow(10, quanNum1 - i - 1);
//         tr.appendChild(th);
//     }

//     table.appendChild(tr);

//     // Tạo hàng thứ hai với class border_bot_multi
//     tr = document.createElement('tr');
//     tr.className = 'border_bot_multi';

//     for (let i = 0; i < quanResultMulti - quanNum2; i++) {
//         th = document.createElement('th');
//         if (quanNum2 > 1) {
//             th.style.borderBottom = '2px solid black';
//         }
//         tr.appendChild(th);
//     }

//     for (let i = 0; i < quanNum2; i++) {
//         th = document.createElement('th');
//         th.textContent = Math.floor(num2 / Math.pow(10, quanNum2 - i - 1));
//         num2 = num2 % Math.pow(10, quanNum2 - i - 1);
//         if (quanNum2 > 1) {
//             th.style.borderBottom = '2px solid black';
//         }
//         tr.appendChild(th);
//     }

//     table.appendChild(tr);

//     // Tạo hàng trống với height 5px
//     tr = document.createElement('tr');
//     let td = document.createElement('td');
//     td.style.height = '5px';
//     tr.appendChild(td);
//     table.appendChild(tr);

//     // ***************************************************************************************
//     // ***************************************************************************************
//     // ***************************************************************************************
//     // Tích riêng
//     var idInputTichRieng = 1;
//     var quanNum2Copy = quanNum2;
//     if (quanNum2Copy > 1) {
//         // Tạo hàng với dấu cộng và các ô input
//         tr = document.createElement('tr');
//         td = document.createElement('td');
//         td.setAttribute('rowspan', quanNum2Copy * 2 - 1);
//         td.textContent = '+';
//         tr.appendChild(td);

//         for (let i = 0; i < quanResultMulti; i++) {
//             td = document.createElement('td');
//             const input = document.createElement('input');
//             input.className = 'inp_on_table';
//             input.type = 'text';
//             input.id = 'inp_line_' + idInputTichRieng + '_' + (quanResultMulti - i);
//             input.maxLength = 1;
//             input.autocomplete = 'off';
//             td.appendChild(input);
//             tr.appendChild(td);
//         }
//         idInputTichRieng += 1;
//         table.appendChild(tr);

//         while (quanNum2Copy > 1) {
//             // Tạo hàng trống thứ hai với height 5px
//             tr = document.createElement('tr');
//             td = document.createElement('td');
//             td.style.height = '5px';
//             tr.appendChild(td);
//             table.appendChild(tr);

//             // Tạo hàng với các ô input khác
//             tr = document.createElement('tr');

//             for (let i = 0; i < quanResultMulti; i++) {
//                 td = document.createElement('td');
//                 const input = document.createElement('input');
//                 input.className = 'inp_on_table';
//                 input.type = 'text';
//                 input.id = 'inp_line_' + idInputTichRieng + '_' + (quanResultMulti - i);
//                 input.maxLength = 1;
//                 input.autocomplete = 'off';
//                 td.appendChild(input);
//                 tr.appendChild(td);
//             }
//             idInputTichRieng += 1;
//             table.appendChild(tr);
//             quanNum2Copy -= 1;
//         }
//     }

//     // ***************************************************************************************
//     // ***************************************************************************************
//     // ***************************************************************************************
//     // Kết quả
//     // Tạo hàng với các ô có class td_border_bot_multi
//     tr = document.createElement('tr');
//     td = document.createElement('td');
//     td.setAttribute('rowspan', 3);
//     tr.appendChild(td);

//     for (let i = 0; i < quanResultMulti; i++) {
//         td = document.createElement('td');
//         td.className = 'td_border_bot_multi';
//         tr.appendChild(td);
//     }

//     table.appendChild(tr);

//     // Tạo hàng trống cuối cùng với height 5px
//     tr = document.createElement('tr');
//     td = document.createElement('td');
//     td.style.height = '5px';
//     tr.appendChild(td);
//     table.appendChild(tr);

//     // Tạo hàng với các ô input khác và class inp_on_table1
//     tr = document.createElement('tr');

//     for (let i = 0; i < quanResultMulti; i++) {
//         td = document.createElement('td');
//         const input = document.createElement('input');
//         input.className = 'inp_on_table1';
//         input.type = 'text';
//         input.id = 'inp_line_' + idInputTichRieng + '_' + (quanResultMulti - i);
//         input.maxLength = 1;
//         input.autocomplete = 'off';
//         td.appendChild(input);
//         tr.appendChild(td);
//     }

//     table.appendChild(tr);

//     document.getElementById("divTableMulti").innerHTML = '';
//     document.getElementById("divTableMulti").appendChild(divTableMulti);

//     function handleInput(event) {
//         var thisId = event.target.id;
//         var numEnd = parseInt(thisId.charAt(thisId.length - 1));

//         if (thisId.includes('inp_line_')) {
//             if (event.inputType !== 'deleteContentBackward' && event.inputType !== 'deleteContentForward') {
//                 if (numEnd !== quanResultMulti) {
//                     document.getElementById(thisId.slice(0, -1) + (numEnd + 1)).focus();
//                 }
//             }
//         }
//     }

//     // console.log(quanNum2);

//     if (quanNum2 > 1) {
//         document.addEventListener('input', handleInput);
//         document.getElementById("inp_line_1_1").focus();
//     } else {
//         document.removeEventListener('input', handleInput);
//         document.getElementById("inp_line_1_" + quanResultMulti).focus();
//     }

//     document.addEventListener('keydown', function (event) {
//         var thisEventId = event.target.id;

//         if (thisEventId.length >= 12) { // Đảm bảo rằng chuỗi ID có ít nhất 12 ký tự
//             var newEventId;
//             var newElement;

//             switch (event.code) {
//                 case 'ArrowDown':
//                     var newDownChar = String(parseInt(thisEventId[9]) + 1);
//                     newEventId = thisEventId.substring(0, 9) + newDownChar + thisEventId.substring(10);
//                     break;

//                 case 'ArrowUp':
//                     var newUpChar = String(Math.max(0, parseInt(thisEventId[9]) - 1)); // Đảm bảo ký tự không âm
//                     newEventId = thisEventId.substring(0, 9) + newUpChar + thisEventId.substring(10);
//                     break;

//                 case 'ArrowLeft':
//                     var newLeftChar = String(parseInt(thisEventId[11]) + 1);
//                     newEventId = thisEventId.substring(0, 11) + newLeftChar + thisEventId.substring(12);
//                     break;

//                 case 'ArrowRight':
//                     var newRightChar = String(Math.max(0, parseInt(thisEventId[11]) - 1)); // Đảm bảo ký tự không âm
//                     newEventId = thisEventId.substring(0, 11) + newRightChar + thisEventId.substring(12);
//                     break;

//                 default:
//                     return; // Không xử lý các phím khác
//             }

//             newElement = document.getElementById(newEventId);
//             if (newElement) {
//                 newElement.focus(); // Chuyển tiêu điểm đến phần tử mới
//             }
//         }
//     });
// }
