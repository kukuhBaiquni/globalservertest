const _rules = {
    userName: {
        maxLength: 16,
        minLength: 6,
        type: "string",
        regex: function(userName) {
            return userName.match(/^[a-zA-Z0-9]+$/) !== null;
        }
    },
    password: {
        minLength: 8,
        type: "string",
        regex: function(password) {
            return password.match(/^[a-zA-Z0-9]+$/) !== null;
        }
    },
    firstName: {
        minLength: 3,
        type: "string",
        regex: function(firstName) {
            return firstName.match(/^[a-zA-Z]+$/) !== null;
        }
    },
    lastName: {
        minLength: 3,
        type: "string",
        regex: function(lastName) {
            return lastName.match(/^[a-zA-Z ]+$/) !== null;
        }
    },
    address: {
        street: {
            regex: function(street) {
                return street.match(/^[a-zA-Z0-9. /]+$/) !== null;
            }
        },
        territority: {
            regex: function(territority) {
                return territority.match(/^[a-zA-Z ]+$/) !== null;
            }
        },
        localZone: {
            regex: function(localZone) {
                return localZone.match(/^[a-zA-Z0-9 ]+$/) !== null;
            }
        }
    },
    phone: {
        minLength: 10,
        maxLength: 13,
        regex: function(phone) {
            return phone.match(/^[0-9]+$/) !== null;
        }
    }
};

module.exports = _rules;
