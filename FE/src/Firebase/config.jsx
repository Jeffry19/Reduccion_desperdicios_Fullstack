// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyBP3XJosai64HGOo6Ryyt9e8K9IRVevfcU",
  authDomain: "reduccion-de-alimentos.firebaseapp.com",
  projectId: "reduccion-de-alimentos",
  storageBucket: "reduccion-de-alimentos.firebasestorage.app",
  messagingSenderId: "398833092156",
  appId: "1:398833092156:web:5c3257dffe1c402b7f2539",
  measurementId: "G-2LMFN55KDZ",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function UploadFile(file) {
  const storageRef = ref(storage, v4());
  await uploadBytes(storageRef, file);

  const url = await getDownloadURL(storageRef); //me retorna una url
  return url;
}
3;
