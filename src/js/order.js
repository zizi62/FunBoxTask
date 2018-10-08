
function Active (elements){
    this.item = elements.item;
    this.itemOrder =  elements.itemOrder;
    this.textOrder = elements.textOrder;
    this.textOrderDone = elements.textOrderDone;
    this.itemWeight = elements.itemWeight;
    let itemActiveClass = elements.itemActive;
    let temp = this; 
    
    this.swichClass = function (index) {
        function foo (){ 
            if (temp.item[index].classList.contains(elements.itemPassive)){return;}      
            else if (temp.item[index].classList.contains(itemActiveClass)) {
                temp.cancelCardOrder(index)
            }      
            else {
                temp.cardOrder(index);
            }
        }
        return foo();
    };
// функция добавляет активные классы когда карточка выбрана
    this.cardOrder = function(index){
        temp.item[index].classList.add(elements.itemActive);
        temp.itemWeight[index].classList.add(elements.weightActive);
        temp.itemOrder[index].style.display = "none";
        temp.textOrder[index].style.display = "none";
        temp.textOrderDone[index].style.display = "inline-block";
    }
// функция удаляет активные классы при повторном клике на карточку
    this.cancelCardOrder = function(index) {
        temp.item[index].classList.remove(elements.itemActive);
        temp.itemWeight[index].classList.remove(elements.weightActive);
        temp.itemOrder[index].style.display = "inline-block";
        temp.textOrder[index].style.display = "inline-block";
        temp.textOrderDone[index].style.display = "none";
    }
// функция показывает надпись  при повторном наведении на карточку
        this.moseenterCard = function(index) {
            temp.item[index].style.display = "none";
        }
}
// объект с классами карточки
    var card = new Active({
        item : document.querySelectorAll('.items'),
        itemWeight : document.querySelectorAll('.item__weight'),
        itemActive : 'item__active',
        weightActive : 'item__weight-active',
        itemOrder : document.querySelectorAll('.item__order'),
        textOrderDone : document.querySelectorAll('.item__order-done'),
        textOrder : document.querySelectorAll('.order'),
        itemPassive: 'item__passive'
        
    }); 
// событие клика по карточке товара
     for(let i = 0; i < card.item.length; i++) {
        card.item[i].addEventListener('click', function(){
                card.swichClass(i);
               
        });
     }
// событие клика по надписи "купи"
     for(let i = 0; i < card.textOrder.length; i++) {
        card.textOrder[i].addEventListener('click', function(){        
            card.swichClass(i);
        });
     }
    

      



