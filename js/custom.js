/**
 * Created by John Muteti on 9/15/2016.
 */
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
    var f_password_confirm = $('#confirm_password');
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
    var continue0 = $('#continue0');

    //VALIDATION CHECKS
    var v_email = false;
    var v_username = false;
    var v_password = false;
    var v_password_confirm = false;
    var v_church_name = false;
    var v_church_loc = false;
    var v_church_domain = false;
    var v_pastor = false;
    var v_church_address = false;
    var v_church_phone = false;
    var v_church_email = false;
    var v_web_lead_name = false;
    var v_web_lead_phone = false;
    var v_web_lead_email = false;

    // DOES ALL VALIDATION FOR THE SIGN UP PROCESS
    formValidation = function (field) {
        var element = $('#' + field);
        var emailPattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        var usernamePattern = /^([a-z0-9]){4,15}$/;
        var passwordPattern = /[^\s]{6,15}/;
        var normalStringPattern = /[^\s]{3,}/;
        var domainRegex = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/;
        switch (field) {
            case 'email':
                if (!emailPattern.test(element.val()) || element.val() == '') {
                    v_email = false;
                    element.addClass('has-error');
                    $('#email-hint').text('Ensure you enter correct email');
                } else {
                    v_email = true;
                    $('#email-hint').text('');
                    element.removeClass('has-error');
                }
                break;
            case 'username':
                if (!usernamePattern.test(element.val()) || element.val() == '') {
                    v_username = false;
                    $('#username-hint').text('Ensure username is 4 to 15 characters');
                    element.addClass('has-error');
                } else {
                    v_username = true;
                    $('#username-hint').text('');
                    element.removeClass('has-error');
                }
                break;
            case 'password':
                if (!passwordPattern.test(element.val()) || element.val() == '') {
                    v_password = false;
                    $('#password-hint').text('Ensure your password is 6 to 15 characters without any white space');
                    element.addClass('has-error');
                } else {
                    v_password = true;
                    $('#password-hint').text('');
                    element.removeClass('has-error');
                }
                break;
            case 'confirm_password':
                if (!passwordPattern.test(element.val()) || element.val() == '' || element.val() != f_password.val()) {
                    v_password_confirm = false;
                    $('#password-confirm-hint').text('Ensure your password matches the one entered above');
                    element.addClass('has-error');
                } else {
                    v_password_confirm = true;
                    $('#password-confirm-hint').text('');
                    element.removeClass('has-error')
                }
                break;
            case 'name_of_church':
                if (!normalStringPattern.test(element.val()) || element.val() == '') {
                    v_church_name = false;
                    $('#church-name-hint').text('Ensure you enter the name of your church');
                    element.addClass('has-error');
                } else {
                    v_church_name = true;
                    $('#church-name-hint').text('');
                    element.removeClass('has-error');
                }
                break;
            case 'name_of_city':
                if (element.val().length < 3 || element.val() == '') {
                    v_church_loc = false;
                    $('#church-location-hint').text('Ensure you enter the location or city of your church');
                    element.addClass('has-error');
                } else {
                    v_church_loc = true;
                    $('#church-location-hint').text('');
                    element.removeClass('has-error');
                }
                break;
            case 'name_of_domain':
                if (!domainRegex.test(element.val()) || element.val() == '') {
                    v_church_domain = false;
                    $('#church-domain-hint').text('Ensure you enter a valid domain');
                    element.addClass('has-error');
                } else {
                    v_church_domain = true;
                    $('#church-domain-hint').text('');
                    element.removeClass('has-error');
                }
                break;
            case 'pastor_name':
                if (element.val() == '' || element.val().length < 3) {
                    v_pastor = false;
                    $('#pastor-hint').text('Ensure pastor\'s is more than two characters');
                    element.addClass('has-error');
                } else {
                    v_pastor = true;
                    $('#pastor-hint').text('');
                    element.removeClass('has-error');
                }
                break;
            case 'church_address':
                if (element.val().length < 4 || element.val() == '') {
                    v_church_address = false;
                    element.addClass('has-error');
                } else {
                    v_church_address = true;
                    element.removeClass('has-error');
                }
                break;
            case 'church_phone':
                if (element.val().length < 7) {
                    v_church_phone = false;
                    $('#church-phone-hint').text('Ensure your enter a valid phone number');
                    element.addClass('has-error');
                } else {
                    v_church_phone = true;
                    $('#church-phone-hint').text('');
                    element.removeClass('has-error');
                }
                break;
            case 'church_email':
                if (!emailPattern.test(element.val()) || element.val() == '') {
                    v_church_email = false;
                    $('#church-email-hint').text('Ensure you enter a valid email');
                    element.addClass('has-error');
                } else {
                    v_church_email = true;
                    $('#church-email-hint').text('');
                    element.removeClass('has-error');
                }
                break;
            case 'web_lead_name':
                if (element.val() == '' || element.val().length < 3) {
                    v_web_lead_name = false;
                    $('#web-lead-name-hint').text('Ensure your Web Lead name is more than 2 characters');
                    element.addClass('has-error');
                } else {
                    v_web_lead_name = true;
                    $('#web-lead-name-hint').text('');
                    element.removeClass('has-error');
                }
                break;
            case 'web_lead_phone':
                if (element.val().length < 7) {
                    v_web_lead_phone = false;
                    $('#web-lead-phone-hint').text('Ensure you enter a valid phone number');
                    element.addClass('has-error');
                } else {
                    v_web_lead_phone = true;
                    $('#web-lead-phone-hint').text('');
                    element.removeClass('has-error');
                }
                break;
            case 'web_lead_email':
                if (!emailPattern.test(element.val()) || element.val() == '') {
                    v_web_lead_email = false;
                    $('#web-lead-email-hint').text('Ensure you enter a valid email address');
                    element.addClass('has-error');
                } else {
                    v_web_lead_email = true;
                    $('#web-lead-email-hint').text('');
                    element.removeClass('has-error');
                }
                break;
        }

        if (v_email == true && v_username == true && v_password == true && v_password_confirm == true) {
            continue0.removeAttr("disabled");
        } else {
            continue0.attr("disabled", true)
        }

        if (v_church_name == true && v_church_loc == true && v_church_domain == true) {
            $('#continue2').removeAttr("disabled");
        } else {
            $('#continue2').attr('disabled', true);
        }

        if (v_pastor == true && v_church_address == true && v_church_phone == true && v_church_email == true) {
            $('#continue4').removeAttr('disabled');
        } else {
            $('#continue4').attr('disabled', true);
        }

        if (v_web_lead_name == true && v_web_lead_phone && v_web_lead_email == true) {
            $('#continue5').removeAttr('disabled');
        } else {
            $('#continue5').attr('disabled', true);
        }
    };

    previewTheme = function () {
        switch (f_theme.val()) {
            case 'California':
                $("#theme_preview_image, #theme_preview_image_review").attr("src", "http://sitesforchurch.s3.amazonaws.com/california_480.png");
                $('#theme_description, #review_theme_description').html('California is a modern church theme, it features promoted series, ministries and events on the home page. For an example visit <a href="http://biblebaptistmattoon.org" target="_blank">biblebaptistmattoon.org</a>');
                break;
            case 'New_England':
                //RENAME THE IMAGE/LOCATION
                $("#theme_preview_image, #theme_preview_image_review").attr("src", "http://sitesforchurch.s3.amazonaws.com/new-england_480.png");
                $('#theme_description, #review_theme_description').html('New England is a subdued and traditional theme that showcases a churches latest sermons and recent photos.  You can check out an example <a href="http://new-england.pubstorm.site" target="_blank"> here</a>');
                break;
            case 'Adore':
                //RENAME THE IMAGE/LOCATION
                $("#theme_preview_image, #theme_preview_image_review").attr("src", "http://sitesforchurch.s3.amazonaws.com/adore.png");
                $('#theme_description, #review_theme_description').html('Adore is a bright and clean theme with a home page slider and unique events listing.  You can check out an example <a href="http://adore-theme.pubstorm.site" target="_blank"> here</a>');
                break;
            case 'Native':
                //RENAME THE IMAGE/LOCATION
                $("#theme_preview_image, #theme_preview_image_review").attr("src", "http://sitesforchurch.s3.amazonaws.com/native_480.png");
                $('#theme_description, #review_theme_description').html('Native is an extremely versatile theme that works great with both traditional and modern styles.  You can check out an example <a href="http://native.pubstorm.site" target="_blank"> here</a>');
                break;
        }
    };

    // SET REVIEW INFORMATION VALUES
    setReviewInfo = function () {
        $('#review_theme_name').text(f_theme.val());

        $('#church_name_preview').text(f_church_name.val());
        $('#church_location_preview').text(f_church_city.val());
        $('#Domain_preview').text(f_church_domain.val());
        $('#checkbox_domain').is(':checked') ? $('#domain_is_purchased').text('Yes') : $('#domain_is_purchased').text('No');

        // CAST SERVICE SCHEDULE INTO AN ARRAY
        var service_array = f_service_schedule.val().split('\n');

        // LOOP THROUGH THE ARRAY AND DISPLAY THE VALUES FOR REVIEW
        service_array.forEach(function (v, k) {
            $("#service-schedule-container").append("<p>" + v + "</p>");
        });
        // LOOP THROUGH THE ARRAY AND DISPLAY THE VALUES FOR REVIEW

        $('#PastorName_preview').text(f_pastor_name.val());
        $('#ChurchAddress_preview').text(f_church_address.val());
        $('#ChurchPhone_preview').text(f_church_phone.val());
        $('#ChurchEmail_preview').text(f_church_email.val());

        $('#WebLeadName_preview').text(f_web_lead_name.val());
        $('#WebLeadPhone_preview').text(f_web_lead_phone.val());
        $('#WebLeadEmail_preview').text(f_web_lead_email.val());
        $('#BestTimeToCall_preview').text(f_best_time_call.val());
    };
    // SET REVIEW INFORMATION VALUES

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
    };

    var placeholder = 'Enter your schedule here...';
    f_service_schedule.val(placeholder);
    f_service_schedule.focus(function () {
        if ($(this).val() === placeholder) {
            $(this).val('');
        }
    });
    f_service_schedule.blur(function () {
        if ($(this).val() === '') {
            $(this).val(placeholder);
        }
    });

    // GOT TO STEP2
    continue0.click(function () {
        $('#step1').fadeOut();
        $('#step2').fadeIn(600);
    });
    // GOT TO STEP2

    // STEP2
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

    // GO TO STEP4
    $('#continue2').click(function () {
        $('#step3').fadeOut();
        $('#step4').fadeIn(600);
    });
    // GO TO STEP4

    // GO TO STEP5
    $('#continue3').click(function () {
        $('#step4').fadeOut();
        $('#step5').fadeIn(600);
    });
    // GO TO STEP5

    // GO TO STEP6
    $('#continue4').click(function () {
        $('#step5').fadeOut();
        $('#step6').fadeIn(600);
    });
    // GO TO STEP6

    // GO TO STEP7
    $('#continue5').click(function () {
        setReviewInfo();
        $('#step6').fadeOut();
        $('#step7').fadeIn(600);
    });
    // GO TO STEP7

    // GOT TO STEP8
    $('#continue6').click(function () {
        $('#step7').fadeOut();
        $('#step8').fadeIn(600);
        sendToAirbase();
    });
    // GOT TO STEP8

});
// CONTROL SIGNUP PROCESS