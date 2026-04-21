import {singleValidator, rules} from "./validation.js";

export function initUploadZone(selector, input, placeholder) {
    const zone = document.querySelector(selector);
    const textPlaceholder = zone.querySelector(".upload-main-txt");

    const defTxt = textPlaceholder.textContent;

    zone.addEventListener("dragenter", () => {
        textPlaceholder.textContent = "Drop here..";
    });

    zone.addEventListener("dragleave", (e) => {
        if (!zone.contains(e.relatedTarget)) {
            textPlaceholder.textContent = defTxt;
        }
    });

    zone.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    zone.addEventListener("drop", (e) => {
        e.preventDefault();
        handelFileSelection(e.dataTransfer.files, input, placeholder, textPlaceholder);
    });

    zone.addEventListener("change", (e) => {
        e.preventDefault();
        handelFileSelection(e.target.files, input, placeholder, textPlaceholder);
    });
}

function handelFileSelection(sourceFiles, input, placeholder, textPlaceholder)
{
    input.files = sourceFiles;
    if (input.files.length > 1) {
        alert("Please choose one file !");
        textPlaceholder.textContent = defTxt;
        return;
    }

    if (
        !input.files[0].name.toLowerCase().endsWith(".png") &&
        input.files[0].type !== "image/png"
    ) {
        alert("PNG only!");
        textPlaceholder.textContent = defTxt;
        return;
    }

    let inputRules = rules(input);
    singleValidator(inputRules.condition,[
        inputRules.target,
        inputRules.msg
    ]);

    if (placeholder.dataset.url) {
        URL.revokeObjectURL(placeholder.dataset.url);
    }

    const url = URL.createObjectURL(input.files[0]);
    placeholder.src = url;
    textPlaceholder.textContent = input.files[0].name;
}
