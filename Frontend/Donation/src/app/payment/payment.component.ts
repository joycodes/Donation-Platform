import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentHandler:any = null;

  constructor() { }

    ngOnInit() {
      this.invokeStripe();
    }
    
    initializePayment(amount: number) {
      const paymentHandler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_51LIDDSAfYfHAxyttb72XX4MNf8FjpxLvKFeY3SlVJaB4mcJCQuJ4VtrAUxRhAL0pIPurvayAKX5dxOrYvfW8TJ0P00RyT9dSEa',
        locale: 'auto',
        token: function (stripeToken: any) {
          console.log({stripeToken})
          alert('Stripe token generated!');
        }
      });
    
      paymentHandler.open({
        name: 'Donation',
        description: 'This is a donation app',
        amount: amount * 100
      });
    }
    
    invokeStripe() {
      if(!window.document.getElementById('stripe-script')) {
        const script = window.document.createElement("script");
        script.id = "stripe-script";
        script.type = "text/javascript";
        script.src = "https://checkout.stripe.com/checkout.js";
        script.onload = () => {
          this.paymentHandler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb',
            locale: 'auto',
            token: function (stripeToken: any) {
              console.log(stripeToken)
              alert('Payment has been successfull!');
            }
          });
        }
        window.document.body.appendChild(script);
      }
    }
  
  }
  