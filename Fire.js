import firebase from "firebase";
import "@firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDRH-vC_QHKS9M3qq_FxfVmT4l67vlcihI",
    authDomain: "todo-db794.firebaseapp.com",
    databaseURL: "https://todo-db794.firebaseio.com",
    projectId: "todo-db794",
    storageBucket: "todo-db794.appspot.com",
    messagingSenderId: "249543095198",
    appId: "1:249543095198:web:07fc71e759ed28b0629c8f"
  };
class Fire {

    constructor(callback){
        this.init(callback)
    }

    init(callback){
        if(!firebase.apps.length){
                firebase.initializeApp(firebaseConfig)
        }

        firebase.auth().onAuthStateChanged(user => {
            if(user){
                callback(null, user)

            } else {
                firebase
                .auth()
                .signInAnonymously()
                .catch(error => {
                    callback(error)

                })
            }
        });


    }
    getLists(callback){
        let ref= this.ref.orderBy("name");

                this.unsubscribe = ref.onSnapshot(snapshot => {
                    lists = []
                    snapshot.forEach(doc => {
                        lists.push({id: doc.id, ...doc.data() })
                    })
                    callback(lists)
                })
    }

    deleteList(list){
        let ref = this.ref;
        ref.doc(list.id).delete()
    }

    updateList(list){
        let ref = this.ref
        ref.doc(list.id).update(list)
    }

    get userId() {
        return firebase.auth().currentUser.uid
    }

    addList(list){
        let ref= this.ref

        ref.add(list);
    }

    get ref() {
        return firebase
        .firestore()
        .collection("users")
        .doc(this.userId)
        .collection("lists"); 
    }

    detach(){
        this.unsubscribe();
    }











}
export default Fire;