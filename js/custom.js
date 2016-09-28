/**
 * Created by John Muteti on 9/15/2016.
 */
var check_pass;
var check_step3;
var check_step5;
var check_step6;
var setReviewInfo;
var sendToAirbase;
// CONTROL SIGNUP PROCESS
$(document).ready(function () {

    // SHOW 'REVIEW INFORMATION'
    var f_email = $('#email');
    var f_username = $('#username');
    var f_password = $('#password');
    var f_theme = $('#choose_theme');
    var f_church_name = $('#name_of_church');
    var f_church_city = $('#name_of_city');
    var f_church_domain = $('#name_of_domain');
    var f_domain_owned = $('#checkbox_domain');
    var f_service_schedule = $('#service_schedule_txtarea');
    var f_pastor_name = $('#pastor_name');
    var f_church_address = $('#church_address');
    var f_church_phone = $('#church_phone');
    var f_church_email = $('#church_email');
    var f_web_lead_name = $('#web_lead_name');
    var f_web_lead_phone = $('#web_lead_phone');
    var f_web_lead_email = $('#web_lead_email');
    var f_best_time_call = $('#best_time_to_call');


    // CONFIRM PASSWORD VALIDATION {STEP 1}
    var continue0 = $('#continue0');
    check_pass = function () {
        if ($('#password').val() == $('#confirm_password').val()) {
            if ($('#email').val() != '' && $('#username').val() != '' && $('#password').val() != '' && $('#confirm_password').val() != '') {
                document.getElementById('confirm_password').setCustomValidity('');
                continue0.removeAttr("disabled");
            }
        } else {
            document.getElementById('confirm_password').setCustomValidity('Please ensure both passwords match');
            continue0.attr("disabled", true);
        }
    };
// CONFIRM PASSWORD VALIDATION {STEP 1}

    // GOT TO STEP2
    continue0.click(function () {
        $('#step1').fadeOut();
        $('#step2').fadeIn(600);
    });
    // GOT TO STEP2

    // STEP2
    if ($('#choose_theme option:selected') && $('#choose_color option:selected')) {
        $('#continue1').removeAttr("disabled");
    } else {
        $('#continue1').attr('disabled', true);
    }
    // STEP2

    // GOT TO STEP3
    $('#continue1').click(function () {
        $('#step2').fadeOut();
        $('#step3').fadeIn(600);
    });
    // GOT TO STEP3

    // STEP3
    check_step3 = function () {
        if ($('#name_of_church').val() != '' && $('#name_of_city').val() != '' && $('#name_of_domain').val() != '') {
            $('#continue2').removeAttr("disabled");
        } else {
            $('#continue2').attr('disabled', true);
        }
    };
    // STEP3

    // GO TO STEP4
    $('#continue2').click(function () {
        $('#step3').fadeOut();
        $('#step4').fadeIn(600);
    });
    // GO TO STEP4

    // STEP4
    var placeholder = 'Enter your schedule here...';
    $('#service_schedule_txtarea').val(placeholder);

    $('#service_schedule_txtarea').focus(function () {
        if ($(this).val() === placeholder) {
            $(this).val('');
        }
    });

    $('#service_schedule_txtarea').blur(function () {
        if ($(this).val() === '') {
            $(this).val(placeholder);
        }
    });
    // STEP4

    // GO TO STEP5
    $('#continue3').click(function () {
        $('#step4').fadeOut();
        $('#step5').fadeIn(600);
    });
    // GO TO STEP5

    // STEP5
    check_step5 = function () {
        if ($('#pastor_name').val() != '' && $('#church_address').val() != '' && $('#church_phone').val() != '' && $('#church_email').val() != '') {
            $('#continue4').removeAttr('disabled');
        } else {
            $('#continue4').attr('disabled', true);
        }
    };
    // STEP5

    // GO TO STEP6
    $('#continue4').click(function () {
        $('#step5').fadeOut();
        $('#step6').fadeIn(600);
    });
    // GO TO STEP6

    // STEP6
    check_step6 = function () {
        if ($('#web_lead_name').val() != '' && $('#web_lead_phone').val() != '' && $('#web_lead_email').val() != '') {
            $('#continue5').removeAttr('disabled');
        } else {
            $('#continue5').attr('disabled', true);
        }
    };
    // STEP6

    // SET REVIEW INFORMATION VALUES
    setReviewInfo = function () {
        $('#theme_preview').val(f_theme.val());

        $('#church_name_preview').val(f_church_name.val());
        $('#church_location_preview').val(f_church_address.val());
        $('#Domain_preview').val(f_church_domain.val());
        if ($('#checkbox_domain').is(':checked')) {
            $('#Domain_owned_preview').prop('checked', true);
        }

        // CAST SERVICE SCHEDULE INTO AN ARRAY
        var service_array = f_service_schedule.val().split('\n');

        // LOOP THROUGH THE ARRAY AND DISPLAY THE VALUES FOR REVIEW
        service_array.forEach(function (v, k) {
            $("#service-schedule-container").append("<p>" + v + "</p>");
        });
        // LOOP THROUGH THE ARRAY AND DISPLAY THE VALUES FOR REVIEW

        $('#PastorName_preview').val(f_pastor_name.val());
        $('#ChurchAddress_preview').val(f_church_address.val());
        $('#ChurchPhone_preview').val(f_church_phone.val());
        $('#ChurchEmail_preview').val(f_church_email.val());

        $('#WebLeadName_preview').val(f_web_lead_name.val());
        $('#WebLeadPhone_preview').val(f_web_lead_phone.val());
        $('#WebLeadEmail_preview').val(f_web_lead_email.val());
        $('#BestTimeToCall_preview').val(f_best_time_call.val());
    };

    // GO TO STEP7
    $('#continue5').click(function () {
        setReviewInfo();
        sendToAirbase();
        $('#step6').fadeOut();
        $('#step7').fadeIn(600);
    });
    // GO TO STEP7

    // GOT TO STEP8
    $('#continue6').click(function () {
        $('#step7').fadeOut();
        $('#step8').fadeIn(600);
    });
    // GOT TO STEP8

    sendToAirbase = function () {
        alert(f_service_schedule.val());
        var data = {};
        data.username = f_username.val();
        data.email = f_email.val();
        data.password = f_password.val();
        data.theme = f_theme.val();
        data.churchName = f_church_name.val();
        data.churchCity = f_church_city.val();
        data.churchDomain = f_church_domain.val();
        data.churchDomainOwned = f_domain_owned.is(':checked');
        data.serviceSchedule = f_service_schedule.val();
        data.pastorName = f_pastor_name.val();
        data.churchAddress = f_church_address.val();
        data.churchPhone = f_church_phone.val();
        data.churchEmail = f_church_email.val();
        data.webLeadName = f_web_lead_name.val();
        data.webLeadPhone = f_web_lead_phone.val();
        data.webLeadEmail = f_web_lead_email.val();
        data.bestToCall = f_best_time_call.val();

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'https://siteforchurch-backend-nodejs.herokuapp.com/air',
            success: function (data) {
                console.log('success');
                console.log(JSON.stringify(data));
            }
        });
    }

});
// CONTROL SIGNUP PROCESS