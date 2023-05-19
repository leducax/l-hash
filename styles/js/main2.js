function hash() {
    var inputText = document.getElementById("inputText").value;
  
    var encryptedResultDiv = document.getElementById("encryptedResult");
    var decryptedResultDiv = document.getElementById("decryptedResult");
  
    // Réinitialiser le contenu précédent
    encryptedResultDiv.innerHTML = "";
    decryptedResultDiv.innerHTML = "";
  
    // Types de hachage
    var hashTypes = [
      { name: "MD5", hashFunction: md5, library: "CryptoJS" },
      { name: "SHA-1", hashFunction: sha1, library: "CryptoJS" },
      { name: "SHA-256", hashFunction: sha256, library: "CryptoJS" },
      { name: "SHA-384", hashFunction: sha384, library: "CryptoJS" },
      { name: "SHA-512", hashFunction: sha512, library: "CryptoJS" },
      { name: "RIPEMD-128", hashFunction: ripemd128, library: "CryptoJS" },
      { name: "RIPEMD-160", hashFunction: ripemd160, library: "CryptoJS" },
      { name: "RIPEMD-256", hashFunction: ripemd256, library: "CryptoJS" },
      { name: "RIPEMD-320", hashFunction: ripemd320, library: "CryptoJS" },
      { name: "Whirlpool", hashFunction: whirlpool, library: "CryptoJS" },
      { name: "Tiger128", hashFunction: tiger128, library: "CryptoJS" },
      { name: "Tiger160", hashFunction: tiger160, library: "CryptoJS" },
      { name: "Tiger192", hashFunction: tiger192, library: "CryptoJS" },
      { name: "Tiger128,3", hashFunction: tiger128_3, library: "CryptoJS" },
      { name: "Tiger160,3", hashFunction: tiger160_3, library: "CryptoJS" },
      { name: "Tiger160,3 (PHP)", hashFunction: tiger160_3_php, library: "CryptoJS" },
      { name: "Tiger192,3", hashFunction: tiger192_3, library: "CryptoJS" },
      { name: "Tiger128,4", hashFunction: tiger128_4, library: "CryptoJS" },
      { name: "Tiger160,4", hashFunction: tiger160_4, library: "CryptoJS" },
      { name: "Tiger192,4", hashFunction: tiger192_4, library: "CryptoJS" },
      { name: "Snefru", hashFunction: snefru, library: "CryptoJS" },
      { name: "Snefru256", hashFunction: snefru256, library: "CryptoJS" },
      { name: "GOST", hashFunction: gost, library: "CryptoJS" },
      { name: "Adler32", hashFunction: adler32, library: "Adler32" },
      { name: "CRC32", hashFunction: crc32, library: "crc32" },
      { name: "CRC32B", hashFunction: crc32b, library: "crc32" },
      { name: "CRC32B (PHP)", hashFunction: crc32b_php, library: "crc32" },
      { name: "FNV-132", hashFunction: fnv132, library: "fnv" },
      { name: "FNV-164", hashFunction: fnv164, library: "fnv" },
      { name: "FNV-1a32", hashFunction: fnv1a32, library: "fnv" },
      { name: "FNV-1a52", hashFunction: fnv1a52, library: "fnv" },
      { name: "FNV-1a64", hashFunction: fnv1a64, library: "fnv" },
      { name: "FNV-1a128", hashFunction: fnv1a128, library: "fnv" },
      { name: "FNV-1a512", hashFunction: fnv1a512, library: "fnv" },
      { name: "FNV-1a1024", hashFunction: fnv1a1024, library: "fnv" },
      { name: "Joaat (PHP)", hashFunction: joaat_php, library: "joaat" },
      { name: "Murmur3", hashFunction: murmur3, library: "murmurhash" },
      { name: "DJB2", hashFunction: djb2, library: "djb2" },
      { name: "SDBM", hashFunction: sdbm, library: "djb2" },
      { name: "lose lose", hashFunction: loselose, library: "djb2" },
      { name: "Pearson", hashFunction: pearson, library: "djb2" },
      { name: "FarmHash (Fingerprint32)", hashFunction: farmHashFingerprint32, library: "farmhash" },
      { name: "FarmHash (Fingerprint64)", hashFunction: farmHashFingerprint64, library: "farmhash" },
      { name: "Haval128,3", hashFunction: haval128_3, library: "haval" },
      { name: "Haval160,3", hashFunction: haval160_3, library: "haval" },
      { name: "Haval192,3", hashFunction: haval192_3, library: "haval" },
      { name: "Haval224,3", hashFunction: haval224_3, library: "haval" },
      { name: "Haval256,3", hashFunction: haval256_3, library: "haval" },
      { name: "Haval128,4", hashFunction: haval128_4, library: "haval" },
      { name: "Haval160,4", hashFunction: haval160_4, library: "haval" },
      { name: "Haval192,4", hashFunction: haval192_4, library: "haval" },
      { name: "Haval224,4", hashFunction: haval224_4, library: "haval" },
      { name: "Haval256,4", hashFunction: haval256_4, library: "haval" },
      { name: "Haval128,5", hashFunction: haval128_5, library: "haval" },
      { name: "Haval160,5", hashFunction: haval160_5, library: "haval" },
      { name: "Haval192,5", hashFunction: haval192_5, library: "haval" },
      { name: "Haval224,5", hashFunction: haval224_5, library: "haval" },
      { name: "Haval256,5", hashFunction: haval256_5, library: "haval" },
      { name: "Md5x2", hashFunction: md5x2, library: "md5x" },
      { name: "Md5x3", hashFunction: md5x3, library: "md5x" },
      { name: "Md5x4", hashFunction: md5x4, library: "md5x" },
      { name: "Md5x5", hashFunction: md5x5, library: "md5x" },
      { name: "Base64", hashFunction: base64, library: "base64" }
    ];
  
    // Parcourir les types de hachage et afficher les résultats
    hashTypes.forEach(function(hashType) {
      var hashedValue = hashType.hashFunction(inputText);
  
      var resultString = hashType.name + ": " + hashedValue + " (Bibliothèque: " + hashType.library + ")";
      var resultElement = document.createElement("p");
      resultElement.textContent = resultString;
  
      if (
        hashType.name === "bcrypt" ||
        hashType.name === "scrypt" ||
        hashType.name === "Argon2"
      ) {
        decryptedResultDiv.appendChild(resultElement);
      } else {
        encryptedResultDiv.appendChild(resultElement);
      }
    });
  
    // Enregistrer les hash cryptés dans le fichier hash.txt
    saveHashes(inputText, hashTypes);
  }
  
  function saveHashes(input, hashTypes) {
    var fileContent = "";
  
    hashTypes.forEach(function(hashType) {
      var hashedValue = hashType.hashFunction(input);
      fileContent += hashType.name + ": " + hashedValue + " (Bibliothèque: " + hashType.library + ")\n";
    });
  
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(fileContent)
    );
    element.setAttribute("download", "hash.txt");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  
  // Bibliothèque CryptoJS
  function md5(input) {
    return CryptoJS.MD5(input).toString();
  }
  
  function sha1(input) {
    return CryptoJS.SHA1(input).toString();
  }
  
  function sha256(input) {
    return CryptoJS.SHA256(input).toString();
  }
  
  function sha384(input) {
    return CryptoJS.SHA384(input).toString();
  }
  
  function sha512(input) {
    return CryptoJS.SHA512(input).toString();
  }
  
  function ripemd128(input) {
    return CryptoJS.RIPEMD128(input).toString();
  }
  
  function ripemd160(input) {
    return CryptoJS.RIPEMD160(input).toString();
  }
  
  function ripemd256(input) {
    return CryptoJS.RIPEMD256(input).toString();
  }
  
  function ripemd320(input) {
    return CryptoJS.RIPEMD320(input).toString();
  }
  
  function whirlpool(input) {
    return CryptoJS.Whirlpool(input).toString();
  }
  
  function tiger128(input) {
    return CryptoJS.Tiger128(input).toString();
  }
  
  function tiger160(input) {
    return CryptoJS.Tiger160(input).toString();
  }
  
  function tiger192(input) {
    return CryptoJS.Tiger192(input).toString();
  }
  
  function tiger128_3(input) {
    return CryptoJS.Tiger128(input, 3).toString();
  }
  
  function tiger160_3(input) {
    return CryptoJS.Tiger160(input, 3).toString();
  }
  
  function tiger160_3_php(input) {
    // Utiliser une bibliothèque PHP pour le hachage Tiger160,3
  }
  
  function tiger192_3(input) {
    return CryptoJS.Tiger192(input, 3).toString();
  }
  
  function tiger128_4(input) {
    return CryptoJS.Tiger128(input, 4).toString();
  }
  
  function tiger160_4(input) {
    return CryptoJS.Tiger160(input, 4).toString();
  }
  
  function tiger192_4(input) {
    return CryptoJS.Tiger192(input, 4).toString();
  }
  
  function snefru(input) {
    return CryptoJS.Snefru(input).toString();
  }
  
  function snefru256(input) {
    return CryptoJS.Snefru256(input).toString();
  }
  
  function gost(input) {
    return CryptoJS.GOST(input).toString();
  }
  
