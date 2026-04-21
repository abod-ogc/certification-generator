const isMin = (val, len) => val?.length >= len;

export const rules = (input) => {
    switch(input.name)
    {
        case "name":
            return {
                condition: isMin(input.value.trim(), 2),
                target: input,
                msg: "please fill name field (min 3)"
            }
        case "course":
            return {
                condition: isMin(input.value.trim(), 6),
                target: input,
                msg: "please fill course field (min 7)"
            }
        case "instructor":
            return {
                condition: isMin(input.value.trim(), 2),
                target: input,
                msg: "please fill instructor field (min 3)"
            }
        case "signature":
            return {
                condition: input.files?.length > 0,
                target: input.parentElement,
                msg: "upload signature"
            }
        case "date":
            return {
                condition: input.value !== "",
                target: input,
                msg: "please choose a date"
            }
        case "serial":
            return {
                condition: isMin(input.value.trim(), 6),
                target: input,
                msg: "please fill serial field (min 7)"
            }
        default:
            return null;
    }
};

export function validateInputs(inputs)
{
    let valid = true;

    Object.values(inputs).forEach((input) => {
        let inputRules = rules(input);
        if(!inputRules) return;

        if (!inputRules.condition) {
            toggleErrMsg(true, inputRules.target, inputRules.msg);
            valid = false;
        } else {
            toggleErrMsg(false, inputRules.target, "");
        }
    })
    
    return valid;
}

export function singleValidator(condition, parameters)
{
    if(!condition)
    {
        toggleErrMsg(true, ...parameters);
        return false;
    }else
    {
        toggleErrMsg(false, ...parameters);
        return true;
    }
}

function toggleErrMsg(show, input, msg)
{
    if (!input) return;
    
    const container = input.closest(".input-area");
    const errDisplay = container?.querySelector(".input-err-container");

    if (errDisplay) {
        errDisplay.textContent = show ? msg : "";
        errDisplay.classList.toggle("active-input-err", show);
    }
    input.classList?.toggle("err-state", show);
}
