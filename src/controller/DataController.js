import firebase from 'firebase/app';
require('firebase/database');

export default class DataController {
    
    constructor() {
         var config = {
            apiKey: "AIzaSyD9olIyXsfrPYj5YD7qu8qIiQDLW_6oCTE",
            authDomain: "bhuvan-app.firebaseapp.com",
            databaseURL: "https://bhuvan-app.firebaseio.com/",
            projectId: "bhuvan-app",
            storageBucket: "bhuvan-app.appspot.com",
            messagingSenderId: "169493114349"
        };
        firebase.initializeApp(config);
        this.custref = firebase.database().ref().child('customers/');
    }
    
    add(key, value) {
        
        var t = firebase.database().ref("customers/"+key+"/");
        t.set(value);
    }
    
    async find(key, value) {
        let ref = this.custref.orderByChild(key).equalTo(value);
        let snapref = await (ref.once('value'));
        return snapref.val();
    }
    
    async findById(id) {
        let custref = (firebase.database().ref().child('customers/'+id));     
        let snapref =  await (custref.once('value'));
        return snapref.val();
    }
    
    async findByName(value) {
        let ref = this.custref.orderByChild('name').equalTo(value);
        let snapref = await (ref.once('value'));
        return snapref.val();
    }
    
    async fuzzyFind(key, value) {
        let ref = this.custref.orderByChild(key)
        .startAt(value).endAt(value+'\uf8ff');
        let snapref = await (ref.once('value'));
        return snapref.val();
    }
    
     async getAll() {
        let ref = this.custref;
        let snapref = await (ref.once('value'));
        return snapref.val();
    }
    
    updateById(id ,value) {
        let ref = (firebase.database().ref().child('customers/'+id));
        ref.set(value);
    }
    
    async onCreate(fn) {
        firebase.database().ref('customers/').on('child_added', snapref => {   
             const diff = new Date().getTime() - snapref.val()['id'];
             if(diff < 60000 && diff > (-60000)){
                console.log('Data created');
                console.log(snapref.val());
                fn(snapref.val());
             }
        });
    }
    
    async onRemove(fn) {
        firebase.database().ref('customers/').on('child_removed', snapref => {   
             console.log('Data removed');
             console.log(snapref.val());
             fn(snapref.val());
        });
    }
    
    async onChange(fn) {
        console.log('attaching onModify listener');
        firebase.database().ref('customers/').on('child_changed', snapref => {   
             const diff = new Date().getTime() - snapref.val()['id'];
             console.log('Data modified');
            // if(diff < 60000 && diff > (-60000))
             {
                 console.log(snapref.val());
                 fn(snapref.val());
             }
        });
    }
    
    deleteById(id) {
        let custref = (firebase.database().ref().child('customers/'+id));
        custref.remove();
    }
    
    
}