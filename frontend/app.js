import { initUploadZone } from "./Logic/events.js";
import { rules, singleValidator, validateInputs } from "./Logic/validation.js";

const printStatusLog = document.querySelector(".print-status-log");

const dataState = {
    studentName: "",
    courseName: "",
    instructorName: "",
    signature: "",
    issuedDate: null,
    serialCode: ""
}

const INPUTS = {
    name: document.getElementById("student_name"),
    course: document.getElementById("course_name"),
    instructor: document.getElementById("instructor_name"),
    signature: document.getElementById("signature_image"),
    issuedDate: document.getElementById("issued_date"),
    serial: document.getElementById("certificate_serial")
}

const BUTTONS = {
    fillDemo: document.querySelector(".fill-demo"),
    reset: document.querySelector(".reset"),
    print: document.querySelector(".print-certificate")
}

const LAYOUT = {
    namePlaceholder: document.querySelector(".student-name-placeholder"),
    coursePlaceholder: document.querySelector(".course-name-placeholder"),
    instructorPlaceholder: document.querySelector(".instructor-name-placeholder"),
    signaturePlaceholder: document.querySelector(".signature-img"),
    issuedDatePlaceholder: document.querySelector(".issued-date-placeholder"),
    serialPlaceholder: document.querySelector(".serial-placeholder")
}

Object.values(INPUTS).forEach((input) => {
    if(input.name === 'signature')
        return;

    input.addEventListener('blur', () => {
        let inputRules = rules(input);
        if(!inputRules) return;
        
        singleValidator(inputRules.condition, [
            inputRules.target, 
            inputRules.msg
        ]);
    });
});

INPUTS.name.addEventListener('input', () => {
    LAYOUT.namePlaceholder.textContent = INPUTS.name.value.trim();
});

INPUTS.course.addEventListener('input', () => {
    LAYOUT.coursePlaceholder.textContent = INPUTS.course.value.trim();
});

INPUTS.instructor.addEventListener('input', () => {
    LAYOUT.instructorPlaceholder.textContent = INPUTS.instructor.value.trim();
});

INPUTS.issuedDate.addEventListener('input', () => {
    LAYOUT.issuedDatePlaceholder.textContent = INPUTS.issuedDate.value;
});

INPUTS.serial.addEventListener('input', () => {
    LAYOUT.serialPlaceholder.textContent = INPUTS.serial.value.trim();
});

BUTTONS.reset.addEventListener('click', () => {
    dataState.studentName = null;
    dataState.courseName = null;
    dataState.instructorName = null;
    dataState.signature = null;
    dataState.issuedDate = null;
    dataState.serialCode = null;

    render();
});

BUTTONS.fillDemo.addEventListener('click', () => {
    dataState.studentName = "Ahmed Khaled";
    dataState.courseName = "Proplem Solving Level 9";
    dataState.instructorName = "Abdullah Mosa";
    dataState.signature = "../assets/Sig1.png";
    dataState.issuedDate = new Date().toISOString().split("T")[0];
    dataState.serialCode = "2bs 7612";

    render();
});

BUTTONS.print.addEventListener('click', () => {
    if(!validateInputs(INPUTS))
    {
        if(!printStatusLog.classList.contains("active"))
            printStatusLog.classList.add("active");
        return;
    }
    else
    {
        printStatusLog.classList.remove("active");
    }

    window.print();
})

async function render()
{
    await renderInputs();
    renderLayout();
}

async function renderInputs()
{
    INPUTS.name.value = dataState.studentName || "";
    INPUTS.course.value = dataState.courseName || "";
    INPUTS.instructor.value = dataState.instructorName || "";
    INPUTS.issuedDate.value = dataState.issuedDate || "";
    INPUTS.serial.value = dataState.serialCode || "";

    if(dataState.signature)
    {
        const blob = await fetch(dataState.signature).then(r => r.blob());
        const file = new File([blob], "image.png", { type: blob.type });

        INPUTS.signature.files = createFileList(file);
    }
    else
    {
        INPUTS.signature.value = "";
        let fileNamePlaceholder = document.querySelector(".upload-main-txt");
        if(fileNamePlaceholder)
            fileNamePlaceholder.textContent = "Click to upload your file or drag & drop here.";
    }
}

function renderLayout()
{
    LAYOUT.namePlaceholder.textContent = dataState.studentName || "Student Name";
    LAYOUT.coursePlaceholder.textContent = dataState.courseName || "Course Name Goes Here";
    LAYOUT.instructorPlaceholder.textContent = dataState.instructorName || "Instructor Name Goes Here";
    LAYOUT.signaturePlaceholder.src = dataState.signature || "";
    LAYOUT.issuedDatePlaceholder.textContent = dataState.issuedDate || "-";
    LAYOUT.serialPlaceholder.textContent = dataState.serialCode || "-";
}

function createFileList(file) {
    const data = new DataTransfer();
    data.items.add(file);
    return data.files;
}

initUploadZone(".upload-area", document.getElementById("signature_image"), LAYOUT.signaturePlaceholder);

document.addEventListener("DOMContentLoaded", () => {
    if (window.matchMedia("(max-width: 768px)").matches) {
        let content = document.querySelector(".wrapper");
        let warningArea = document.querySelector(".warning-area");

        content.style.display = "none";
        warningArea.style.display = "flex";
    }
});