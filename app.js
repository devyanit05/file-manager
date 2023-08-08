// import { createNewFile, createNewFolder, handleRename, handleDelete } from './utils'

document.getElementById("searchBtn").addEventListener("click", function () {
    var searchInput = document.getElementById("filenameInput").value;
    var fileList = document.querySelectorAll(".file-list li");

    for (var i = 0; i < fileList.length; i++) {
        var fileName = fileList[i].getAttribute("data-filename");
        if (fileName === searchInput) {
            var relativePath = getRelativePath(fileList[i]);
            alert("File found!\nRelative Path: " + relativePath);
            return;
        }
    }

    alert("File not found.");
});

function getRelativePath(element) {
    var path = element.getAttribute("data-filename");
    var parent = element.parentNode.parentNode;

    while (parent && parent.className === "file-list") {
        path = parent.getAttribute("data-filename") + "/" + path;
        parent = parent.parentNode.parentNode;
    }

    return path;
}

document.getElementById("newFileBtn").addEventListener("click", function () {
    var newFileName = prompt("Enter the name of the new file:");

    if (!validateName(newFileName)) {
        alert("Invalid folder name. Please enter a valid name with maximum 10 alphanumeric characters.");
        return;
    }

    if (newFileName) {
        var fileList = document.querySelector(".file-list");
        var listItem = document.createElement("li");
        listItem.textContent = newFileName;
        listItem.setAttribute("data-filename", newFileName);
        listItem.innerHTML = '<i class="fas fa-file icon"></i> ' +
            `<span>${newFileName}</span>` +
            `<button class="toggler" onclick="handleRename(this.parentNode)"><i class="fas fa-pencil-alt"></i></button><button class="toggler" onclick="handleDelete(this.parentNode)"><i class="fas fa-trash-alt"></i></button>`;
        fileList.appendChild(listItem);
    }
});

document.getElementById("newFolderBtn").addEventListener("click", function () {
    var newFolderName = prompt("Enter the name of the new folder:");

    if (!validateName(newFolderName)) {
        alert("Invalid folder name. Please enter a valid name with maximum 10 alphanumeric characters.");
        return;
    }

    if (newFolderName) {
        //var currentFolder = this.closest("li"); //closest <li> element (folder)
        var fileList = document.querySelector(".file-list");

        var folderItem = document.createElement("li");
        folderItem.textContent = newFolderName;
        folderItem.setAttribute("data-filename", newFolderName);
        folderItem.innerHTML = '<i class="fas fa-folder icon"></i>' +
            `<span>${newFolderName}</span>` +
            `<button class="toggler" onclick="handleRename(this.parentNode)"><i class="fas fa-pencil-alt"></i></button><button class="toggler" onclick="handleDelete(this.parentNode)"><i class="fas fa-trash-alt"></i></button>` +
            `<button class="toggler" onclick="createNewFile(this.parentNode)"><i class="fas fa-file"></i></button><button class="toggler" onclick="createNewFolder(this.parentNode)"><i class="fas fa-folder"></i></button>`;

        var subList = document.createElement("ul");
        subList.className = "file-list-sub";
        subList.setAttribute("data-filename", newFolderName);
        folderItem.appendChild(subList);

        fileList.appendChild(folderItem);
    }
});





