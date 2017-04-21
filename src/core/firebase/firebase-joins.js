import { firebaseDb } from './firebase';

export function  getAnyObject(key, path){
  return new Promise((resolve, reject) => {
      firebaseDb.ref(`${path}/${key}`).once('value', function(snapshot){
      resolve(snapshot.val())
      });
    })
  }
