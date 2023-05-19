function hash() {
    var inputText = document.getElementById("inputText").value;
    
    var encryptedResultDiv = document.getElementById("encryptedResult");
    var decryptedResultDiv = document.getElementById("decryptedResult");
    
    // Réinitialiser le contenu précédent
    encryptedResultDiv.innerHTML = "";
    decryptedResultDiv.innerHTML = "";
    
    // Types de hachage
    var hashTypes = [
      { name: "MD5", hashFunction: md5 },
      { name: "SHA-1", hashFunction: sha1 },
      { name: "SHA-256", hashFunction: sha256 },
      { name: "SHA-3", hashFunction: sha3 },
      { name: "DJB2", hashFunction: djb2 },
      { name: "FNV", hashFunction: fnv },
      { name: "MurmurHash", hashFunction: murmurHash },
      { name: "CityHash", hashFunction: cityHash },
      { name: "bcrypt", hashFunction: bcrypt },
      { name: "scrypt", hashFunction: scrypt },
      { name: "Argon2", hashFunction: argon2 }
    ];
    
    // Parcourir les types de hachage et afficher les résultats
    hashTypes.forEach(function(hashType) {
      var hashedValue = hashType.hashFunction(inputText);
      
      var resultString = hashType.name + ": " + hashedValue;
      var resultElement = document.createElement("p");
      resultElement.textContent = resultString;
      
      if (hashType.name === "bcrypt" || hashType.name === "scrypt" || hashType.name === "Argon2") {
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
      fileContent += hashType.name + ": " + hashedValue + "\n";
    });
    
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContent));
    element.setAttribute('download', 'hash.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  
  function md5(input) {
    return CryptoJS.MD5(input).toString();
  }
  
  function sha1(input) {
    return CryptoJS.SHA1(input).toString();
  }
  
  function sha256(input) {
    return CryptoJS.SHA256(input).toString();
  }
  
  function sha3(input) {
    return CryptoJS.SHA3(input).toString();
  }
  
  function djb2(input) {
    // Utiliser la bibliothèque DJB2 pour calculer le hachage
    return djb2hash(input);
  }
  
  function fnv(input) {
    // Utiliser la bibliothèque FNV pour calculer le hachage
    return fnvhash(input);
  }
  
  function murmurHash(input) {
    // Utiliser la bibliothèque MurmurHash pour calculer le hachage
    return murmurhash(input).toString();
  }
  
  function cityHash(input) {
    // Utiliser la bibliothèque CityHash pour calculer le hachage
    return cityhash(input).toString();
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