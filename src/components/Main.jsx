import './Main.css'
import { useState, useRef } from 'react'
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

import bulb_icon from '../assets/bulb_icon.png'
import code_icon from '../assets/code_icon.png'
import compass_icon from '../assets/compass_icon.png'
import send_icon from '../assets/send_icon.png'
import gemini_icon from '../assets/gemini_icon.png'
import user_icon from '../assets/user_icon.png'
import message_icon from '../assets/message_icon.png'

export default function Main() {

    const tabRequests = [
        "Suggest beautiful places to see on an upcoming road trip", "Briefly summarize this concept: urban planning",
        "Brainstorm team bonding activities for our work retreat", "Tell me about React js and React native"
    ];

    const inputRef = useRef();

    const [response, setResponse] = useState({
        error: true,
        data: undefined
    })

    const [click, setClick] = useState(false);

    const MODEL_NAME = "gemini-1.0-pro";
    const API_KEY = "AIzaSyDktpdJAJsWbnIoO-lgYUK1Flwpaoemjwk";


    async function runChat() {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const generationConfig = {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
        };

        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ];

        const chat = model.startChat({
            generationConfig,
            safetySettings,
            history: [],
        });

        try {
            setClick(!click)
            const result = await chat.sendMessage(`${inputRef.current?.value}`);
            //console.log(result)

            const response = result.response;
            console.log(response.text());
            const responseText = response.text().replace(/\*\*/g, '').replace(/\*/g, '')


            setResponse({
                error: false,
                data: responseText
            })
        }
        catch (error) {
            console.log(error.message);
            setResponse({
                error: true,
                data: undefined
            })

        }
    }

    async function runChatRequest(request) {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const generationConfig = {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
        };

        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ];

        const chat = model.startChat({
            generationConfig,
            safetySettings,
            history: [],
        });

        try {
            setClick(!click)
            const result = await chat.sendMessage(`${request}`);
            //console.log(result);

            const response = result.response;
            console.log(response.text());

            setResponse({
                error: false,
                data: response.text().replace(/\*\*/g, '').replace(/\*/g, '')
            })
        }
        catch (error) {
            console.log(error.message);
            setResponse({
                error: true,
                data: undefined
            })

        }
    }

    return (
        <div className="global-container">

            <div className="head-page">
                <p>Gemini</p>
                <img src={user_icon} alt="USER" />
            </div>

            <div className="requests-container">
                <div className="greetings">
                    <h1 className='greet'>Hello, Dev</h1>
                    <h1>How can I help you today ?</h1>
                </div>

                <div className="requests">

                    <div onClick={() => runChatRequest(tabRequests[0])}>
                        <p>Suggest beautiful places to see on an upcoming road trip</p>
                        <img src={compass_icon} alt="COMPASS" />
                    </div>

                    <div onClick={() => runChatRequest(tabRequests[1])}>
                        <p>Briefly summarize this concept: urban planning</p>
                        <img src={bulb_icon} alt="BULB" />
                    </div>

                    <div onClick={() => runChatRequest(tabRequests[2])}>
                        <p>Brainstorm team bonding activities for our work retreat</p>
                        <img src={message_icon} alt="MESSAGE" />
                    </div>

                    <div onClick={() => runChatRequest(tabRequests[3])}>
                        <p>Tell me about React js and React native</p>
                        <img src={code_icon} alt="CODE" />
                    </div>

                </div>
            </div>

            <div className="input-container">
                <form onSubmit={(event) => event.preventDefault()} action="">
                    <input ref={inputRef} type="text" placeholder='Enter a prompt here...' />
                    <button onClick={runChat}>
                        <img src={send_icon} alt="SEND" title='SEND THE REQUEST' />
                    </button>
                </form>
            </div>

            <div className="response">

                {response.data ? (
                    <div className='pattern'>
                        <img src={gemini_icon} alt="GEMINI" />
                        <p>{response.data}</p>
                    </div>
                ) :

                    (click ?
                        <div className="loader">
                            <hr />
                            <hr />
                            <hr />
                        </div>

                        : null
                    )
                }

            </div>

        </div>
    )
}
