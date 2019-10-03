const _rules = require('./rules');

const validation = () => {
    const createCustomer = (prop) => {
        try {
            let errors = [];
            // First Name Check
            if (prop.firstName.length < _rules.firstName.minLength) { errors.push('firstName - length') }
            if (typeof prop.firstName !==  _rules.firstName.type) { errors.push('firstName - type') }
            if (!_rules.firstName.regex(prop.firstName)) { errors.push('firstName - regex') }
            // Last Name Check
            if (prop.lastName.length < _rules.lastName.minLength) { errors.push('lastName - length') }
            if (typeof prop.lastName !==  _rules.lastName.type) { errors.push('lastName - type') }
            if (!_rules.lastName.regex(prop.lastName)) { errors.push('lastName - regex') }
            // Street Check
            if (!_rules.address.street.regex(prop.address.street)) { errors.push('address.street - regex') }
            // Province Check
            if (!_rules.address.territority.regex(prop.address.province)) { errors.push('address.province - regex')}
            // City Check
            if (!_rules.address.territority.regex(prop.address.city)) { errors.push('address.city - regex')}
            // District Check
            if (!_rules.address.territority.regex(prop.address.district)) { errors.push('address.district - regex')}
            // Village Check
            if (!_rules.address.territority.regex(prop.address.village)) { errors.push('address.village - regex')}
            // Zone Check
            if (!_rules.address.localZone.regex(prop.address.zone)) { errors.push('address.zone - regex')}
            // Path Check
            if (!_rules.address.localZone.regex(prop.address.path)) { errors.push('address.path - regex')}
            // Phone Check
            if (!_rules.phone.regex(prop.phone)) { errors.push('phone - regex')}
            if (prop.phone.length < _rules.phone.minLength) { errors.push('phone - minLength')}
            if (prop.phone.length > _rules.phone.maxLength) { errors.push('phone - maxLength')}

            if (errors.length === 0) {
               return {
                   isValid: true,
                   description: 'Success!'
               };
            }else{
                return {
                    isValid: false,
                    description: 'Some data had incorrect input!'
                };
            }
        } catch(error) {
            return {
                isValid: false,
                description: 'Provided data is incomplete!'
            };
        }
    };

    return {
        createCustomer
    };
};

module.exports = validation;