/**
 * Created by RobertoRolon on 4/23/16.
 */

(function() {
    'use strict';

    angular.module('app')
        .factory('PaymentService', PaymentService);


    PaymentService.$inject = ['HttpRequestService'];

    function PaymentService(HttpRequestService) {

        return {
            PostPayment : postPayment
        }

        function postPayment(paymentObject, callback) {
            if(paymentObject.exp_month && !isNaN(paymentObject.exp_month)) {
                var firstDigit = +paymentObject.exp_month[0].trim();
                var secondDigit = +paymentObject.exp_month[1];
                var thirdDigit = +paymentObject.exp_month[2];

                if(firstDigit == 0 && (secondDigit === undefined || secondDigit === null || isNaN(secondDigit) || secondDigit == 0 )) {callback({errorMessage: 'InValid Expiration Month' }); return;}

                if(!secondDigit) { paymentObject.exp_month = "0" + firstDigit;}
                else {
                    if(firstDigit == 0 && thirdDigit)  paymentObject.exp_month.slice(0, 2);

                    if(firstDigit != 0 && secondDigit > 2) {callback({errorMessage: 'InValid Expiration Month' }); return;}

                    if(firstDigit > 1) {callback({errorMessage: 'InValid Expiration Month' }); return;}
                }
            }else {
                callback({errorMessage: "Expiration Month has not been entered or it\'s not a valid integer"});return;
            }

            var cardObject = createCardObject(paymentObject);

            if (!cardObject.isValid) {
                callback({errorMessage: 'Card Information is not valid'});
            }else {
                requestStripePayment(cardObject.cardObject, function(err, result) {
                    if(err) {
                        callback(err);
                    }else {
                        callback(null, result);
                    }
                });
            }
        }

        function requestStripePayment(cardObject, callback) {
            Stripe.setPublishableKey('pk_test_muGkZFj1QFCCRabaHoRK8TQS');
            Stripe.card.createToken(cardObject, handleResponse);

            function handleResponse(status, response) {
                if (status != 200) {
                    callback({errorMessage: response.error.message});
                }else {
                    callback(null, {token :response.id});
                }
            }
        }

        function createCardObject(paymentObject) {
            var cardObject = {number: paymentObject.number+"", cvc: paymentObject.cvc+"", exp_month: +paymentObject.exp_month, exp_year: +paymentObject.exp_year};
            return {isValid: validateCardObject(cardObject), cardObject: cardObject};
        }

        function validateCardObject(cardObject) {
            return (Stripe.card.validateCardNumber(cardObject.number) && Stripe.card.validateCVC(cardObject.cvc)
            && Stripe.card.validateExpiry(cardObject.exp_month + ' ' + cardObject.exp_year));
        }
    }
})();