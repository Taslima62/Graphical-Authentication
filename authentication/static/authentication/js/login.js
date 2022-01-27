var currentTab = 0; // Current tab is set to be the first tab (0)
// showTab(currentTab); // Display the current tab
var password_place;
var selected_place = '';
const password = JSON.parse(document.getElementById('password').textContent);
const user_id = JSON.parse(document.getElementById('user_id').textContent);
const images1 = JSON.parse(document.getElementById('images1').textContent);
const images2 = JSON.parse(document.getElementById('images2').textContent);
const images3 = JSON.parse(document.getElementById('images3').textContent);
const images4 = JSON.parse(document.getElementById('images4').textContent);
const d_images = JSON.parse(document.getElementById('d_image').textContent);
// var salt = password.slice(16)
var passImage1 = ""; 
var passImage2 = ""; 
var passImage3 = ""; 
var passImage4 = ""; 

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
const salt = genRanHex(16);
showTab(currentTab);
function showTab(n) {
  //console.log("curTab");
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").style.display = "none";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n);
  changeImages(n);

}
function getPasswordImage(){
  var i;
  if(currentTab == 0){
    for(i = 0;i<images1.length;i++){
      var h = CryptoJS.PBKDF2(images1[i], salt, {
        keySize: 128 / 32
      });
      if(h == password.slice(16,48)){
        passImage1 = images1[i];
        console.log("image1 "+passImage1)
        return images1[i],i;
      }
    }
  }
  else if(currentTab == 1){
    for(i = 0;i<images2.length;i++){
      var h = CryptoJS.PBKDF2(images2[i], salt, {
        keySize: 128 / 32
      });
      if(h == password.slice(48,80)){
        passImage2 = images2[i];
        return images2[i],i;
      }
    }
  }
  else if(currentTab == 2){
    for(i = 0;i<images3.length;i++){
      var h = CryptoJS.PBKDF2(images3[i], salt, {
        keySize: 128 / 32
      });
      if(h == password.slice(80,112)){
        passImage3 = images3[i];
        return images3[i],i;
      }
    }
  }
  else if(currentTab == 3){
    for(i = 0;i<images4.length;i++){
      var h = CryptoJS.PBKDF2(images4[i], salt, {
        keySize: 128 / 32
      });
      if(h == password.slice(112,144)){
        passImage4 = images4[i];
        return images4[i],i;
      }
    }
  }
}
function changeImages(n) {
  // const mydata = JSON.parse(document.getElementById('mydata').textContent);
  var PassImage, k = getPasswordImage()
  var p = Math.floor(Math.random() * 16) + 1;
  var arr = [];
  arr.push(k);
  while (arr.length < 16) {
    var r = Math.floor(Math.random() * 24) + 1;
    if (arr.indexOf(r) === -1) {
      arr.push(r);
    }
  }
  var image = ['0', '11', '12', '13', '14', '21', '22', '23', '24', '31', '32', '33', '34', '41', '42', '43', '44'];
  var i, j, c = 1;
  for (i = 1; i < 5; i++) {
    for (j = 1; j < 5; j++) {
      var im = currentTab.toString() + i.toString() + j.toString();
      var place = i.toString() + j.toString();
      if (place == image[p].toString()) {
        // if(n==0){
        //   password_place = place  
        // }
        // else password_place += place;
        // console.log('pass:'+password_place);
        document.getElementById(im).src = "../../static/authentication/images/flower/" + PassImage + ".jpg";
      }
      //document.write(im)
      else {
        if(currentTab == 0){
        document.getElementById(im).src = "../../static/authentication/images/flower/" + images1[arr[c]] + ".jpg";
        }
        else if(currentTab == 1){
          document.getElementById(im).src = "../../static/authentication/images/flower/" + images2[arr[c]] + ".jpg";
        }
        else if(currentTab == 2){
          document.getElementById(im).src = "../../static/authentication/images/flower/" + images3[arr[c]] + ".jpg";
        }
        else if(currentTab == 3){
          document.getElementById(im).src = "../../static/authentication/images/flower/" + images4[arr[c]] + ".jpg";
        }
        c++;
      }
    }
  }

}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      if (currentTab > 0 && currentTab < 5) alert("Select an image");
      alert("Select an image");
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

function displayme(a, b) {
  selected_place += a;
  console.log('select:'+ selected_place);
  if(b==4){
    document.getElementById('select_place').value = selected_place
  }
  nextPrev(1);
}

