/**
 * Created by John Muteti on 9/15/2016.
 */
var check_pass;
var check_step3;
var check_step5;
var check_step6;
var setReviewInfo;
var sendToAirbase;
var previewTheme;
var formValidation;
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

    // DOES ALL VALIDATION FOR THE SIGN UP PROCESS
    formValidation = function (field, type) {
        var element = $('#' + field);
        var emailPattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        var usernamePattern = /^([a-z0-9]){3,15}$/;
        switch (type) {
            case 'email':
                if (!emailPattern.test(element.val()) || element.val() == '') {
                    continue0.attr("disabled", true);
                    element.addClass('has-error');
                    return false;
                } else {
                    continue0.removeAttr("disabled");
                    element.removeClass('has-error');
                    return true;
                }
                break;
            case 'username':
                if (!usernamePattern.test(element.val()) || element.val() == '') {
                    continue0.attr("disabled", true);
                    element.addClass('has-error');
                    return false;
                } else {
                    continue0.removeAttr("disabled");
                    element.removeClass('has-error');
                    return true;
                }
                break;
        }
    };

    // CONFIRM PASSWORD VALIDATION {STEP 1}
    var continue0 = $('#continue0');
    check_pass = function () {
        if ($('#password').val() == $('#confirm_password').val()) {
            if ($('#email').val() != '' && $('#username').val() != '' && $('#password').val() != '' && $('#confirm_password').val() != '') {
                continue0.removeAttr("disabled");
            }
        } else {
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
    previewTheme = function () {
        switch (f_theme.val()) {
            case 'California':
                $("#theme_preview_image").attr("src", "http://sitesforchurch.s3.amazonaws.com/california_480.png");
                $('#theme_description').html('California is a modern church theme, it features promoted series, ministries and events on the home page. For an example visit <a href="http://biblebaptistmattoon.org" target="_blank">biblebaptistmattoon.org</a>');
                break;
            case 'New_England':
                //RENAME THE IMAGE/LOCATION
                $("#theme_preview_image").attr("src", "http://sitesforchurch.s3.amazonaws.com/new-england_480.png");
                $('#theme_description').html('New England is a subdued and traditional theme that showcases a churches latest sermons and recent photos.  You can check out an example <a href="http://new-england.pubstorm.site" target="_blank"> here</a>');
                break;
            case 'Adore':
                //RENAME THE IMAGE/LOCATION
                $("#theme_preview_image").attr("src", "http://sitesforchurch.s3.amazonaws.com/adore.png");
                $('#theme_description').html('Adore is a bright and clean theme with a home page slider and unique events listing.  You can check out an example <a href="http://adore-theme.pubstorm.site" target="_blank"> here</a>');
                break;
            case 'Native':
                //RENAME THE IMAGE/LOCATION
                $("#theme_preview_image").attr("src", "http://sitesforchurch.s3.amazonaws.com/native_480.png");
                $('#theme_description').html('Native is an extremely versatile theme that works great with both traditional and modern styles.  You can check out an example <a href="http://native.pubstorm.site" target="blank"> here</a>');
                break;
        }
    };
    if ($('#choose_theme option:selected')) {
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
            headers: {'Access-Control-Allow-Origin': '*'},
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'https://siteforchurch-backend-nodejs.herokuapp.com/air',
            crossDomain: true,
            success: function (data) {
                console.log('success');
                console.log(JSON.stringify(data));
            }
        });
    }

});
// CONTROL SIGNUP PROCESS