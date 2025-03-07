$(document).ready(function () {

    $('#apply-button').on('click', () => {
        $('#validate-form').fadeIn();
        $('#validate-form').css('display', 'grid');
        $('#apply-button').fadeOut();
    });

    $('#validate-form').validate({
        rules: {
            name: 'required',
            surname: 'required',
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                minlength: 14
            },
            position: "required"
        },
        messages: {
            name: "Lütfen adınızı giriniz",
            surname: "Lütfen soyadınızı giriniz",
            email: "Lütfen geçerli bir e-posta adresi giriniz",
            phone: "Lütfen geçerli bir telefon numarası giriniz",
            position: "Lütfen pozisyon giriniz"
        },
        submitHandler: function (form) {
            $('.success-message').fadeIn().delay(3000).fadeOut();
            form.reset();
            $('#validate-form').fadeOut();
            $('#apply-button').fadeIn();
        },
        errorClass: 'error',
        validClass: 'valid',
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
        focusInvalid: true
    });
    $('#phone').mask("(999) 999-9999");

    $('#date').datepicker({
        dateFormat: 'dd/mm/yy'
    });
});