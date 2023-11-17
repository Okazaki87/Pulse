
$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        //adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icon/left.png"</button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icon/right.png"</button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                  dots: true,
                  arrows: false
                  
                }  
            },

            { 
            breakpoint: 424,
            settings: {
              dots: true,
              arrows: false,
        } 
          },
        ]
      });
     
      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

     $('.catalog-item__link').each(function(i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
      })

      $('.catalog-item__back').each(function(i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
      })

     // function toggleSlide(item) {
       // $(item).each(function(i) {
       //   $(this).on('click', function(e) {
        //    e.preventDefault();
        //    $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
         //   $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        //  });
        //});
     // };

     // toggleSlide('.catalog-item__link');
     // toggleSlide('.catalog-item_back');



      //<--------modal-------------->
      $('[data-modal=consultation').on('click', function() {
          $('.overlay, #consultation').fadeIn('slow');
      });

      //закрываем модальное окно 
      $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
      });

     /*  $('.button_mini').on('click', function() {
        $('.overlay, #order').fadeIn('slow');
      })
 */

      $('.button_mini').each(function(i) {
          $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
          })
      });

      //валидация форм
   /*    $('#consultation-form').validate();
      $('#consultation form').validate({
          rules: {
              name: {
                required: true,
                minlength: 2
              },
              phone: "required",
              email: {
                required: true,
                email: true
              }
          },
          messages: {
            name: {
              required: "Пожалуйста, введите свое имя",
              minlength: jQuery.validator.format("Введите {0} символа")
            },
            phone: "Пожалуйста, введите номер телефона",
            email: {
              required: "Пожалуйста, введите свою почту",
              email: "Неправильно введен адрес почты"
            }
          }

      }); */
      
    /*   $('#order form').validate(); */



      //валидация форм
      function valideForms(form){
        $(form).validate ({
        rules: {
            name: {
              required: true,
              minlength: 2
            },
            phone: "required",
            email: {
              required: true,
              email: true
            }
        },
        messages: {
          name: {
            required: "Пожалуйста, введите свое имя",
            minlength: jQuery.validator.format("Введите {0} символа")
          },
          phone: "Пожалуйста, введите номер телефона",
          email: {
            required: "Пожалуйста, введите свою почту",
            email: "Неправильно введен адрес почты"
          }
        }

       });
       
    } ;

      valideForms('#consultation-form');
      valideForms('#consultation form');
      valideForms('#order form');
    
      //маска для телефона
      $('input[name=phone]').mask("+7 (999)-999-99-99");


      //скрипт для отправки письма
      $('form').submit(function(e) {
          e.preventDefault();

          if (!$(this).valid()) {
              return;
          }

          $.ajax({
              type: "POST",
              url: "mailer/smart.php",
              data: $(this).serialize()
          }).done(function() {
              $(this).find("input").val("");
              $('#consultation, #order').fadeOut();
              $('overlay, #thanks').fadeIn('slow');

              $('form').trigger('reset');
          });
            return false;
      });

      //скролл появление и исчезание кнопки
      $(window).scroll(function() {
          if ($(this).scrollTop() > 1600) {
              $('.pageup').fadeIn();
          } else {
              $('.pageup').fadeOut();
          }
      });

      //плавное поднятие на вверх страницы
      $("a[href=#up]").click(function() {
          const _href = $(this).attr("href");
          $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
          return false;
      });

      // для появления эффекта анимации
      new WOW().init();
  });
