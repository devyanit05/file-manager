function createNewFile(listItem) {
    var newFileName = prompt("Enter the name of the new file:");

    if (!validateName(newFileName)) {
        alert("Invalid file name. Please enter a valid name with maximum 10 alphanumeric characters.");
        return;
    }

    if (newFileName) {
        var fileList = listItem.querySelector(".file-list-sub");
        var newFileItem = document.createElement("li");
        newFileItem.textContent = newFileName;
        newFileItem.setAttribute("data-filename", newFileName);
        newFileItem.innerHTML = `<i class="fas fa-file"></i> <span>${newFileName}</span>
        <button class="toggler" onclick="handleDelete(this.parentNode)"><i class="fas fa-trash-alt"></i></button>`;
        fileList.appendChild(newFileItem);
    }
}

function createNewFolder(listItem) {
    var newFolderName = prompt("Enter the name of the new folder:");

    if (!validateName(newFolderName)) {
        alert("Invalid folder name. Please enter a valid name with maximum 10 alphanumeric characters.");
        return;
    }

    if (newFolderName) {
        var fileList = listItem.querySelector(".file-list-sub");
        var newFolderItem = document.createElement("li");
        newFolderItem.textContent = newFolderName;
        newFolderItem.setAttribute("data-filename", newFolderName);
        newFolderItem.innerHTML = `<i class="fas fa-folder"></i> <span>${newFolderName}</span>
        <button class="toggler" onclick="handleDelete(this.parentNode)"><i class="fas fa-trash-alt"></i></button>`;
        var subList = document.createElement("ul");
        subList.className = "file-list";
        subList.setAttribute("data-filename", newFolderName);
        newFolderItem.appendChild(subList);

        fileList.appendChild(newFolderItem);
    }
}

function handleRename(listItem) {
    var fileName = listItem.getAttribute("data-filename");
    var newFileName = prompt("Enter the new name for '" + fileName + "':");

    if (!validateName(newFileName)) {
        alert("Invalid folder/file name. Please enter a valid name with maximum 10 alphanumeric characters.");
        return;
    }

    if (newFileName) {
        listItem.querySelector("span").textContent = newFileName;
        listItem.setAttribute("data-filename", newFileName);
    }
}

function handleDelete(listItem) {
    var confirmation = confirm("Are you sure you want to delete this file/folder?");
    if (confirmation) {
        listItem.remove();
    }
}

function validateName(name) {
    var pattern = /^[a-zA-Z0-9]{1,10}$/;
    return pattern.test(name);
}