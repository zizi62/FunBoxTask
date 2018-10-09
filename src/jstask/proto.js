"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

+function () {
  //карточка товара
  var Goods =
  /*#__PURE__*/
  function () {
    function Goods(inStock, options, quantity, orderDone, id) {
      _classCallCheck(this, Goods);

      this.text = 'Сказочное заморское яство', this.title = 'Нямушка', this.inStock = inStock, this.options = options, this.quantity = quantity, this.weight = 'кг', this.orderText = 'Чего сидишь? Порадуй котэ, ', this.order = 'купи.', this.orderDone = orderDone, this.id = id;
    }

    _createClass(Goods, [{
      key: "availabileOrderText",
      value: function availabileOrderText() {
        return 'Печалька, ' + this.options + ' закончился.';
      }
    }, {
      key: "weightCounter",
      value: function weightCounter() {
        return this.quantity / 20;
      }
    }, {
      key: "gifts",
      value: function gifts() {
        var text;
        var count = Math.floor(this.quantity / 20);

        if (this.quantity < 10) {
          text = '<b>' + this.quantity + '</b>' + ' порций.';
        } else if (0 <= count && count < 2) {
          text = '<b>' + this.quantity + '</b>' + ' порций <br> мышь в подарок!';
        } else if (2 <= count && count < 5) {
          text = '<b>' + this.quantity + '</b>' + ' порций' + '<br>' + '<b>' + count + '</b>' + ' мыши в подарок!';
        } else if (5 <= count) {
          text = '<b>' + this.quantity + '</b>' + ' порций' + '<b>' + '<br>' + count + '</b>' + ' мышей в подарок!' + '<br>' + 'Заказчик доволен.';
        }

        return text;
      }
    }]);

    return Goods;
  }();

  var cardsData = [];
  cardsData[0] = new Goods(true, "фуа-гра", 10, 'Печень утки разварная с артишоками.', "liver");
  cardsData[1] = new Goods(true, "с рыбой", 40, 'Головы щучьи с чесноком да свежайшая сёмгушка.', "fish");
  cardsData[2] = new Goods(false, "фуа-гра", 100, 'Филе из цыплят с трюфелями в бульоне.', "chicken"); // создание элемента

  var makeElement = function makeElement(tagName, className, text) {
    var element = document.createElement(tagName);
    element.classList.add(className);

    if (text) {
      element.innerHTML = text;
    }

    return element;
  }; // создание отдельных элементов карты


  var renderCards = function renderCards(itemBlock) {
    var listBlock = makeElement('div', 'item__block');
    var listItem = makeElement('div', 'items');
    listBlock.appendChild(listItem);
    var itemText = makeElement('p', 'item__text', itemBlock.text);
    listItem.appendChild(itemText);
    var title = makeElement('p', 'item__title', itemBlock.title);
    listItem.appendChild(title);
    var options = makeElement('p', 'item__options', itemBlock.options);
    listItem.appendChild(options);
    var gift = makeElement('p', 'item__gift', itemBlock.gifts());
    listItem.appendChild(gift);
    var itemWeight = makeElement('div', 'item__weight');
    listItem.appendChild(itemWeight);
    var count = makeElement('div', 'weight__count', itemBlock.weightCounter());
    itemWeight.appendChild(count);
    var weight = makeElement('div', 'weight', itemBlock.weight);
    itemWeight.appendChild(weight);
    var textOrder = makeElement('p', 'item__order', itemBlock.orderText);
    var itemOrder = makeElement('span', 'order', itemBlock.order);
    var doneOrder = makeElement('p', 'item__order-done', itemBlock.orderDone);
    listBlock.appendChild(doneOrder); // проверка на наличие товара

    var availabilityClass = 'availabil';
    var availabilityWeight = 'availabil';

    if (!itemBlock.inStock) {
      availabilityClass = 'item__passive';
      availabilityWeight = 'item__weight-passive';
      var cover = makeElement('div', 'cover');
      listItem.appendChild(cover);
      textOrder = makeElement('p', 'item__order', itemBlock.availabileOrderText());
      textOrder.classList.add('order__passive');
      itemOrder = makeElement('span', 'display-none', itemBlock.order);
    }

    listItem.classList.add(availabilityClass);
    itemWeight.classList.add(availabilityWeight);
    listBlock.appendChild(textOrder);
    listBlock.appendChild(itemOrder);
    return listBlock;
  }; // добавление карточек товара на страницу


  var cardList = document.querySelector('.row');

  for (var i = 0; i < cardsData.length; i++) {
    var cardItem = renderCards(cardsData[i]);
    cardList.appendChild(cardItem);
  }
}(); 