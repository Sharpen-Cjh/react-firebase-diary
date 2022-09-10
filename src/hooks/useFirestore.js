import { useReducer } from "react";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { appFireStore, timestamp } from "../firebase/config";

const initState = {
  document: null,
  isPending: false,
  error: null,
  success: false
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case 'isPending' :
      return { isPending: true, document: null, success: false, error: null }
    case 'addDoc' :
      return { isPending: false, document: action.payload, success: true, error: null }
    case 'error' :
      return { isPending: false, document: null, success: false, error: action.payload }
    case 'deleteDoc' :
      return { isPending: false, document: action.payload, success: true, error: null }
    default:
      return state
  }
}

//저장할 컬렉션을 인자로 전달한다.
export const useFirestore = (transaction) => {

  const [response, dispatch] = useReducer(storeReducer, initState);

  const colRef = collection(appFireStore, transaction);

  //컬렉션에 문서를 추가한다.
  const addDocument = async (doc) => {
    dispatch({type: 'isPending'});

    try {
      const createdTime = timestamp.fromDate(new Date());
      const docRef = await addDoc(colRef, { ...doc, createdTime });
      console.log(docRef);
      dispatch({ type: 'addDoc', payload: docRef });
    } catch (error) {
      dispatch({ type: 'error', payload: error.message });
    }

  };
  //컬렉션에서 문서를 제거합니다.
  const deleteDocument = async (id) => {
      dispatch({type: 'isPending'});
  
      try {
        const docRef = await deleteDoc(doc(colRef, id));
        dispatch({ type: 'deleteDoc', payload: docRef });
      } catch (error) {
        dispatch({ type: 'error', payload: error.message });
      }

  };

  return { addDocument, deleteDocument, response }
}
