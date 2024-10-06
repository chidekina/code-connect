const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve({ url: reader.result, name: file.name})
        }

        reader.onerror = () => {
            reject(`Error on reading the file ${file.name}.`)
        }

        reader.readAsDataURL(file)
    })
}

const mainImage = document.querySelector(".main-image");
const imageName = document.querySelector(".container-image-name p")

inputUpload.addEventListener("change", async (event) => {
    const file = event.target.files[0];

    if (file) {
        try {
            const fileContent = await readFileContent(file);
            mainImage.src = fileContent.url;
            imageName.textContent = fileContent.name;
        } catch (error) {
            console.error("Error on reading the file.")
        }
    }
})

const inputTags = document.getElementById("input-tags");
const tagsList = document.getElementById("tags-list");

tagsList.addEventListener("click", (event) => {
    if(event.target.classList.contains("remove-tag")) {
        const tagToRemove = event.target.parentElement;
        tagsList.removeChild(tagToRemove);
    }
})

const tagsAvaliable = ["Front-end", "Development", "HTML", "CSS", "JavaScript", "Data Science", "Full-stack"];

async function verifyTagsAvaliable(tagText) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsAvaliable.includes(tagText));
        }, 1000);
    })
    
}

inputTags.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const tagText = inputTags.value.trim();

        if (tagText !== "") {
            try{
                const tagIncluded = await verifyTagsAvaliable(tagText);
                if (tagIncluded){
                    const newTag = document.createElement("li");
                    newTag.innerHTML = `<p>${tagText}</p> <img src="./img/close-black.svg" class="remove-tag">`;
                    tagsList.appendChild(newTag);
                    inputTags.value = "";
                } else {
                    alert ("Tag was not found.");
                }
            } catch (error) {
                console.error("This tag is not included");
                alert ("Please, verify if the tag is avaliable on Console.")
            }
        }
    }
})

const publishButton = document.querySelector(".publish-button");

async function publishProject (projectName, projectDescription, projectTags){
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            const works = Math.random() > 0.5;

            if (works) {
                resolve ("Project published!");
            } else {
                reject ("Error on publishing.");
            }
        }, 2000)
    })
}

publishButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const projectName = document.getElementById("input-name").value;
    const description = document.getElementById("input-description").value;
    const tags = Array.from(tagsList.querySelectorAll("p")).map((tag) => tag.textContent);

    try {
        const result = await publishProject(projectName, description, tags);
        console.log(result);
        alert("All done!")
    } catch (error) {
        console.log("Error: ", error );
        alert("Error.");
    }
})

const buttonDiscard = document.querySelector(".discard-button");

buttonDiscard.addEventListener("click", (event) => {
    event.preventDefault();

    const forms = document.querySelector("form");
    forms.reset();

    mainImage.src = "./img/imagem1.png";
    imageName.textContent = "project_image.png";

    tagsList.innerHTML = ""
})