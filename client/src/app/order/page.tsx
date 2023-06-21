"use client";
import React, {useState} from "react";
import { useSearchParams } from "next/navigation";
import { OrderStatus, WebScoketMessage } from "@/types/generic";
import { Player } from '@lottiefiles/react-lottie-player';

import completedAnimation from '../../../src/animation/completed.json'
import laodingAnimation from '../../../src/animation/loading.json'
import failedAnimation from '../../../src/animation/failed.json'
import paymentAnimation from '../../../src/animation/payment.json'




function Order() {
  // get callbackUrl from url params for open websocket connection
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

 // state for order status (pending, completed, failed)
    const [orderStatus, setOrderStatus] = useState<OrderStatus>("pending");
    const [messageWebsocket, setMessageWebsocket] = useState<string>('We receive the order, waiting...');

    const [websocketStatus, setWebsocketStatus] = useState<"connected" | "disconnected" | "error">('disconnected')

  if (!callbackUrl) {
    return <div>Invalid callbackUrl</div>;
  }

  // check if callbackUrl is valid
    if (!callbackUrl.startsWith("ws")) {
        return <div>Invalid callbackUrl</div>;
    }

    //open websocket connection with try catch
    let ws: WebSocket | null = null;
    try {
        ws = new WebSocket(callbackUrl)
    } catch (error) {
        console.log(error)
    }


 
    if (!ws) {
        return <div>Invalid callbackUrl</div>;
    }

    // connection error
    ws.onerror = (error) => {
        console.log(error)
        setWebsocketStatus('error')
    }

    // connection opened
    ws.onopen = () => {
        console.log('connected')
        setWebsocketStatus('connected')
    }

    // listen for messages
    ws.onmessage = (event) => {
        const data: WebScoketMessage = JSON.parse(event.data)
        console.log(data)
        setOrderStatus(data.payload.status)
        setMessageWebsocket(data.payload.message)
    }

    // disconnect websocket connection
    const disconnect = () => {
        if (ws) {
            ws.close()
            setWebsocketStatus('disconnected')
    }

}
    

  return (
    <section>
      <div className="h-[15vh] bg-yellow-200 rounded-lg relative flex justify-center items-center">
        <h2 className="text-center">Order status</h2>
        
      </div>

      {
            websocketStatus === 'connected' && (
    
        <div className="flex flex-col my-8 justify-center items-center">
            {
               
                    <p>{messageWebsocket}</p>
              
            }
            <Player
                autoplay
                loop
                src={
                    orderStatus === "pending"
                        ? laodingAnimation
                        : orderStatus === "completed"
                        ? completedAnimation
                        : orderStatus === 'payment'
                        ? paymentAnimation
                        : failedAnimation

                }
               className="w-1/2 h-1/2"
            >
            </Player>
        </div>
            )}
    </section>
  );
}

export default Order;
