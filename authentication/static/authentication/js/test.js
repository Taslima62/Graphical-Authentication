// const CryptoJS = require('crypto-js');
// document.writeln("<script type='text/javascript' src='/pbkdf2.js'></script>");


// document.getElementById("ab").innerHTML = h


/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
// */
var CryptoJS = CryptoJS || function (g, j) {
  var e = {}, d = e.lib = {}, m = function () { }, n = d.Base = { extend: function (a) { m.prototype = this; var c = new m; a && c.mixIn(a); c.hasOwnProperty("init") || (c.init = function () { c.$super.init.apply(this, arguments) }); c.init.prototype = c; c.$super = this; return c }, create: function () { var a = this.extend(); a.init.apply(a, arguments); return a }, init: function () { }, mixIn: function (a) { for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]); a.hasOwnProperty("toString") && (this.toString = a.toString) }, clone: function () { return this.init.prototype.extend(this) } },
  q = d.WordArray = n.extend({
      init: function (a, c) { a = this.words = a || []; this.sigBytes = c != j ? c : 4 * a.length }, toString: function (a) { return (a || l).stringify(this) }, concat: function (a) { var c = this.words, p = a.words, f = this.sigBytes; a = a.sigBytes; this.clamp(); if (f % 4) for (var b = 0; b < a; b++)c[f + b >>> 2] |= (p[b >>> 2] >>> 24 - 8 * (b % 4) & 255) << 24 - 8 * ((f + b) % 4); else if (65535 < p.length) for (b = 0; b < a; b += 4)c[f + b >>> 2] = p[b >>> 2]; else c.push.apply(c, p); this.sigBytes += a; return this }, clamp: function () {
          var a = this.words, c = this.sigBytes; a[c >>> 2] &= 4294967295 <<
              32 - 8 * (c % 4); a.length = g.ceil(c / 4)
      }, clone: function () { var a = n.clone.call(this); a.words = this.words.slice(0); return a }, random: function (a) { for (var c = [], b = 0; b < a; b += 4)c.push(4294967296 * g.random() | 0); return new q.init(c, a) }
  }), b = e.enc = {}, l = b.Hex = {
      stringify: function (a) { var c = a.words; a = a.sigBytes; for (var b = [], f = 0; f < a; f++) { var d = c[f >>> 2] >>> 24 - 8 * (f % 4) & 255; b.push((d >>> 4).toString(16)); b.push((d & 15).toString(16)) } return b.join("") }, parse: function (a) {
          for (var c = a.length, b = [], f = 0; f < c; f += 2)b[f >>> 3] |= parseInt(a.substr(f,
              2), 16) << 24 - 4 * (f % 8); return new q.init(b, c / 2)
      }
  }, k = b.Latin1 = { stringify: function (a) { var c = a.words; a = a.sigBytes; for (var b = [], f = 0; f < a; f++)b.push(String.fromCharCode(c[f >>> 2] >>> 24 - 8 * (f % 4) & 255)); return b.join("") }, parse: function (a) { for (var c = a.length, b = [], f = 0; f < c; f++)b[f >>> 2] |= (a.charCodeAt(f) & 255) << 24 - 8 * (f % 4); return new q.init(b, c) } }, h = b.Utf8 = { stringify: function (a) { try { return decodeURIComponent(escape(k.stringify(a))) } catch (b) { throw Error("Malformed UTF-8 data"); } }, parse: function (a) { return k.parse(unescape(encodeURIComponent(a))) } },
  u = d.BufferedBlockAlgorithm = n.extend({
      reset: function () { this._data = new q.init; this._nDataBytes = 0 }, _append: function (a) { "string" == typeof a && (a = h.parse(a)); this._data.concat(a); this._nDataBytes += a.sigBytes }, _process: function (a) { var b = this._data, d = b.words, f = b.sigBytes, l = this.blockSize, e = f / (4 * l), e = a ? g.ceil(e) : g.max((e | 0) - this._minBufferSize, 0); a = e * l; f = g.min(4 * a, f); if (a) { for (var h = 0; h < a; h += l)this._doProcessBlock(d, h); h = d.splice(0, a); b.sigBytes -= f } return new q.init(h, f) }, clone: function () {
          var a = n.clone.call(this);
          a._data = this._data.clone(); return a
      }, _minBufferSize: 0
  }); d.Hasher = u.extend({
      cfg: n.extend(), init: function (a) { this.cfg = this.cfg.extend(a); this.reset() }, reset: function () { u.reset.call(this); this._doReset() }, update: function (a) { this._append(a); this._process(); return this }, finalize: function (a) { a && this._append(a); return this._doFinalize() }, blockSize: 16, _createHelper: function (a) { return function (b, d) { return (new a.init(d)).finalize(b) } }, _createHmacHelper: function (a) {
          return function (b, d) {
              return (new w.HMAC.init(a,
                  d)).finalize(b)
          }
      }
  }); var w = e.algo = {}; return e
}(Math);
(function () {
  var g = CryptoJS, j = g.lib, e = j.WordArray, d = j.Hasher, m = [], j = g.algo.SHA1 = d.extend({
      _doReset: function () { this._hash = new e.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]) }, _doProcessBlock: function (d, e) {
          for (var b = this._hash.words, l = b[0], k = b[1], h = b[2], g = b[3], j = b[4], a = 0; 80 > a; a++) {
              if (16 > a) m[a] = d[e + a] | 0; else { var c = m[a - 3] ^ m[a - 8] ^ m[a - 14] ^ m[a - 16]; m[a] = c << 1 | c >>> 31 } c = (l << 5 | l >>> 27) + j + m[a]; c = 20 > a ? c + ((k & h | ~k & g) + 1518500249) : 40 > a ? c + ((k ^ h ^ g) + 1859775393) : 60 > a ? c + ((k & h | k & g | h & g) - 1894007588) : c + ((k ^ h ^
                  g) - 899497514); j = g; g = h; h = k << 30 | k >>> 2; k = l; l = c
          } b[0] = b[0] + l | 0; b[1] = b[1] + k | 0; b[2] = b[2] + h | 0; b[3] = b[3] + g | 0; b[4] = b[4] + j | 0
      }, _doFinalize: function () { var d = this._data, e = d.words, b = 8 * this._nDataBytes, l = 8 * d.sigBytes; e[l >>> 5] |= 128 << 24 - l % 32; e[(l + 64 >>> 9 << 4) + 14] = Math.floor(b / 4294967296); e[(l + 64 >>> 9 << 4) + 15] = b; d.sigBytes = 4 * e.length; this._process(); return this._hash }, clone: function () { var e = d.clone.call(this); e._hash = this._hash.clone(); return e }
  }); g.SHA1 = d._createHelper(j); g.HmacSHA1 = d._createHmacHelper(j)
})();
(function () {
  var g = CryptoJS, j = g.enc.Utf8; g.algo.HMAC = g.lib.Base.extend({
      init: function (e, d) { e = this._hasher = new e.init; "string" == typeof d && (d = j.parse(d)); var g = e.blockSize, n = 4 * g; d.sigBytes > n && (d = e.finalize(d)); d.clamp(); for (var q = this._oKey = d.clone(), b = this._iKey = d.clone(), l = q.words, k = b.words, h = 0; h < g; h++)l[h] ^= 1549556828, k[h] ^= 909522486; q.sigBytes = b.sigBytes = n; this.reset() }, reset: function () { var e = this._hasher; e.reset(); e.update(this._iKey) }, update: function (e) { this._hasher.update(e); return this }, finalize: function (e) {
          var d =
              this._hasher; e = d.finalize(e); d.reset(); return d.finalize(this._oKey.clone().concat(e))
      }
  })
})();
(function () {
  var g = CryptoJS, j = g.lib, e = j.Base, d = j.WordArray, j = g.algo, m = j.HMAC, n = j.PBKDF2 = e.extend({
      cfg: e.extend({ keySize: 4, hasher: j.SHA1, iterations: 1 }), init: function (d) { this.cfg = this.cfg.extend(d) }, compute: function (e, b) {
          for (var g = this.cfg, k = m.create(g.hasher, e), h = d.create(), j = d.create([1]), n = h.words, a = j.words, c = g.keySize, g = g.iterations; n.length < c;) {
              var p = k.update(b).finalize(j); k.reset(); for (var f = p.words, v = f.length, s = p, t = 1; t < g; t++) { s = k.finalize(s); k.reset(); for (var x = s.words, r = 0; r < v; r++)f[r] ^= x[r] } h.concat(p);
              a[0]++
          } h.sigBytes = 4 * c; return h
      }
  }); g.PBKDF2 = function (d, b, e) { return n.create(e).compute(d, b) }
})();

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
// const salt = "c3d3241f5218025c";
// var s = "hpULsYRpaGAvJIZSBa";
// var h = CryptoJS.PBKDF2(s, salt, {
//     keySize: 128 / 32
// });
// var h1 = CryptoJS.PBKDF2(s, salt, {
//     keySize: 128 / 32
// });
// // if(h == h1){
// //     console.log("Matched");
// // }
// h = h.toString();
// console.log("value: "+ h);
// 5e536e7dd4effbb7d6baf2bc8559ec72
// c3d3241f5218025c5e536e7dd4effbb7d6baf2bc8559ec720b9b6576639f62f438fe8947bfc525a9deed4b662ea167837ffaeac0f634035610018170103465cae93071653ad001db7b72b741770a38a975a7f2e7a1f65aaf
// h1 = h1.toString();
// if(h == h1){
//     console.log("Matched");
// }
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
var salt = password.slice(0,16)
// console.log("salt : "+ salt);
var passImage1 = ""; 
var passImage2 = ""; 
var passImage3 = ""; 
var passImage4 = ""; 
var direction = "";
var passImage ="";
var image_id;
var password_place = "";
var selected_place = "";


