/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {

    function getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';

        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    function randomInteger(min, max) {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max + 1 - min);
        
        return Math.floor(rand);
    }
    
    let el = document.createElement('div');

    el.setAttribute('draggable', true);
    el.classList.add('draggable-div');
    el.style.width = randomInteger(50, 100) + 'px';
    el.style.position = 'absolute';
    el.style.height = randomInteger(50, 150) + 'px';
    el.style.top = randomInteger(50, 300) + 'px';
    el.style.left = randomInteger(110, 600) + 'px';
    el.style.backgroundColor = getRandomColor();

    return el;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    let startCoords;

    let onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        let mouseAction = moveEvt.target

        let shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
        };

        let newY = mouseAction.offsetTop - shift.y;
        let newX = mouseAction.offsetLeft - shift.x;

        startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
        };

        mouseAction.style.left = newX + 'px';
        mouseAction.style.top = newY + 'px';
    };

    let onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        target.removeEventListener('mousemove', onMouseMove);
        target.removeEventListener('mouseup', onMouseUp);
    };

    target.addEventListener('mousedown', function (evt) {
        evt.preventDefault();
        startCoords = {
            x: evt.clientX,
            y: evt.clientY
        };

        target.addEventListener('mousemove', onMouseMove);
        target.addEventListener('mouseup', onMouseUp);
    });
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
