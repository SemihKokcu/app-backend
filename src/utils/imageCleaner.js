const fs = require('fs');
const path = require('path');

const  deleteImage=(filePath)=> {
    console.log(filePath);
    filePath = path.join(process.cwd(),"/public/images/"+ filePath);
    console.log(filePath);

    if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('File deleted successfully');
            }
        });
    } else {
        console.log('File does not exist');
    }
}

module.exports = deleteImage;
