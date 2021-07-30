let sliderСontainer = document.getElementById('slider-container')

let sliderWindow = document.getElementById('slider-window');
let sliderTrack = document.getElementById('slider-track');
let sliderItem = document.getElementsByClassName('slider-item');
let sliderBtnPrev = document.getElementById('slider-button-prev');
let sliderBtnNext = document.getElementById('slider-button-next');

let sliderNavi = document.getElementById('slider-navi');
let naviItems = document.getElementsByClassName('navi-item');

let sliderPagination = document.getElementById('slider-pagination');
let paginationItems = document.getElementsByClassName('pagination-item');

let windowWidth = sliderWindow.offsetWidth;//ширина окна
let MaxPosition = sliderItem.length*windowWidth - windowWidth;// вычисляем макс. позицию
let MinPosition = 0;
let CurrentPosition = 0;// текущая позиция

for(let i=0; i<naviItems.length; i++){//предварительно зададим численные атрибуты навигации(нужно для работы ф-ии MoveTo) 
    naviItems[i].setAttribute("idNavi", `${i}`);
}


//----------------------------------------------- ф-ии перемещения слайдера -----------------------------------------
function MoveRight(){ //перелистнуть вправо
    refreshScreenData();
    if(CurrentPosition !== MaxPosition){
        CurrentPosition+=windowWidth;
        sliderTrack.style.transform = `translate(-${CurrentPosition}px)`;
    }
    else{
        CurrentPosition = MinPosition;
        sliderTrack.style.transform = `translate(${CurrentPosition}px)`;
    }
    addFocusClass(CurrentPosition/windowWidth); //меняем вкладку и пагинацию
}
function MoveLeft(){ //перелистнуть влево
    refreshScreenData();
    if(CurrentPosition !== MinPosition){
        CurrentPosition-=windowWidth;
        sliderTrack.style.transform = `translate(-${CurrentPosition}px)`;
    }
    else{
        CurrentPosition = MaxPosition
        sliderTrack.style.transform = `translate(-${CurrentPosition}px)`
    }
    addFocusClass(CurrentPosition/windowWidth); //меняем вкладку и пагинацию
}
function MoveTo(sliderItemPage){ //перелистнуть на конкретный слайд
    refreshScreenData();
    CurrentPosition = sliderItemPage*windowWidth;
    sliderTrack.style.transform = `translate(-${CurrentPosition}px)`
}
let intervalId = setInterval(()=>{//автоматические пролистывания
    MoveRight();
},3000)

function refreshScreenData(){//в случае изменения пользователем ширины окна браузера меняем параметры слайдера
    if(windowWidth !== sliderWindow.offsetWidth){
    CurrentPosition = 0;
    windowWidth = sliderWindow.offsetWidth;//ширина окна
    MaxPosition = sliderItem.length*windowWidth - windowWidth;
    }
}


//----------------------------------------------- ф-ии для навигации и пагинации -----------------------------------------
function removeAllFocusClass(){
    for(let i=0; i<naviItems.length; i++){
        naviItems[i].classList.remove('navi-item-focus');
        paginationItems[i].classList.remove('pagination-item-focus');
    }
}
function addFocusClass(ItemNumber){
    removeAllFocusClass();//перед тем, как повесить фокус-класс нужно удалить его у других элементов
    if(windowWidth>=1024){
        naviItems[ItemNumber].classList.add('navi-item-focus');
    }
    else{
        paginationItems[ItemNumber].classList.add('pagination-item-focus');
    }
    
}
//----------------------------------------------- слушатели событий -----------------------------------------
sliderBtnPrev.addEventListener("click", ()=>{//слушаетль событий нажатий на стрелочки слайдера
    MoveLeft();
    clearInterval(intervalId);//остановить автоматические пролистывания
})
sliderBtnNext.addEventListener("click", ()=>{//слушаетль событий нажатий на стрелочки слайдера
    MoveRight();
    clearInterval(intervalId);//остановить автоматические пролистывания
})
sliderNavi.addEventListener("click", (event) =>{
    addFocusClass(event.target.getAttribute("idNavi"));
    MoveTo(event.target.getAttribute("idNavi"));
    clearInterval(intervalId);
})
let x1;
let x2;
sliderСontainer.addEventListener("touchstart", (event)=>{
    x1 = event.touches[0].clientX;//фиксируем начало нажатия
    clearInterval(intervalId);
})
sliderСontainer.addEventListener("touchend", (event)=>{
    x2 = event.changedTouches[0].clientX//фиксируем конец нажатия
    if(x1>x2){MoveRight()}
    else if(x2>x1){MoveLeft()}
})



