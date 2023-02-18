import { getAppConfig } from "./FirebaseConfig";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
  limit,
  getDocs,
  setDoc,
  startAfter,
  getCountFromServer,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getPerformance } from "firebase/performance";
import { getMessaging, getToken } from "firebase/messaging";

// init the firebase App
initializeApp(getAppConfig());
// change the instances of firebase services
const dbRef = getFirestore(); // Ref of the firestore DB
const storageRef = getStorage(); // Ref of the storage
const authRef = getAuth(); // Ref of Authentication
const messagingRef = getMessaging(); // Ref of Messaging

// the login provider
const provider = new GoogleAuthProvider();
// -----------------------------Handleing-User-Registration-And-Token----------------------------------
// signs users in with google provider
export const login = async () => {
  try {
    await signInWithPopup(authRef, provider).then(async (UserCredentialImpl)=> {
      await saveCLientDeviceToken()
      const docRef = doc(dbRef, "clients", UserCredentialImpl.user.uid)
      const client = await getDoc(docRef)
      if (!client.exists()) {
        const clientDocRef = doc(dbRef, "clients", UserCredentialImpl.user.uid);
        setDoc(clientDocRef, {favItems: [], reviews: {productId: {rate:"", review: ""}}})
      } 
    })
  } catch (err) {
    console.error("Error during signInWithPopup: ", err.message)
  }
};
// sign users out
export const logout = async () => {
  try {
    await signOut(authRef);
  } catch (err) {
    console.error("Error during user logout: ", err)
  }
};
// init the user SignIn and observer function to watch the user state
export const initFirebaseAuth = (authStateObserver) => {
  onAuthStateChanged(authRef, authStateObserver);
};
// incase the user is logged in return the user name, photoURl, email, and the isAdmin 
export const userProfile = () => {
  return {
    userName: authRef?.currentUser.displayName,
    profilePicUrl: authRef?.currentUser.photoURL,
    userEmail: authRef?.currentUser.email,
  };
};
// return the user status true or false
export const isUserSignedIn = () => {
  return !!authRef.currentUser;
};
// check the isAdmin state return true if the user is admin and active
export const isAdmin = async (ID) => {
  try {
    const docRef = collection(dbRef, "admins");
    const _query = query(
      docRef,
      where("id", "==", ID),
      where("active", "==", true)
    );
    const snapshot = await getDocs(_query);
    return snapshot.docs.length === 1;
  } catch (err) {
    console.error("Error during checking the user State", err);
  }
};
//save the client device token
const saveCLientDeviceToken = async () => {
  try {
    const currentToken = await getToken(messagingRef, { vapidKey:"BAuItwh-X-QllhVkw9C-WByJAZd7_AaYm0oBf-WRovvIoENbFkcCBu9oQFcmGTd8uXS0NHMisY1jniKA_9_MF10"});
    if (currentToken) {
      // saving the Device Token to cloud firestore
      const tokenRef = doc(dbRef, "fcmTokens", currentToken);
      await setDoc(tokenRef, { uid: authRef.currentUser.uid });
    } else {
      requestNotificationPermissions();
    }
  } catch (err) {
    console.error("unable to get client device token", err);
  }
};
// save the user favs items to its own array
export const saveUserData = async (action, id) => {
  try {
    if (action === "addProductToFav") {
      const docRef = doc(dbRef, "clients", authRef.currentUser.uid)
      await updateDoc(docRef, {favItems: arrayUnion(id)})
    } else if (action === "removeProductFromFav") {
      console.log("action is: remove")
      const docRef = doc(dbRef, "clients", authRef.currentUser.uid)
      await updateDoc(docRef, { favItems: arrayRemove(id) })
    }
    
  } catch (err) {
    console.error("Error during saving user Data")
  }
}
// get the favs user data after signs in
export const getUserFavs = async(uid) => {
  try {
    const docRef = doc(dbRef, "clients", uid);
    const snapshot = await getDoc(docRef);
    return snapshot.data().favItems
  } catch (err) {
    console.log("Error during getting the user Favs items")
  }
}
// reuest permission to show notiofications
const requestNotificationPermissions = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      await saveCLientDeviceToken();
    } else {
      console.info("unable to get permission to notify");
    }
  } catch (err) {
    console.error("Error during request Permission", err);
  }
};

// -----------------------------Handleing-Documents-And-Files--------------------------------------------
// adding a doc to the firestore
export const addProductDocToFirestore = async (product) => {
  try {
    const docRef = doc(collection(dbRef, "products"));
    product.id = docRef.id;
    const imgsURL = await uploadImgsURL(product.imgsURL, docRef.id);
    product.imgsURL = imgsURL;
    await setDoc(docRef, product);
  } catch (err) {
    console.error("Error Saving A New Document To the DataBase", err);
  }
  return product;
};

