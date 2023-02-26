'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { styled } from 'styled-components'

const Section = styled.div`
 width: 100%;
 min-height: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 background-color: #1a1818;
 padding: 1rem;
`

const Container = styled.div`
 width: 90%;
 max-width: 1200px;
 margin: 0 auto;
 display: flex;
 align-items: center;
 justify-content: center;
`

const Wrapper = styled.div`
 perspective: 1000px;
 width: 100%;
 max-width: 466.67px;
 height: 300px;
`

const Card = styled.div`
 width: 100%;
 height: 100%;
 border-radius: 18px;
 box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
 padding: 30px;
 display: flex;
 flex-direction: column;
 align-items: flex-start;
 justify-content: flex-end;
 position: relative;
 overflow: hidden;
 background-color: rgba(80, 80, 80, 0.075);

 & > * {
  pointer-events: none;
 }
`
const Bg = styled.div`
 position: absolute;
 top: -20px;
 left: -20px;
 right: -20px;
 bottom: -20px;
 z-index: -1;
 /* filter: brightness(100%) blur(10px); */
 display: flex;
 align-items: center;
 justify-content: flex-end;

 img {
  height: 60%;
  width: 60%;
  object-fit: contain;
 }
`

const Highlight = styled.div`
 position: absolute;
 height: 400px;
 width: 400px;
 border-radius: 50%;
 background-color: rgba(255, 255, 255, 0.034);
 filter: brightness(70%) blur(20px);
 left: -20%;
 top: -13%;
`

const mostX = 10 // 10 or -10
const mostY = -10 // 10 or -10

interface Props {
 children: React.ReactNode
}

function InteractiveCard(props: Props) {
 const { children } = props
 const wrapperRef = useRef<HTMLDivElement>(null)
 const cardRef = useRef<HTMLDivElement>(null)
 const highlightRef = useRef<HTMLDivElement>(null)

 useEffect(() => {
  function cardMounceMove(e: MouseEvent) {
   if (!cardRef.current || !highlightRef.current) return
   // remove transition
   cardRef.current.style.transition = 'none'
   highlightRef.current.style.transition = 'none'

   const x = e.offsetX
   const y = e.offsetY
   const { width, height } = cardRef.current.getBoundingClientRect()
   const halfWidth = width / 2
   const halfHeight = height / 2

   // calculate angle
   const rotationY = ((x - halfWidth) / halfWidth) * mostX
   const rotationX = ((y - halfHeight) / halfHeight) * mostY

   // set rotation
   cardRef.current.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`
   highlightRef.current.style.left = `${(rotationY / mostX) * 30 * -1}%`
   highlightRef.current.style.top = `${(rotationX / mostY) * 30 * -1}%`
  }

  function cardMounseLeave() {
   if (!cardRef.current || !highlightRef.current) return
   // add transition back
   cardRef.current.style.transition = 'transform 0.5s ease-in-out'
   cardRef.current.style.transform = `rotateY(0) rotateX(0)`
   highlightRef.current.style.transition = 'left 0.5s ease-in-out, top 0.5s ease-in-out'

   // add default position back to highlight
   highlightRef.current.style.left = `-20%`
   highlightRef.current.style.top = `-13%`
  }

  cardRef.current?.addEventListener('mousemove', cardMounceMove)
  cardRef.current?.addEventListener('mouseleave', cardMounseLeave)

  return () => {
   if (cardRef.current) {
    cardRef.current.removeEventListener('mousemove', cardMounceMove)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    cardRef.current.removeEventListener('mouseleave', cardMounseLeave)
   }
  }
 }, [])

 return (
  <Section>
   <Container>
    <Wrapper ref={wrapperRef}>
     <Card ref={cardRef}>
      <Bg>
       <Image src="https://i.seadn.io/gcs/files/7a93026eed3709eaae748cb43db55075.png" width={500} height={500} alt="" />
      </Bg>
      {children}
      <Highlight ref={highlightRef} />
     </Card>
    </Wrapper>
   </Container>
  </Section>
 )
}

export default InteractiveCard
