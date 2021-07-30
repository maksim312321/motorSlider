let sliderСontainer = document.getElementsByClassName('slider-container')

let sliderWindow = document.getElementById('slider-window');
let sliderTrack = document.getElementById('slider-track');
let sliderItem = document.getElementsByClassName('slider-item');
let sliderBtnPrev = document.getElementById('slider-button-prev');
let sliderBtnNext = document.getElementById('slider-button-next');

let sliderNavi = document.getElementById('slider-navi');
let naviItems = document.getElementsByClassName('navi-item');

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
    addFocusClass(naviItems[CurrentPosition/windowWidth]); //меняем вкладку
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
    addFocusClass(naviItems[CurrentPosition/windowWidth]);//меняем вкладку
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
//----------------------------------------------- ф-ии для навигации -----------------------------------------
function removeAllFocusClass(){
    for(let i=0; i<naviItems.length; i++){
        naviItems[i].classList.remove('navi-item-focus');
    }
}
function addFocusClass(targetNaviItem){
    removeAllFocusClass();//перед тем, как повесить фокус-класс нужно удалить его у других элементов
    targetNaviItem.classList.add('navi-item-focus');
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
    addFocusClass(event.target);
    MoveTo(event.target.getAttribute("idNavi"));
    clearInterval(intervalId);
})


