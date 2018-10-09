+function () {
//карточка товара
    class Goods {  
        constructor (inStock, options, quantity, orderDone, id){
            this.text = 'Сказочное заморское яство',
            this.title = 'Нямушка',
            this.inStock = inStock,
            this.options = options,
            this.quantity = quantity,
            this.weight = 'кг',
            this.orderText = 'Чего сидишь? Порадуй котэ, ',
            this.order = 'купи.',
            this.orderDone = orderDone,
            this.id = id
            }
            availabileOrderText () {
            return 'Печалька, '+ this.options +' закончился.' ;  
            };
            weightCounter (){
            return (this.quantity)/20 
            };
            gifts(){
            let text;
            let count = Math.floor(this.quantity/20);
            if(this.quantity < 10) {
                text = '<b>' + this.quantity +'</b>' + ' порций.'
            } else if(0 <= count && count < 2 ) {
                text = '<b>' + this.quantity +'</b>' + ' порций <br> мышь в подарок!';
            } else if (2<= count && count < 5){
                text = '<b>' + this.quantity +'</b>' + ' порций'  + '<br>' +  '<b>' + count +'</b>' + ' мыши в подарок!';
            } else if (5 <= count){
                text = '<b>' + this.quantity +'</b>' + ' порций' + '<b>' + '<br>' + count +'</b>'+  ' мышей в подарок!' + '<br>' +'Заказчик доволен.';
            }
            return text
            } 
        }

    let cardsData = [];
    cardsData[0]= new Goods(true, "фуа-гра", 10, 'Печень утки разварная с артишоками.', "liver")
    cardsData[1]= new Goods(true, "с рыбой", 40, 'Головы щучьи с чесноком да свежайшая сёмгушка.', "fish");  
    cardsData[2]= new Goods(false, "фуа-гра", 100, 'Филе из цыплят с трюфелями в бульоне.', "chicken");

        // создание элемента
        let makeElement = function (tagName, className, text) {  
            let element = document.createElement(tagName);
            element.classList.add(className);
            if (text) {
            element.innerHTML = text;
            }
            return element;
        };
        // создание отдельных элементов карты
        let renderCards = function(itemBlock) {
            let listBlock = makeElement('div', 'item__block');
        
            let listItem = makeElement('div', 'items');
            listBlock.appendChild(listItem);
        
            let itemText = makeElement('p', 'item__text', itemBlock.text );
            listItem.appendChild(itemText);
            
            let title = makeElement('p', 'item__title', itemBlock.title);
            listItem.appendChild(title);
        
            let options = makeElement('p', 'item__options', itemBlock.options);
            listItem.appendChild(options);
        
            let gift = makeElement('p', 'item__gift', itemBlock.gifts());
            listItem.appendChild(gift);
        
            let itemWeight = makeElement('div', 'item__weight');
            listItem.appendChild(itemWeight);
        
            let count = makeElement('div', 'weight__count',itemBlock.weightCounter());
            itemWeight.appendChild(count);
        
            let weight = makeElement('div', 'weight', itemBlock.weight);
            itemWeight.appendChild(weight);
        
            let textOrder = makeElement('p', 'item__order', itemBlock.orderText );
            let itemOrder = makeElement('span', 'order', itemBlock.order );
            
            let doneOrder = makeElement('p', 'item__order-done', itemBlock.orderDone);
            listBlock.appendChild(doneOrder);
        

            // проверка на наличие товара
            let availabilityClass = 'availabil';
            let availabilityWeight = 'availabil';
            if (!itemBlock.inStock) {
                availabilityClass = 'item__passive';
                availabilityWeight = 'item__weight-passive';
                let cover = makeElement('div', 'cover');
                listItem.appendChild(cover);
                textOrder = makeElement('p', 'item__order', itemBlock.availabileOrderText());
                textOrder.classList.add('order__passive');
                itemOrder = makeElement('span', 'display-none', itemBlock.order );
                }
                listItem.classList.add(availabilityClass);
                itemWeight.classList.add(availabilityWeight);
        
            listBlock.appendChild(textOrder);
            listBlock.appendChild(itemOrder);    
            
        return listBlock;
        }
        // добавление карточек товара на страницу
        var cardList = document.querySelector('.row');
        
        for (var i = 0; i < cardsData.length; i++) {
            var cardItem = renderCards(cardsData[i]);
            cardList.appendChild(cardItem);
        }

}();



