// Bibliothèque adler32
function adler32(input) {
    return adler32lib.adler32(input).toString(16);
  }
  
  // Bibliothèque crc32
  function crc32(input) {
    return crc32lib.crc32(input).toString(16);
  }
  
  function crc32b(input) {
    return crc32blib.crc32b(input).toString(16);
  }
  
  // Bibliothèque fnv
  function fnv132(input) {
    return fnv32lib.fnv1_32(input).toString(16);
  }
  
  function fnv164(input) {
    return fnv64lib.fnv1_64(input).toString(16);
  }
  
  function fnv1a32(input) {
    return fnv32lib.fnv1a_32(input).toString(16);
  }
  
  function fnv1a52(input) {
    return fnv64lib.fnv1a_64(input).toString(16);
  }
  
  function fnv1a64(input) {
    return fnv64lib.fnv1a_64(input).toString(16);
  }
  
  function fnv1a128(input) {
    return fnv128lib.fnv1a_128(input).toString(16);
  }
  
  function fnv1a512(input) {
    return fnv512lib.fnv1a_512(input).toString(16);
  }
  
  function fnv1a1024(input) {
    return fnv1024lib.fnv1a_1024(input).toString(16);
  }
  
  // Bibliothèque joaat
  function joaat(input) {
    return joaatlib.joaat(input).toString(16);
  }
  
  // Bibliothèque murmur3
  function murmur3(input) {
    return murmur3lib.murmur3(input).toString(16);
  }
  
  // Bibliothèque djb2
  function djb2(input) {
    return djb2lib.djb2(input).toString(16);
  }
  
  // Bibliothèque sdbm
  function sdbm(input) {
    return sdbmlib.sdbm(input).toString(16);
  }
  
  // Bibliothèque loselose
  function loselose(input) {
    return loseloselib.loselose(input).toString(16);
  }
  
  // Bibliothèque pearson
  function pearson(input) {
    return pearsonlib.pearson(input).toString(16);
  }
  
  // Bibliothèque farmhash
  function farmhash32(input) {
    return farmhashlib.fingerprint32(input).toString(16);
  }
  
  function farmhash64(input) {
    return farmhashlib.fingerprint64(input).toString(16);
  }
  
  // Bibliothèque haval
  function haval128_3(input) {
    return haval128lib.haval128_3(input).toString(16);
  }
  
  function haval160_3(input) {
    return haval160lib.haval160_3(input).toString(16);
  }
  
  function haval192_3(input) {
    return haval192lib.haval192_3(input).toString(16);
  }
  
  function haval224_3(input) {
    return haval224lib.haval224_3(input).toString(16);
  }
  
  function haval256_3(input) {
    return haval256lib.haval256_3(input).toString(16);
  }
  
  function haval128_4(input) {
    return haval128lib.haval128_4(input).toString(16);
  }
  
  function haval160_4(input) {
    return haval160lib.haval160_4(input).toString(16);
  }
  
  function haval192_4(input) {
    return haval192lib.haval192_4(input).toString(16);
  }
  
  function haval224_4(input) {
    return haval224lib.haval224_4(input).toString(16);
  }
  
  function haval256_4(input) {
    return haval256lib.haval256_4(input).toString(16);
  }
  
  function haval128_5(input) {
    return haval128lib.haval128_5(input).toString(16);
  }
  
  function haval160_5(input) {
    return haval160lib.haval160_5(input).toString(16);
  }
  
  function haval192_5(input) {
    return haval192lib.haval192_5(input).toString(16);
  }
  
  function haval224_5(input) {
    return haval224lib.haval224_5(input).toString(16);
  }
  
  function haval256_5(input) {
    return haval256lib.haval256_5(input).toString(16);
  }
  
  // Bibliothèque Md5x
  function md5x2(input) {
    return md5xlib.md5x2(input).toString();
  }
  
  function md5x3(input) {
    return md5xlib.md5x3(input).toString();
  }
  
  function md5x4(input) {
    return md5xlib.md5x4(input).toString();
  }
  
  function md5x5(input) {
    return md5xlib.md5x5(input).toString();
  }
  
  // Bibliothèque base64
  function base64(input) {
    return window.btoa(input);
  }
  function bcrypt(input) {
    var salt = bcryptjs.genSaltSync(10);
    var hash = bcryptjs.hashSync(input, salt);
    return hash;
  }
  
  function scrypt(input) {
    // Utilisation de la bibliothèque scrypt-js
    var options = {
      N: 16384,
      r: 8,
      p: 1,
      dkLen: 64,
      encoding: 'hex'
    };
    var scryptHash = scryptjs.scryptSync(input, '', options);
    return scryptHash.toString('hex');
  }
  
  function argon2(input) {
    // Utilisation de la bibliothèque argon2-browser
    return new Promise(function(resolve, reject) {
      argon2.hash(input).then(function(hash) {
        resolve(hash.encoded);
      }).catch(reject);
    });
  }  