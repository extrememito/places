const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}


const resizeAndCrop = (input, size, callback)=>{
  const file = input;
  const reader = new FileReader();
  reader.onload = function (FREvent) {
    const img = new Image();
    img.onload = function(){
  	  //Creating canvas
      const canvas=document.createElement("canvas");
      const ctx=canvas.getContext("2d");
  	  //Configuration
  	  const resizeWidth= size.width ? size.width : 243;
  	  const resizeHeight = size.height ? size.height : 200;
  	  const resizeAspect = resizeWidth / resizeHeight;
  	  //FILE INPUT
  	  const width = img.width;
  	  const height = img.height;
  	  const aspect = width / height;
  	  let new_width;
  	  let new_height
  	  //LOGIC
  		if ( resizeAspect <= aspect){
  			new_height = height;
  			new_width = resizeAspect * height;
  		}else{
  			new_width = width;
  			new_height = width / resizeAspect;
  		}
  		//Setting up canvas size
  	  canvas.width = resizeWidth;
      canvas.height = resizeHeight;
  		//Resizing and croping
      ctx.drawImage(img,
  					(width - new_width)/2,
  					(height - new_height)/2,
  					new_width,
  					new_height,
  					0,
  					0,
  					canvas.width,
  					canvas.height);
  	  callback(dataURItoBlob(canvas.toDataURL("image/png")));
    }
    img.src=FREvent.target.result;
  };
  reader.readAsDataURL(file);
}

export { resizeAndCrop }
