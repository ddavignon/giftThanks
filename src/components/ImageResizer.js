import {
    NativeModules,
  } from 'react-native';
  
  const ImageResizer = {
    createResizedImage: (path, width, height, format, quality, rotation = 0, outputPath) => {
      
      if (format !== 'JPEG' && format !== 'PNG') {
        throw new Error('Only JPEG and PNG format are supported by createResizedImage');
      }
  
      return new Promise((resolve, reject) => {
        NativeModules.ImageResizer.createResizedImage(path, width, height, format, quality, rotation, outputPath, (err, resizedPath) => {
          if (err) {
            return reject(err);
          }
          
          resolve(resizedPath);
        });
      });
    },
  };
  
  export default ImageResizer;