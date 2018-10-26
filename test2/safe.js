const FileSystem = require("fs");
const Crypto = require("crypto");

class Safe {

    constructor(filePath, password) {
        this.filePath = filePath;
        this.password = password;
    }

    encryptAsync(data) { }

    encrypt(data) {
        try {
            var cipher = Crypto.createCipher('aes-256-cbc', this.password);
            var encrypted = Buffer.concat([cipher.update(new Buffer(JSON.stringify(data), "utf8")), cipher.final()]);
            FileSystem.writeFileSync(this.filePath, encrypted);
            return { message: "Encrypted!" };
        } catch (exception) {
            throw new Error(exception.message);
        }
    }

    decryptAsync() { }

    decrypt() {
    try {
        var data = FileSystem.readFileSync(this.filePath);
        var decipher = Crypto.createDecipher("aes-256-cbc", this.password);
        var decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
        return JSON.parse(decrypted.toString());
    } catch (exception) {
        throw new Error(exception.message);
    }
}

}

exports.Safe = Safe;