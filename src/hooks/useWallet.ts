import { collection, doc, documentId, onSnapshot, query, setDoc, where } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

import { setCurrencyMoney } from '~/features/wallet/walletSlice'
import { db } from '~/firebase'

import { useAppDispatch } from '~/hooks/useAppDispatch'

export default function useWallet() {
 const { data: session, status } = useSession()
 const dispatch = useAppDispatch()

 useEffect(() => {
  if (status !== 'authenticated' || !session?.user?.name) return

  const name = session.user.name

  const unsubscribe = onSnapshot(query(collection(db, 'wallet'), where(documentId(), '==', name)), async (snapshot) => {
   if (!snapshot.empty) {
    const currencyMoney = snapshot.docs[0].data().currencyMoney || 0

    dispatch(setCurrencyMoney(currencyMoney))
    return
   }

   try {
    await setDoc(
     doc(db, 'wallet', name),
     {
      currencyMoney: 100000000,
     },
     { merge: true },
    )
   } catch (err) {
    console.error(err)
   }
  })

  return () => unsubscribe()
 }, [session?.user?.name, status, dispatch])
}
