document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output'),

        outData = (data) => {
            const eventData = data.eventData,
                newData = data.cars;

            newData.forEach(item => {
                if (item.brand === eventData) {
                    const {brand, model, price} = item;
                    output.innerHTML = `Тачка ${brand} ${model} <br>
                    Цена: ${price}$`;
                }
            });
        },

        outMessageError = () => output.innerHTML = 'Произошла ошибка',

        getData = (e) => {

            return new Promise((resolve, reject) => { 
                const request = new XMLHttpRequest();
                request.open('GET', './cars.json');
                request.setRequestHeader('Content-type', 'application/json');
                request.send();
                request.addEventListener('readystatechange', () => {
                    if (request.readyState !== 4) {
                        return;
                    }
                    if (request.status === 200) {
                        const data = JSON.parse(request.responseText);
                        data.eventData = e;
                        resolve(data);
                    } else {
                        reject();
                    }
                });
            });
        };

    select.addEventListener('change', e => {
        const event = e.target.value,
            changeSelect = getData(event);

        changeSelect
            .then(outData)
            .catch(outMessageError);
    });

});