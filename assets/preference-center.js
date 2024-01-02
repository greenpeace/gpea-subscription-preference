function enableInputPhone() {
  document.getElementById('phone-select-01').removeAttribute('disabled');
  document.getElementById('phone-input-01').removeAttribute('disabled');
  document.getElementsByClassName('pc-btn-input-edit')[0].style.display =
    'none';
}

function enableInputEmail() {
  document.getElementById('email-input-01').removeAttribute('disabled');
  document.getElementsByClassName('pc-btn-input-edit')[0].style.display =
    'none';
}

function disabledSubmit() {
  // document.getElementById("preferenceButton").removeAttribute("disabled");
  document.getElementById('preferenceButton').disabled = true;
}
function enabledSubmit() {
  document.getElementById('preferenceButton').removeAttribute('disabled');
  // document.getElementById("preferenceButton").disabled = true;
}

function addHKCountryCode() {
  const phoneCountryCode = document.getElementById('phone-select-01');
  if (phoneCountryCode.options[0].value == '+852') {
    // Create a new option element
    const newOption = document.createElement('option');
    newOption.value = '+853';
    newOption.text = '+853';
    // Append the new option to the select element
    phoneCountryCode.add(newOption);
  }
}

function selectAll() {
  var btnIssue = document.getElementsByClassName('pc-form-issue');
  var checkIssue = document.getElementById('issue-checkbox-01');
  for (i = 0; i < btnIssue.length; i++) {
    if (checkIssue.checked == true) {
      btnIssue[i].classList.add('pc-selected');
      document.getElementById('Interested_In_Arctic__c').checked = true;
      document.getElementById('Interested_In_Plastics__c').checked = true;
      document.getElementById('Interested_In_Health__c').checked = true;
      document.getElementById('Interested_In_Forest__c').checked = true;
      document.getElementById('Interested_In_Oceans__c').checked = true;
      document.getElementById('Interested_In_Climate__c').checked = true;
    } else {
      btnIssue[i].classList.remove('pc-selected');
      document.getElementById('Interested_In_Arctic__c').checked = false;
      document.getElementById('Interested_In_Plastics__c').checked = false;
      document.getElementById('Interested_In_Health__c').checked = false;
      document.getElementById('Interested_In_Forest__c').checked = false;
      document.getElementById('Interested_In_Oceans__c').checked = false;
      document.getElementById('Interested_In_Climate__c').checked = false;
    }
  }
}

window.addEventListener('click', (event) => {
  if (event.target.classList.contains('pc-form-issue')) {
    event.target.classList.toggle('pc-selected');
  }
});

let formContent = {};

const mapFields = {
  MobilePhone: 'phone-input-01',
  Email: 'email-input-01',
};

function validation(values) {
  console.log(values);
  const errors = {};
  Object.keys(values).forEach(function (key) {
    if (typeof values[key] === 'undefined' || values[key] === '') {
      errors[key] = formContent.empty_data_alert;
    }
  });

  if (values?.EmailAddress === '') {
    errors.EmailAddress = formContent.empty_data_alert;
  } else if (
    !/^(?!.*(?:''|\.\.))[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
      values.EmailAddress
    ) &&
    values?.EmailAddress
  ) {
    errors.EmailAddress = formContent.invalid_email_alert;
  }

  if (values?.MobilePhone === '') {
    errors.MobilePhone =
      formContent?.empty_phone_alert || formContent.empty_data_alert;
  }

  if (values?.MobilePhone) {
    const phoneCountryCode = document.getElementById('phone-select-01');
    const phoneCountryCodeValue =
      phoneCountryCode.options[phoneCountryCode.selectedIndex].value;
    let phoneReg6, phoneReg7, phoneReg8, phoneReg9, phoneReg10;
    phoneReg6 = new RegExp(/^(0|886|\+886)?(9\d{8})$/).test(values.MobilePhone);
    phoneReg7 = new RegExp(/^(0|886|\+886){1}[3-8]-?\d{6,8}$/).test(
      values.MobilePhone
    );
    phoneReg8 = new RegExp(/^(0|886|\+886){1}[2]-?\d{8}$/).test(
      values.MobilePhone
    );
    phoneReg9 = new RegExp(/^[4-9]{1}[0-9]{7}$/i).test(values.MobilePhone);
    phoneReg10 = new RegExp(/^[6]{1}[0-9]{7}$/i).test(values.MobilePhone);
    if (phoneCountryCodeValue == '+886') {
      if (phoneReg6) {
        return errors;
      } else {
        errors.MobilePhone =
          formContent?.empty_phone_alert || formContent.invalid_format_alert;
      }
    } else if (phoneCountryCodeValue == '+852') {
      if (phoneReg9) {
        return errors;
      } else {
        errors.MobilePhone =
          formContent?.invalid_phone_alert_852 ||
          formContent.invalid_format_alert;
      }
    } else if (phoneCountryCodeValue == '+853') {
      if (phoneReg10) {
        return errors;
      } else {
        errors.MobilePhone =
          formContent?.invalid_phone_alert_853 ||
          formContent.invalid_format_alert;
      }
    }
  }
  console.log(errors);
  return errors;
}

