const cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: 'duzmlibzz', 
  api_key: '117647946338694', 
  api_secret: 'EkVXdCuZjwa1_TeFeKMckU8CzR0' 
});
module.exports = cloudinary;