let signUp=()=>{
    var email =document.getElementById('email').value
    var password =document.getElementById('password').value
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      
      window.location.href="signin.html"
console.log(user);
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log(errorMessage);
    });
}

 
let signIn=()=>{
  var email =document.getElementById('s-email').value
  var password =document.getElementById('s-password').value
  firebase.auth().signInWithEmailAndPassword(email, password)
 .then((userCredential) => {
    var user = userCredential.user;
console.log(user);
window.location.href="restaurent.html"
})
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  console.log(errorMessage);
  });
}

let signInU=()=>{
  var email =document.getElementById('u-email').value
  var password =document.getElementById('u-password').value
  firebase.auth().signInWithEmailAndPassword(email, password)
 .then((userCredential) => {
    var user = userCredential.user;
console.log(user);
window.location.href="user.html"
})
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  console.log(errorMessage);
  });
}






var imgName;

let send=()=> {
  var img=document.getElementById('file').files[0]
  console.log(img);
   imgName =img.name
  var select= document.getElementById("Select").value
console.log(select);
var itemn =document.getElementById("itemn").value
var price =document.getElementById("price").value
var restraunt =document.getElementById("Restaurent").value

var Delivery =document.getElementById("Delivery").value

var storage = firebase.storage().ref("images").child(imgName)
storage.put(img).then((sucses)=>{
  console.log(sucses)
}).catch((error)=>{
  console.log(error)
})
firebase.storage().ref("images").child(imgName).getDownloadURL().then((url)=>{
  console.log(url)
// console.log(itemn,price,Delivery);
let obj={
  url,
    select,
    itemn,
    price,
    Delivery,
    restraunt,
}
console.log(obj);
var key = Math.random()*12345
firebase.database().ref("cart").push(obj)

}).catch((error)=>{
  console.log(error);
})

  }

  
  let get=()=>{

  firebase.database().ref("cart").on("child_added",function(data){
    var a =data.val() 
    console.log("cart data ==>", a);
    let main =document.getElementById('cart1')
   main.innerHTML+=`
  <div class="card" style="width: 18rem;  margin-top: 10px; border: 3px solid skyblue;">
    <img src="${a.url}" style="width: 100%; class="card-img-top" alt="...">
    <div class="card-body" >
    <h5 style=" border-bottom: 1px solid skyblue;"  class="card-title">${a.select +"<br>"}</h5>
      <h5 style=" border-bottom: 1px solid skyblue;"  class="card-title">${a.restraunt +"<br>"}</h5>
      <p style=" border-bottom: 1px solid skyblue;"  class="card-text">${a.price}</p>
      <p style=" border-bottom: 1px solid skyblue;"  class="card-text">${a.Delivery}</p>
      <button onclick='addToCart("${a.select}","${a.price}","${a.restraunt}","${a.url}","${a.Delivery}")' class="btn btn-primary">Order Now</button> 
      
    </div>
  </div> `
   })
  

}

 function addToCart(category,price,restraunt,img,deliver){
  var obj={category,
      price,
      restraunt,img,
      deliver}
      console.log(obj);
 firebase.database().ref('order').push(obj)
    }

let load=()=>{
  firebase.database().ref("cart").once("value",function(data){
    console.log( data.val())  
 })
 get()
}
// }

let loadOrder=()=>{
  firebase.database().ref('order').once("value",function(data){
    console.log("load...>>", data.val())  
 })
 order()
}
let order=()=>{

  firebase.database().ref('order').on("child_added",function(data){
    var b =data.val() 
    console.log("order data ==>", b);
    let main =document.getElementById('ord')
   main.innerHTML+=`
  <div class="card" style="width: 18rem;  margin-top: 10px; border: 5px solid white;">
    <img src="${b.img}" style="width: 100%; class="card-img-top" alt="...">
    <div class="card-body">
    <h5 style=" border-bottom: 1px solid skyblue;"  class="card-title">${b.category +"<br>"}</h5>
      <h5 style=" border-bottom: 1px solid skyblue;"  class="card-title">${b.restraunt +"<br>"}</h5>
      <p style=" border-bottom: 1px solid skyblue;"  class="card-text">${b.price}</p>
       <p style=" border-bottom: 1px solid skyblue;"  class="card-text">${b.deliver}</p>
       <button onclick='accepted("${b.img}","${b.category}","${b.restraunt}","${b.price}","${b.deliver}")' class="btn btn-primary">Accepted</button>

      </div>
  </div> `
   })
}

function accepted(aceptimg,aceptcategory,aceptrestraunt,aceptpraice,aceptdelivery){
  // console.log(aceptimg);
  // console.log(aceptpraice);
  // console.log(aceptrestraunt);
  // console.log(aceptcategory);
  // console.log(aceptdelivery);
let accepted={
  aceptimg,aceptcategory,aceptrestraunt,aceptpraice,aceptdelivery
}
firebase.database().ref('accepted').push(accepted)
}

