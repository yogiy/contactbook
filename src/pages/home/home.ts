import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Contacts, Contact } from '@ionic-native/contacts';
import { parseNumber } from 'libphonenumber-js'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  phone_no: any;
  constructor(
    public alertCtrl: AlertController,
    private contacts: Contacts,
    public navCtrl: NavController
  ) {

    // this.getcontact();
  }

  getcontact() {
    this.contacts.pickContact().then((res: Contact) => {
      console.log("Get contact Success");
      console.log(res);
      console.log(res.phoneNumbers);
      this.showRadio(res.phoneNumbers);
    }).catch(err => {
      console.log("Get contact Error");
      console.log(err);
    });
  }


  showRadio(list:any) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Phone no to use');

    for(var i=0; i<list.length; i++){
      alert.addInput({
        type: 'radio',
        label: list[i].value,
        value: list[i].value
      });
    }
    
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if(data != undefined){
          console.log("DATA in btn ok");
          console.log(data);
          console.log("----------------------------------");
          let res = parseNumber(data) ;
          console.log(res.phone);
          if(res.phone != undefined){
            this.phone_no = res.phone;
          }else{
            this.phone_no = data;
          }  
        }else{
          console.log("No number selected");
        }
      }
    });
    alert.present();
  }

}
