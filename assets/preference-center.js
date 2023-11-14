
        function enableInputPhone() {
            document.getElementById("phone-select-01").removeAttribute("disabled");
            document.getElementById("phone-input-01").removeAttribute("disabled");
            document.getElementsByClassName("pc-btn-input-edit")[0].style.display = "none";
        }

        function enableInputEmail() {
            document.getElementById("email-input-01").removeAttribute("disabled");
            document.getElementsByClassName("pc-btn-input-edit")[0].style.display = "none";
        }

        function selectAll() {
            var btnIssue = document.getElementsByClassName("pc-form-issue");
            var checkIssue = document.getElementById("issue-checkbox-01");
            for (i = 0; i < btnIssue.length; i++) {
                if (checkIssue.checked == true) {
                    btnIssue[i].classList.add("pc-selected");
                    document.getElementById('Interested_In_Arctic__c').checked = true;
                    document.getElementById('Interested_In_Plastics__c').checked = true;
                    document.getElementById('Interested_In_Health__c').checked = true;
                    document.getElementById('Interested_In_Forest__c').checked = true;
                    document.getElementById('Interested_In_Oceans__c').checked = true;
                    document.getElementById('Interested_In_Climate__c').checked = true;
                } else {
                    btnIssue[i].classList.remove("pc-selected");
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
        })