let loadAccepte=()=>{
  firebase.database().ref('accepted').once("value",function(data){
    console.log("loadAccepted>>", data.val())  
 })
 accepte()
}
let accepte=()=>{

  firebase.database().ref('accepted').on("child_added",function(data){
    var q =data.val() 
    console.log("accepted data ==>", q);
    let main =document.getElementById('accepte')
   main.innerHTML+=`
  <div class="card" style="width: 18rem;  margin-top: 10px; border: 5px solid white;">
    <img src="${q.aceptimg}" style="width: 100%; class="card-img-top" alt="...">
    <div class="card-body">
    <h5 style=" border-bottom: 1px solid skyblue;"  class="card-title">${q.aceptcategory +"<br>"}</h5>
      <h5 style=" border-bottom: 1px solid skyblue;" class="card-title">${q.aceptrestraunt +"<br>"}</h5>
      <p  style=" border-bottom: 1px solid skyblue;"class="card-text">${q.aceptpraice}</p>
       <p  style=" border-bottom: 1px solid skyblue;"class="card-text">${q.aceptdelivery}</p>
       <button onclick='rejected("${q.aceptimg}","${q.aceptcategory}","${q.aceptrestraunt}","${q.aceptpraice}","${q.aceptdelivery}")' class="btn btn-primary ms-3" >Rejected</button>
       <button onclick='delivered("${q.aceptimg}","${q.aceptcategory}","${q.aceptrestraunt}","${q.aceptpraice}","${q.aceptdelivery}")' class="btn btn-primary ms-5">Deliver</button> 
    </div>
  </div> `
   })
}

let rejected=(rejimg,rejcategory,rejrestraunt,rejprice,rejdelivery)=>{
  // console.log(rejimg);
  // console.log(rejcategory);
  // console.log(rejrestraunt);
  // console.log(rejprice);
  // console.log(rejdelivery);

  let reject={rejimg,
    rejcategory,
    rejrestraunt,
    rejprice,
    rejdelivery}
    firebase.database().ref('reject').push(reject)
}

let loadReject=()=>{
  firebase.database().ref('reject').once("value",function(data){
    console.log("loadreject>>", data.val())  
 })
 reject()
}
let reject=()=>{

  firebase.database().ref('reject').on("child_added",function(data){
    var r =data.val() 
    console.log("reject data ==>", r);
    let reje =document.getElementById('rejected')
   reje.innerHTML+=`
  <div class="card" style="width: 18rem;  margin-top: 10px; border: 3px solid skyblue;">
    <img src="${r.rejimg}" style="width: 100%; class="card-img-top" alt="...">
    <div class="card-body">
    <h5 style=" border-bottom: 1px solid skyblue;"  class="card-title">${r.rejcategory +"<br>"}</h5>
      <h5 style=" border-bottom: 1px solid skyblue;"  class="card-title">${r.rejrestraunt +"<br>"}</h5>
      <p style=" border-bottom: 1px solid skyblue;"  class="card-text">${r.rejprice}</p>
       <p style=" border-bottom: 1px solid skyblue;"  class="card-text">${r.rejdelivery}</p>
    </div>
  </div> `
   })
}



let delivered=(delimg,delcategory,delrestraunt,delprice,deldelivery)=>{
  console.log(delimg);
  console.log(delcategory);
  console.log(delrestraunt);
  console.log(delprice);
  console.log(deldelivery);

  let deliv={delimg,delcategory,delrestraunt,delprice,deldelivery}
    firebase.database().ref('delivered').push(deliv)
}

let loadDeliver=()=>{
  firebase.database().ref('delivered').once("value",function(data){
    console.log("load delivered", data.val())  
 })
 delv()
}
let delv=()=>{

  firebase.database().ref('delivered').on("child_added",function(data){
    var d =data.val() 
    console.log("reject data ==>", d);
    let delive =document.getElementById('delivered')
    delive.innerHTML+=`
  <div class="card" style="width: 18rem;  margin-top: 10px; border: 3px solid skyblue;">
    <img src="${d.delimg}" style="width: 100%; class="card-img-top" alt="...">
    <div class="card-body">
    <h5 style=" border-bottom: 1px solid skyblue;"  class="card-title">${d.delcategory +"<br>"}</h5>
      <h5 style=" border-bottom: 1px solid skyblue;"  class="card-title">${d.delrestraunt +"<br>"}</h5>
      <p style=" border-bottom: 1px solid skyblue;"  class="card-text">${d.delprice}</p>
       <p style=" border-bottom: 1px solid skyblue;"  class="card-text">${d.deldelivery}</p>
    </div>
  </div> `
   })
}
