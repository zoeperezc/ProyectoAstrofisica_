// Design By
// - https://dribbble.com/shots/13992184-File-Uploader-Drag-Drop

// Select Upload-Area
const uploadArea = document.querySelector('#uploadArea')

// Select Drop-Zoon Area
const dropZoon = document.querySelector('#dropZoon');

// Slect File Input 
const fileInput = document.querySelector('#fileInput');

// Select Preview Image
const previewImage = document.querySelector('#previewImage');

// Uploaded File
const uploadedFile = document.querySelector('#uploadedFile');

// Uploaded File Info
const uploadedFileInfo = document.querySelector('#uploadedFileInfo');

// Uploaded File  Name
const uploadedFileName = document.querySelector('.uploaded-file__name');

// Uploaded File Icon
const uploadedFileIconText = document.querySelector('.uploaded-file__icon-text');

// Uploaded File Counter
const uploadedFileCounter = document.querySelector('.uploaded-file__counter');

// ToolTip Data
const toolTipData = document.querySelector('.upload-area__tooltip-data');

// Images Types
const imagesTypes = [
  ".jpeg",
  "jpg",
  "png",
  "bmp"
];

toolTipData.innerHTML = [...imagesTypes].join(', .');

dropZoon.addEventListener('dragover', function (event) {
  event.preventDefault();
  dropZoon.classList.add('drop-zoon--over');
});

dropZoon.addEventListener('dragleave', function (event) {
  dropZoon.classList.remove('drop-zoon--over');
});
dropZoon.addEventListener('drop', function (event) {
  event.preventDefault();
  dropZoon.classList.remove('drop-zoon--over');
  const file = event.dataTransfer.files[0];
  previewFile(file);
});

dropZoon.addEventListener('click', function (event) {
  fileInput.click();
});

fileInput.addEventListener('change', function (event) {
  const file = event.target.files[0];
  previewFile(file);
});

function previewFile(file) {
  const fileReader = new FileReader();
  const fileType = file.type;
  const fileSize = file.size;

  if (fileValidate(fileType, fileSize)) {
    dropZoon.classList.add('drop-zoon--Uploaded');

    // After File Reader Loaded 
    fileReader.addEventListener('load', function () {
      setTimeout(function () {
        previewImage.style.display = 'block';
      }, 500);
      previewImage.setAttribute('src', fileReader.result);
    });
    fileReader.readAsDataURL(file);
  } else {
    this; 

  };
};


function fileValidate(fileType, fileSize) {
  let isImage = imagesTypes.filter((type) => fileType.indexOf(`image/${type}`) !== -1);

  if (isImage[0] === 'jpeg') {
    uploadedFileIconText.innerHTML = 'jpg';
  } else {  
    uploadedFileIconText.innerHTML = isImage[0];
  };

  if (isImage.length !== 0) {
    if (fileSize <= 2000000) { 
      return true;
    } else { 
      return alert('Please Your File Should be 2 Megabytes or Less');
    };
  } else { 
    return alert('Please make sure to upload An Image File Type');
  };
};
