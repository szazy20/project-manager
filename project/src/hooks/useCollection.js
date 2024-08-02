import { useEffect, useState, useRef } from "react"
import { db } from "../firebase/firebase"

export const useCollection = (collection, _query, _query2, _orderBy) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  const query = useRef(_query).current
  const query2 = useRef(_query2).current
  const orderBy = useRef(_orderBy).current

  useEffect(() => {
    let ref = db.collection(collection)

    if (query) {
      ref = ref.where(...query)
    }
    if (query2) {
      ref = ref.where(...query2)
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy)
    }

    const unsubscribe = ref.onSnapshot(snapshot => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({...doc.data(), id: doc.id})
      });
      
      setDocuments(results)
      setError(null)
    }, error => {
      console.log(error)
      setError('could not fetch the data')
    })

    return () => unsubscribe()

  }, [collection, query, query2, orderBy])

  return { documents, error }
}