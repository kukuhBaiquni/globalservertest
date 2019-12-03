var SimpleCrypto = require("simple-crypto-js").default;
var tjurut = new SimpleCrypto("galat");

var a = tjurut.encrypt({
    name: "memek"
});
var c = "6d0223dcaab3672951a89f262c62b50457ba79234fa8fee4998e3a415b9b626eb7V9gz7GSftMoOo+X24g3PtAwd0PJQUEcf5X59E7UBg="
console.log(tjurut.decrypt(c));