// console.log("Password "+ password);
// // 7b72b741770a38a975a7f2e7a1f65aaf
// const salt1 = "c3d3241f5218025c";
// var s = "DNVNqwfvuup0zPgWSJ6";
// var s1 = password.slice(144,176)
// var h = CryptoJS.PBKDF2(s, salt1, {
//     keySize: 128 / 32
// });

// if(h == s1){
//     console.log("Matched");
// }
// h = h.toString();
// if(h == s1){
//     console.log("Matched 2");
// }
function getDirectionImage(){
   var i; 
  for(i = 0;i<d_images.length;i++){
      var h = CryptoJS.PBKDF2(d_images[i], salt, {
        keySize: 128 / 32
      });
      console.log("D:"+d_images[i])
      if(h == password.slice(144,176)){
        direction += d_images[i];
        console.log("direction:" + direction)
        return;
      }
  }
}
getDirectionImage();
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

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function changeImages(n) {
  // const mydata = JSON.parse(document.getElementById('mydata').textContent);
  getPasswordImage();
  console.log(passImage1);
  var p = Math.floor(Math.random() * 16) + 1;
  var arr = [];
  arr.push(image_id);
  var t = 0;
  while (arr.length < 16) {
      var u = Math.floor(Math.random() * 16) + 1;
      u = u%2;
    if(u==0 && t < 6) {
      w = (user_id+8)%8;
      var r = getRandomArbitrary(w,w+8)
      if (arr.indexOf(r) === -1) {
          arr.push(r);
          t +=1;
          // console.log(r)
        }
    }
    else {var r = Math.floor(Math.random() * 49) + 1;
    if (arr.indexOf(r) === -1) {
      arr.push(r);
      // console.log(r)
    }
  }
  }
  var image = ['0', '11', '12', '13', '14', '21', '22', '23', '24', '31', '32', '33', '34', '41', '42', '43', '44'];
  var i, j, c = 1;
  for (i = 1; i < 5; i++) {
    for (j = 1; j < 5; j++) {
      var im = currentTab.toString() + i.toString() + j.toString();
      var place = i.toString() + j.toString();
      
      if (place == image[p].toString()) {
         if(direction == "DNVNqwfvuup0zPgWSJ6"){
             if(i==1){
              password_place += place;  
             }
             else password_place += (i-1).toString() + j.toString();
         }
      else if(direction == "T6djfdLs2K9btKv74"){
          if(i==4){
           password_place += place;  
          }
          else password_place += (i+1).toString() + j.toString();
      }
      else if(direction == "vaSLDSWda7NQ"){
          if(j==1){
           password_place += place;  
          }
          else password_place += i.toString() + (j-1).toString();
      }
      else if(direction == "PWDPE"){
          if(j==4){
           password_place += place;  
          }
          else password_place += i.toString() + (j+1).toString();
      }
      else if(direction == "QxKMdfkswT"){
          if(i==1 || j==1){
           password_place += place;  
          }
          else password_place += (i-1).toString() + (j-1).toString();
      }
      else if(direction == "VmdvYcEJEg"){
          if(i==1 || j==4){
           password_place += place;  
          }
          else password_place += (i-1).toString() + (j+1).toString();
      }
      else if(direction == "CQh24StI6"){
          if(i==4 || j==1){
           password_place += place;  
          }
          else password_place += (i+1).toString() + (j-1).toString();
      }
      else if(direction == "3XfWRQHhDoSZ5KH3"){
          if(i==4 || j==4){
           password_place += place;  
          }
          else password_place += (i+1).toString() + (j+1).toString();
      }
      console.log("pass_place:"+ password_place+"   "+passImage +","+ im)
        document.getElementById(im).src = "../../static/authentication/images/flower/" + passImage + ".jpg";
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

function getPasswordImage(){
  var i;
  if(currentTab == 0){
    for(i = 0;i<images1.length;i++){
      var h = CryptoJS.PBKDF2(images1[i], salt, {
        keySize: 128 / 32
      });
      // console.log("image1 kgkhj "+ images1[i]);
      // console.log("hash  "+h);
      // console.log(password.slice(16,48));
      if(h == password.slice(16,48)){
        passImage = images1[i];
        passImage1 = images1[i];
        image_id = i;
        return;
      }
  }
}
  else if(currentTab == 1){
    for(i = 0;i<images2.length;i++){
      var h = CryptoJS.PBKDF2(images2[i], salt, {
        keySize: 128 / 32
      });
      if(h == password.slice(48,80)){
          passImage = images2[i];
          passImage2 = images2[i];
          image_id = i;
          return;
      }
    }
  }
  else if(currentTab == 2){
    for(i = 0;i<images3.length;i++){
      var h = CryptoJS.PBKDF2(images3[i], salt, {
        keySize: 128 / 32
      });
      if(h == password.slice(80,112)){
          passImage = images3[i];
          passImage3 = images3[i];
          image_id = i;
          return;
      }
    }
  }
  else if(currentTab == 3){
    for(i = 0;i<images4.length;i++){
      var h = CryptoJS.PBKDF2(images4[i], salt, {
        keySize: 128 / 32
      });
      if(h == password.slice(112,144)){
          passImage = images4[i];
          passImage4 = images4[i];
          image_id = i;
          return;
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
      if (currentTab > 0 && currentTab < 5) //alert("Invalid Password. ");
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
  console.log("pass_place:"+ password_place)
  if(b==4){
    if(password_place == selected_place) document.getElementById('validity').value = "true"
    else{document.getElementById('validity').value = "false"
    alert("Invalid Password. ");   
  }
  }
  nextPrev(1);
}

