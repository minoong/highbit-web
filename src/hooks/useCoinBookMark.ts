import {
 arrayRemove,
 arrayUnion,
 collection,
 doc,
 documentId,
 onSnapshot,
 query,
 setDoc,
 where,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'

import { db } from '~/firebase'

export function useCoinBookMark() {
 const { data: session, status } = useSession()
 const [coinBookMarkList, setCoinBookMarkList] = useState<string[]>([])

 useEffect(() => {
  if (status !== 'authenticated' || !session?.user?.name) return

  const unsubscribe = onSnapshot(
   query(collection(db, 'bookmark'), where(documentId(), '==', session.user.name)),
   (snapshot) => {
    if (snapshot.empty) return

    const result = snapshot.docs[0].data().list as string[]
    setCoinBookMarkList(result)
   },
  )

  return () => unsubscribe()
 }, [session?.user?.name, status])

 const addCoinBookMark = useCallback(
  async (coin: string) => {
   if (!session?.user?.name) return false

   try {
    await setDoc(
     doc(db, 'bookmark', session.user.name),
     {
      list: arrayUnion(coin),
     },
     { merge: true },
    )

    return true
   } catch {
    return false
   }
  },
  [session?.user?.name],
 )

 const removeCoinBookMark = useCallback(
  async (coin: string) => {
   if (!session?.user?.name) return false

   try {
    await setDoc(
     doc(db, 'bookmark', session.user.name),
     {
      list: arrayRemove(coin),
     },
     { merge: true },
    )

    return true
   } catch {
    return false
   }
  },
  [session?.user?.name],
 )

 return [coinBookMarkList, addCoinBookMark, removeCoinBookMark] as const
}
