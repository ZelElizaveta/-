const form = document.getElementById('моя форма'); //(1)                  // 1. Обьявляем форму и обработчик событий submit для отправки формы
    form.addEventListener('submit', function(e){
        e.preventDefault();  //(2)                                       // 2. отменяем стандартное поведение браузера, для того чтоб наша страница не перезагружалась
                                                                                                                        //  при нажатии на кнопку Отправить         
              if(error == 0) {                                     // (7) если error = 0 все хорошо форма отправляется
      
            var req = new XMLHttpRequest();                 //(8) настраиваем отправку формы при помощи XMLHttpRequest() и mailerPHP
            req.open('POST', 'sendmail.php', true);
            req.onload = function() {
                if (req.status >= 200 && req.status < 400) {
                json = JSON.parse(this.response);
                    if (json.result == "success") {
                        form.reset(); //очистка формы
                        // если форма успешно отправилась что-то делаем например console.log('успех')
                    } else {
                        alert("Ошибка. Сообщение не отправлено");
                        }
                } else {
                    alert("Ошибка сервера. Номер: "+req.status);
                }}; 
                    req.onerror = function() {alert("Ошибка отправки запроса");};
                    req.send(new FormData(e.target));
        } else if (error > 0) {
            // если валидация не пройдена что-то делаем. Например console.log('Заполнены не все поля')
        } else {
            
        }

        function formValidate(form) {                      // (3) Функция нашей валидации
            let error = 0; // эта переменная будет проверять есть ли у нас не заполненные поля в форме изначально она равна 0.
    
            for (let index = 0; index < formReq.length; index++) {
                const input = formReq[index]; //(4)// здесь проверяем заполненность обязательных для заполнения полей и запускаем цикл
                formRemoveError(input);  //изначально удалем класс ошибки у всех input, функцию formRemoveError смотри ниже  
              
                    if (input.value == '') { //(5) запускаем проверку
                        formAddError(input); //функция добавляет класс Ошибки
                        error++;
                    } else {
                       
                    }

              // проводим проверку для всех обязательных полей, в данном примере была проверка только на пустоту полей, при желании можно провести проверку более тщательные проверки при помощи регулярных выражени     
            return error; //(6) получаем переменную error
        }
    
        function formAddError(input) { // функция добавления класса Ошибки у input и его родителю
            input.parentElement.classList.add('_error');
            input.classList.add('_error');
        }
    
        function formRemoveError(input) { // функция удаления класса Ошибки у input и его родителя
            input.parentElement.classList.remove('_error');
            input.classList.remove('_error');
        }
    
        function emailTest(input) {
            return !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.value);
        }

        function nameTest(input) {
            return !/^[а-яА-ЯёЁa-zA-Z]+$/.test(input.value); // эта функция проверяет, чтоб в имени были только буквы, если будут цифры или знаки препинания валидация не пройдет
        }      

    });
