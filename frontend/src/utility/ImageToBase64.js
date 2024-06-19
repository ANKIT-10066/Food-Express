import { toast } from "react-hot-toast";
async function ImageToBase64(file){
    if (!file || !file.type.startsWith('image/')) {
         toast('Please select an image file.');
    }else{

        const reader = new FileReader()
        reader.readAsDataURL(file)
        
        const data = new Promise((resolve,reject)=>{
            reader.onload = ()=> resolve(reader.result)
            reader.onerror = err => reject(err)
        })   
        return data
    }
}

export {ImageToBase64}

