const { body } = require('express-validator');

const isFileExtensionValid = (file, extensions) => {
    if (file) {
      const fileExtension = file.originalname.split('.').pop().toLowerCase();
      return extensions.includes(fileExtension);
    }
    return false;
  };
  
  const validateImageFile = (field, extensions) => {
    return body(field).custom((value, { req }) => {
      if (!isFileExtensionValid(req.file, extensions)) {
        return Promise.reject(`Invalid file format for ${field}. Supported formats: ${extensions.join(', ')}`);
      }
      return true;
    });
  };
  
  const validateImageFiles = (field, extensions) => {
    return body(field).custom((value, { req }) => {
      if (!req.files || !req.files[field] || !Array.isArray(req.files[field])) {
        return Promise.reject(`No files found for ${field}`);
      }
  
      const files = req.files[field];
  
      const isValid = files.every(file => isFileExtensionValid(file, extensions));
  
      if (!isValid) {
        return Promise.reject(`Invalid file format for ${field}. Supported formats: ${extensions.join(', ')}`);
      }
  
      return true;
    });
  };

module.exports = {
    validateImageFile,
    validateImageFiles
}