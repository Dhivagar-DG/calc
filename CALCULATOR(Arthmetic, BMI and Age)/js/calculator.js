// Selected calculator
$('#dDown').change(function(){
    $('input').val("");
    $(`.${$(this).val()}`).siblings('section').hide();
    $(`.${$(this).val()}`).fadeIn("slow");

})
// Weight or Height (Which input user focus)
let thisInput = "";
$('#weight').focusout(()=> thisInput = "weight");
$('#height').focusout(()=> thisInput = "height");
// Logic Of Calc
let haveExpression = false;

// display error MSG
let displayErrorMessage = (msg)=>{
    $('#toastID .tstBody').text(msg)
    let toastELM = document.getElementById("toastID");
    let tst = new bootstrap.Toast(toastELM);
    tst.show();
}
$('button').click(function(){
    if($(this).closest('section').attr('class') == "calculator"){
        let existValue = $('.expression').val();
        if (!haveExpression) $('.display_1').text("");
        if ($(this).val() == 'CE'){
            $('.expression').val(""); 
            $('.display_1').text("");
            haveExpression = false;
        } else if ( ['+','-','*','/','%','(',')','.','='].includes($(this).val()) || haveExpression ){
            if ($(this).val() != '='){
                $('.expression').val(existValue+$(this).val())
            }
            if ( parseInt($('.expression').val().split("").splice(-1)[0]) >= 0) {
                $('.display_1').text(`Answer : `+eval($('.expression').val()));
            }
            haveExpression = true;
            if($(this).val() == '=') {
                $('.expression').val(""); 
                haveExpression = false;
            }
        }else{
            $('.expression').val(existValue+$(this).val());
        }
    } else if ( $(this).closest('section').attr('class') == "bmi" ){
        if(thisInput == "") {
            displayErrorMessage("Please enter the values");
            return false;
        }
        let existValue = $("#"+`${thisInput}`).val();
        if( $(this).val() == "ac" ){
            $(`#${thisInput}`).val("");
        } else if ( $(this).val() == "x" ){
            $(`#${thisInput}`).val(existValue.slice(0,existValue.length-1));
        } else if ( $(this).val() == "go"){
            let weight = parseFloat($('#weight').val());
            let height = parseFloat($('#height').val());
            if( weight == "" || height == ""){
                displayErrorMessage("Please enter the values");
                return false;
            } 
            else if(parseInt(weight) == 0 || parseInt(height) == 0){
                displayErrorMessage("The BMI doesn't look right.Make sure the height and weight entered you are correct.");
                return false;
            }
            let bmiResult = weight / (height/100)**2;
            $('#bmiModal .bmiReult h3').text(bmiResult.toFixed(1));
            if( bmiResult.toFixed(1) <= 18.5 )
                $('#bmiModal .bmiReult #result').text("Underweight").css('color','#0D6EFD');
            else if ( bmiResult.toFixed(1) <= 25.0 )
                $('#bmiModal .bmiReult #result').text("Normal").css("color","#198754");
            else
                $('#bmiModal .bmiReult #result').text("Overweight").css("color","#DC3545");
            
            let modal = new bootstrap.Modal(document.querySelector('#bmiModal'));
            modal.show();
           } 
        else{
            $(`#${thisInput}`).val(existValue+$(this).val());
        }
    } else if ( $(this).closest('section').attr('class') == 'age' ){
        function dateDiff(a,b){ 
            // 27/06/1997 = a, 26/7/2022
            const YearFormula = (1000*60*60*24*365.25);
            const dayFormula = (1000*3600*24);

            const date_1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
            const date_2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
            // Result
            let year = Math.floor((date_1 - date_2) / YearFormula);
            
            //Month Calculation 
            let monthDiff = Math.abs(b.getTime() - a.getTime());
            let months = Math.round(monthDiff / (2e3 * 3600 * 365.25));

            let days = Math.floor((a.getTime() - b.getTime()) / dayFormula);
            return {days,months,year}

        }
        if ($('#toDate').val() == "" || $('#birthDate').val() == "" ){
            displayErrorMessage('Please choose Birth date and To date.');
            return false;
        }
        else if(new Date($('#toDate').val()) <= new Date($('#birthDate').val())){
            displayErrorMessage("Given wrong date(Please give the format of [To date greater than birth date]).");
            return false;
        }
        let result = dateDiff(new Date($('#toDate').val()), new Date($('#birthDate').val()));
        
        result.year != 0 ? $('#ageModal .modal-body .row_1').html(`<h3>Year Wise : ${result.year} ${result.year > 1 ?'Years':'Year'}.</h3>`)
        : $('#ageModal .modal-body .row_1').html("");
        result.months != 0 ? $('#ageModal .modal-body .row_2').html(`<h3>Month Wise : ${result.months} ${result.months > 1 ?'Months':'Month'}.</h3>`)
        : $('#ageModal .modal-body .row_2').html("");
        result.days != 0 ? $('#ageModal .modal-body .row_3').html(`<h3>Days Wise :${result.days} ${result.days > 1 ?'Days':'Day'}.</h3>`)
        : $('#ageModal .modal-body .row_3').html("");

        let modal = new bootstrap.Modal(document.querySelector('#ageModal'));
        modal.show();
    }
});
// End of Calc
// Theme
$('.dark').click(function(){
    $('.light p').text('Light');
    $('.Theme').animate({top:"2px",left:"99px",bottom:"0",right:"1.5px"}).text("Dark").css({"background":"#000000","color":"#ffffff","vertical-align":"middle"});
    $('.oper').addClass('operators');
    $('.card-body').addClass('dark-T');
    $('label').css('color','#ffffff');
    $('nav , .calcHeader').removeClass('bg-dark');
    $('nav').addClass('bg-primary');
    $('.card-header').css({'background':'#452999','color':'#ffffff','transition':'1s'});
    $('body').css({'background':'#1E1E1E','transition':'1s'});
});
$('.light').click(function(){
    $('.Theme').animate({top:"2px",left:"2px",bottom:"0",right:"99px"}).text("Light").css({"background":"#ffffff","color":"#000000"});
    $('.oper').removeClass('operators').css('transition','1s');
    $('.card-body').removeClass('dark-T');
    $('label').css('color','#000000');
    $('nav').removeClass('bg-primary');
    $('nav , .calcHeader').addClass('bg-dark');
    $('.card-header').css({'background':'transparent','color':'#000000','transition':'1s'});
    $('body').css({'background':'transparent','transition':'1s'});
});