document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('preferLang').value == 'English') {
    formContent = {
      empty_data_alert: 'Please fill in the information.',
      empty_phone_alert: 'Please provide your mobile phone number.',
      empty_select_data_alert: 'Please select.',

      invalid_phone_alert_852:
        'Mobile numbers should consist of 8 digits, with the first digit ranging from 4 to 9.',
      invalid_phone_alert_853:
        'Mobile number should consist of 8 digits, with the first digit being 6.',
      invalid_email_alert: 'Please enter a valid email.',
      invalid_format_alert: 'Please enter a valid format.',
    };
  } else {
    formContent = {
      empty_data_alert: '請填寫資料',
      empty_phone_alert: '請填手機號碼，確保接收專案相關通知',
      empty_select_data_alert: '請選擇',

      invalid_phone_alert_852: '手提號碼應為8位數字,首位數字應為 4 - 9',
      invalid_phone_alert_853: '手提號碼應為8位數字,首位數字應為 6',
      invalid_email_alert: '請填上有效電子郵件',
      invalid_format_alert: '請輸入有效格式',
    };
  }
  if (document.getElementById('phone-select-01')) {
    addHKCountryCode();
  }
  let error = {};
  const validateInput = (e) => {
    // console.log(e.target.value,e.target.getAttribute("disabled"))
    if (document.getElementById('phone-input-01'))
      document.getElementById('phone-input-01').classList.remove('error');
    if (document.getElementById('email-input-01'))
      document.getElementById('email-input-01').classList.remove('error');
    let errorMsgs = document.querySelectorAll('.pc-form__msg');
    if (errorMsgs.length > 0) {
      errorMsgs.forEach((val) => {
        val.classList.add('hide');
      });
    }
    if (e.target.getAttribute('disabled')) {
      return;
    }
    let formField = e.target.getAttribute('name');
    const domId = e.target.getAttribute('id');
    let validateData = {};
    validateData[formField] = e.target.value;
    error = validation(validateData);

    if (Object.keys(error).length > 0) {
      Object.keys(error).forEach((val) => {
        console.log(val, domId);
        document.getElementById(domId).classList.add('error');
        document.getElementById(domId + '-msg').innerText = error[val];
        document.getElementById(domId + '-msg').classList.remove('hide');
      });
      disabledSubmit();
    } else {
      enabledSubmit();
    }
  };
  if (document.getElementById('phone-select-01')) {
    document
      .getElementById('phone-select-01')
      .addEventListener('change', function () {
        document
          .getElementById('phone-input-01')
          .dispatchEvent(new Event('change'));
      });
  }
  if (document.getElementById('phone-input-01')) {
    document
      .getElementById('phone-input-01')
      .addEventListener('change', validateInput);
    document
      .getElementById('phone-input-01')
      .addEventListener('keyup', validateInput);
  }
  if (document.getElementById('email-input-01')) {
    document
      .getElementById('email-input-01')
      .addEventListener('change', validateInput);
    document
      .getElementById('email-input-01')
      .addEventListener('keyup', validateInput);
  }
});