// updating a doc in firestore
export const updateProductDocToFirestore = async (product, oldProduct) => {
  try {
    // useing this reg since the name of the image is a number from 1 to 3 to get the name of the changed image
    const reg = /([1-3]+.jp)/g;
    // this 2 arrays holds the new images for updating and deleting
    const filesToUpdate = [];
    const filesToDelete = [];
    // start checking the status of updating images loop the new images
    product.imgsURL.forEach((url) => {
      // than loop the old images
      oldProduct.imgsURL.forEach((url2) => {
        // if the new image changed from link to string
        if (url.slice(0, 4) !== "http" && !product.imgsURL.includes(url2)) {
          !filesToUpdate.includes({
            name: url2.match(reg).join("")[0],
            value: url,
          }) &&
            filesToUpdate.push({
              name: url2.match(reg).join("")[0],
              value: url,
            });
          // if the user added new image in case new images more then old images
        } else if (
          url.slice(0, 4) !== "http" &&
          product.imgsURL.length > oldProduct.imgsURL.length
        ) {
          !filesToUpdate.includes({
            name: oldProduct.imgsURL.length + 1,
            value: url,
          }) &&
            filesToUpdate.push({
              name: oldProduct.imgsURL.length + 1,
              value: url,
            });
          // if the user down grad the number of images
        } else if (
          !product.imgsURL.includes(url2) &&
          !filesToDelete.includes(url2)
        ) {
          filesToDelete.push(url2);
        }
      });
    });
    const docRef = doc(dbRef, "products", product.id);
    if (filesToDelete.length !== 0) {
      const deletePromises = filesToDelete.map((link) => {
        const object = ref(
          storageRef,
          `${product.id}/${link.match(reg).join("")[0]}.jpg`
        );
        return deleteObject(object);
      });
      await Promise.all(deletePromises);
    }
    if (filesToUpdate.length === 0) {
      await updateDoc(docRef, product);
    } else {
      const imgsURL = await updateImgsURL(filesToUpdate, product.id);
      const oldImages = product.imgsURL.filter(
        (url) => url.slice(0, 4) === "http"
      );
      product.imgsURL = [...oldImages, ...imgsURL];
      console.log(product.imgsURL);
      await updateDoc(docRef, product);
    }
  } catch (err) {
    console.error("Error During Updating A Document in The Database", err);
  }
};

// upload images to the storageBucket and get the URL
const uploadImgsURL = async ([...base64], name) => {
  try {
    const uploadedBase64 = base64.map((file, index) => {
      const imgRef = ref(storageRef, `${name}/${index + 1}.jpg`);
      return uploadString(imgRef, file, "data_url");
    });
    const resolveUploadedImages = await Promise.all(uploadedBase64);
    const imagesUrlPromise = resolveUploadedImages.map((link) => {
      return getDownloadURL(ref(storageRef, link.metadata.fullPath));
    });

    const urlsResults = await Promise.all(imagesUrlPromise);
    return urlsResults;
  } catch (err) {
    console.error("Error during Uploading Files To the Storage", err);
  }
};

// update images in a spacific folder
const updateImgsURL = async (imgs, folder) => {
  try {
    const uploadedBase64 = imgs.map((img) => {
      const imgRef = ref(storageRef, `${folder}/${img.name}.jpg`);
      return uploadString(imgRef, img.value, "data_url");
    });
    const resolveUploadedImages = await Promise.all(uploadedBase64);
    const imagesUrlPromise = resolveUploadedImages.map((link) => {
      return getDownloadURL(ref(storageRef, link.metadata.fullPath));
    });
    const urlsResults = await Promise.all(imagesUrlPromise);

    return urlsResults.map((url) => url);
  } catch (err) {
    console.error("Error During updating files in Storage", err);
  }
};

// query the count of the collection docs
export const getCountOfDocs = async (collName, filterObj) => {
  try {
    if (filterObj === undefined) return
    let snapShot = null;
    const coll = collection(dbRef, collName);
    if (!filterObj) {
      snapShot = await getCountFromServer(coll);
    } else  {
      const query_ = query(
        coll,
        where(filterObj.name, filterObj.sign, filterObj.value)
      );
      snapShot = await getCountFromServer(query_);
    }
    
    return snapShot.data().count;
  } catch (err) {
    console.error("Error During Get Collection Documents Count", err);
  }
};
// query page return docment snapshot to get the last document snapshot
export const getProductsPage = async (
  collName,
  lmt,
  filterObj,
  lastSnapshot
) => {
  try {
    // query the first page of the docs
    // if the query has null value will grap products by lmt value else will create a query with condition
    let queryDOcs = null;
    if (filterObj === null) {
      queryDOcs = !lastSnapshot
        ? query(collection(dbRef, collName), limit(lmt))
        : query(
            collection(dbRef, collName),
            startAfter(lastSnapshot),
            limit(lmt)
          );
    } else {
      queryDOcs = !lastSnapshot
        ? query(
            collection(dbRef, collName),
            where(filterObj.name, filterObj.sign, filterObj.value),
            limit(lmt)
          )
        : query(
            collection(dbRef, collName),
            where(filterObj.name, filterObj.sign, filterObj.value),
            limit(lmt)
          );
    }
    return await getDocs(queryDOcs);
  } catch (err) {
    console.error("Error during getting a Page from the DataBase", err);
  }
};
// query of deleting doc from collection
export const deleteProductDoc = async (obj, collName) => {
  try {
    obj?.imgsURL.map(async (imgurl) => {
      const urlRef = ref(
        storageRef,
        `${obj.id}/${obj.imgsURL.indexOf(imgurl) + 1}.jpg`
      );
      return await deleteObject(urlRef)
        .then(() => {
          return "deleted";
        })
        .catch(() => {
          return "err";
        });
    });
    await deleteDoc(doc(dbRef, collName, obj.id)).then((value) => {
      console.log("log message with the value of deleting Doc", value);
    });
  } catch (err) {
    console.error("Error During Deleting Document From The DataBase", err);
  }
};
// get the client favs items
export const getClientFavs = async (favList)=>{
  try {
    const data = []
    const promisses = favList.map((id) => {
      const docRef = doc(dbRef, "products", id);
      return getDoc(docRef)
    })
    const results = await Promise.all(promisses);
    results.forEach(res => {data.push(res.data())})
    return data;
  } catch (err) {
    console.log("Error during getting the client favs", err)
  }
}
// --------------------------------------------------------------------------------

export const getProductByID = async(id) =>{
  try {
    const docRef = doc(dbRef, "products", id);
    return getDoc(docRef)

  } catch (err) {
    console.err("error during fetching product by ID",  err)
  }
}
getPerformance();
