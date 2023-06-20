import {
  verifyIranianNationalId,
  phoneNumberValidator,
  isShebaValid,
  verifyCardNumber,
} from "@persian-tools/persian-tools";

/**
 * Specific length rule
 * @param {Number} length The wanted string length
 * @param {String} customMessage Custom message will be replaced with default message if it exists
 * @returns {Function} a function which vuetify accepts that
 */
export function specificLength(length, customMessage) {
  return (value) =>
    value.length === length ||
    customMessage ||
    `طول باید ${length} کاراکتر باشد.`;
}

/**
 * Required rule
 * @returns {Function} a function which vuetify accepts that
 */
export function required() {
  return (value) => {
    const truthyCondition =
      value !== undefined && value !== null && value !== "";

    return truthyCondition || "این فیلد اجباری است.";
  };
}

/**
 * Iranian national code rule
 * @returns {Function} a function which vuetify accepts that
 */
export function nationalCode() {
  return (value) => {
    return verifyIranianNationalId(value) || "فرمت کد ملی اشتباه است";
  };
}

/**
 * User mobile number rule
 * @returns {Function} a function which vuetify accepts that
 */
export function phoneNumber() {
  return (value) =>
    phoneNumberValidator(value) || "فرمت شماره موبایل اشتباه است";
}

/**
 * User sheba number rule
 * @returns {Function} a function which vuetify accepts that
 */
export function shebaNumber() {
  return (value) => isShebaValid(value) || "شماره شبا معتبر نیست";
}

/**
 * User bank card format rule
 * @returns {Function} a function which vuetify accepts that
 */
export function bankCardNumber() {
  return (value) => verifyCardNumber(value) || "شماره کارت معتبر نیست";
}

/**
 * Email rule
 * @returns {Function} a function which vuetify accepts that
 */
export function email() {
  const emailPattern =
    /^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

  return (value) =>
    value.match(emailPattern) || "مقدار وارد شده به فرمت ایمیل نیست.";
}

/**
 * Email rule
 * @returns {Function} a function which vuetify accepts that
 */
export function link() {
  const linkPattern =
    /^(https?:\/\/(www\.)?)[a-zA-Z0-9-]+\.[a-zA-Z0-9]+(\/[a-zA-Z0-9]+)*(\/[a-zA-Z0-9]+\.[a-zA-Z]{2,5})?(\?[a-zA-Z0-9]+=[a-zA-Z0-9]+)?(&[a-zA-Z0-9]+=[a-zA-Z0-9]+)*$/;

  return (value) =>
    value.match(linkPattern) || "لینک باید با http:// یا https:// شروع شود.";
}

/**
 * Max length rule
 * @param {Number} maxLength the wanted max length string
 * @returns {Function} a function which vuetify accepts that
 */
export function maxLength(maxLength) {
  return (value) =>
    value.length <= maxLength ||
    `حداکثر کاراکتر مجاز ${maxLength} کاراکتر میباشد.`;
}

/**
 * Min length rule
 * @param {Number} minLength the wanted min length string
 * @returns {Function} a function which vuetify accepts that
 */
export function minLength(minLength) {
  return (value) =>
    value.length <= minLength ||
    `حداقل کاراکتر مجاز ${minLength} کاراکتر میباشد.`;
}
