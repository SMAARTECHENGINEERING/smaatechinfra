import { useEffect, useRef, useState } from 'react'
import {
  FaCommentDots,
  FaPaperPlane,
  FaRobot,
  FaTimes,
  FaVolumeMute,
  FaVolumeUp,
} from 'react-icons/fa'

const API_URL = '/api/chat'
const WHATSAPP = '7608061738'
const WHATSAPP_URL = 'https://wa.me/917608061738'

const QUICK_REPLIES = ['Services', 'Pricing', 'Contact', 'Location']

const BOT_KNOWLEDGE = [
  {
    keys: ['service', 'services', 'kaam', 'work', 'building', 'interior', 'villa', 'land'],
    reply:
      'SmaaTech building construction, interior work, land sale and purchase, independent home/villa, aur premium interior design services provide karta hai.',
  },
  {
    keys: ['price', 'pricing', 'cost', 'rate', 'budget', 'estimate', 'quote'],
    reply:
      'Pricing project size, location, design, material aur timeline par depend karti hai. Free consultation ke liye contact form ya WhatsApp par details bhej dijiye.',
  },
  {
    keys: ['contact', 'phone', 'call', 'number', 'whatsapp'],
    reply: `Aap SmaaTech ko WhatsApp/call kar sakte hain: ${WHATSAPP}. Website contact form se bhi enquiry send kar sakte hain.`,
  },
  {
    keys: ['location', 'address', 'where', 'office', 'map'],
    reply:
      'SmaaTech Bhubaneswar, Odisha me services provide karta hai. Location ke liye page ke map section ko check karein.',
  },
  {
    keys: ['time', 'hours', 'open', 'sunday'],
    reply: 'Working hours: Monday to Saturday, 9:00 AM to 7:00 PM. Sunday by appointment only.',
  },
]

function getLocalReply(text) {
  const clean = text.toLowerCase()
  const match = BOT_KNOWLEDGE.find(item => item.keys.some(key => clean.includes(key)))

  if (match) return match.reply

  return `Is topic par best help ke liye SmaaTech team se directly WhatsApp karein: ${WHATSAPP}. Aap apna project type, location aur budget bhej sakte hain.`
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [voice, setVoice] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [msgs, setMsgs] = useState([
    {
      role: 'assistant',
      content:
        'Namaste! Main SmaaTech assistant hoon. Services, pricing, contact ya location ke baare me pooch sakte hain.',
    },
  ])
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, open, loading])

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') window.speechSynthesis?.cancel()
    }
  }, [])

  const speak = text => {
    if (!voice || typeof window === 'undefined' || !window.speechSynthesis) return

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text.replace(/[^\w\s.,!?:/-]/g, ''))
    utterance.lang = 'hi-IN'
    utterance.rate = 1
    window.speechSynthesis.speak(utterance)
  }

  const send = async textArg => {
    const text = (textArg ?? input).trim()
    if (!text || loading) return

    const nextMsgs = [...msgs, { role: 'user', content: text }]
    setMsgs(nextMsgs)
    setInput('')
    setLoading(true)

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMsgs.map(({ role, content }) => ({ role, content })),
        }),
      })

      if (!response.ok) throw new Error('Chat API unavailable')

      const data = await response.json()
      const reply = data.reply || getLocalReply(text)
      setMsgs(current => [...current, { role: 'assistant', content: reply }])
      speak(reply)
    } catch {
      const reply = getLocalReply(text)
      setMsgs(current => [...current, { role: 'assistant', content: reply }])
      speak(reply)
    } finally {
      setLoading(false)
    }
  }

  const toggleVoice = () => {
    setVoice(current => !current)
    if (typeof window !== 'undefined') window.speechSynthesis?.cancel()
  }

  return (
    <>
      {open && (
        <div className="chatbot-panel" role="dialog" aria-label="SmaaTech assistant">
          <div className="chatbot-head">
            <div className="chatbot-title">
              <span className="chatbot-avatar"><FaRobot aria-hidden="true" /></span>
              <span>
                <strong>SmaaTech Assistant</strong>
                <small>Online</small>
              </span>
            </div>
            <div className="chatbot-actions">
              <button type="button" onClick={toggleVoice} title="Voice on/off" aria-label="Toggle voice">
                {voice ? <FaVolumeUp aria-hidden="true" /> : <FaVolumeMute aria-hidden="true" />}
              </button>
              <button type="button" onClick={() => setOpen(false)} title="Close" aria-label="Close chat">
                <FaTimes aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="chatbot-body">
            {msgs.map((msg, index) => (
              <div key={`${msg.role}-${index}`} className={`chatbot-row ${msg.role}`}>
                <div className="chatbot-bubble">{msg.content}</div>
              </div>
            ))}

            {loading && (
              <div className="chatbot-row assistant">
                <div className="chatbot-bubble typing" aria-label="Assistant is typing">
                  <span /><span /><span />
                </div>
              </div>
            )}

            {msgs.length <= 1 && !loading && (
              <div className="chatbot-quick">
                {QUICK_REPLIES.map(reply => (
                  <button key={reply} type="button" onClick={() => send(reply)}>{reply}</button>
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="chatbot-input">
            <input
              value={input}
              onChange={event => setInput(event.target.value)}
              onKeyDown={event => {
                if (event.key === 'Enter') send()
              }}
              placeholder="Apna sawaal likhein..."
              disabled={loading}
              aria-label="Chat message"
            />
            <button type="button" onClick={() => send()} disabled={loading || !input.trim()} aria-label="Send message">
              <FaPaperPlane aria-hidden="true" />
            </button>
          </div>

          <a className="chatbot-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            Direct WhatsApp: {WHATSAPP}
          </a>
        </div>
      )}

      <button
        type="button"
        className="chatbot-toggle"
        onClick={() => setOpen(current => !current)}
        aria-label="Chat with SmaaTech assistant"
        aria-expanded={open}
      >
        {open ? <FaTimes aria-hidden="true" /> : <FaCommentDots aria-hidden="true" />}
      </button>

      <style>{`
        .chatbot-panel {
          position: fixed;
          left: 22px;
          bottom: 92px;
          width: 340px;
          max-width: calc(100vw - 32px);
          height: 500px;
          max-height: 70vh;
          background: #fff;
          border: 1px solid rgba(10, 102, 194, .16);
          border-radius: 14px;
          box-shadow: 0 18px 50px rgba(7, 27, 51, .24);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 2200;
          font-family: inherit;
        }

        .chatbot-head {
          background: #071b33;
          color: #fff;
          padding: 13px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .chatbot-title {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .chatbot-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #0a66c2;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
        }

        .chatbot-title strong,
        .chatbot-title small {
          display: block;
        }

        .chatbot-title strong {
          font-size: .88rem;
          line-height: 1.2;
        }

        .chatbot-title small {
          color: #7fd1a0;
          font-size: .72rem;
          margin-top: 2px;
        }

        .chatbot-actions {
          display: flex;
          gap: 4px;
          flex: 0 0 auto;
        }

        .chatbot-actions button,
        .chatbot-toggle,
        .chatbot-input button,
        .chatbot-quick button {
          font-family: inherit;
          cursor: pointer;
        }

        .chatbot-actions button {
          background: transparent;
          border: 0;
          color: #fff;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .chatbot-actions button:hover {
          background: rgba(255, 255, 255, .12);
        }

        .chatbot-body {
          flex: 1;
          overflow-y: auto;
          padding: 14px;
          background: #eff6ff;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .chatbot-row {
          display: flex;
        }

        .chatbot-row.user {
          justify-content: flex-end;
        }

        .chatbot-bubble {
          max-width: 82%;
          white-space: pre-line;
          font-size: .86rem;
          line-height: 1.5;
          padding: 9px 13px;
          border-radius: 14px;
          color: #071b33;
          background: #fff;
          border: 1px solid #d9e6f5;
          overflow-wrap: anywhere;
        }

        .chatbot-row.assistant .chatbot-bubble {
          border-bottom-left-radius: 4px;
        }

        .chatbot-row.user .chatbot-bubble {
          background: #0a66c2;
          color: #fff;
          border-color: #0a66c2;
          border-bottom-right-radius: 4px;
        }

        .chatbot-bubble.typing {
          display: flex;
          gap: 4px;
          align-items: center;
          padding: 12px 14px;
        }

        .chatbot-bubble.typing span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #9bb4cf;
          animation: chatbotTyping 1s infinite;
        }

        .chatbot-bubble.typing span:nth-child(2) {
          animation-delay: .15s;
        }

        .chatbot-bubble.typing span:nth-child(3) {
          animation-delay: .3s;
        }

        .chatbot-quick {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }

        .chatbot-quick button {
          font-size: .76rem;
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid #0a66c2;
          background: #fff;
          color: #0a66c2;
          font-weight: 700;
        }

        .chatbot-input {
          display: flex;
          gap: 8px;
          padding: 12px;
          border-top: 1px solid #e3edf8;
          background: #fff;
        }

        .chatbot-input input {
          flex: 1;
          min-width: 0;
          border: 0;
          background: #eff6ff;
          border-radius: 10px;
          padding: 10px 13px;
          font-size: .86rem;
          outline: 0;
          font-family: inherit;
        }

        .chatbot-input button {
          width: 42px;
          border: 0;
          border-radius: 10px;
          background: #0a66c2;
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .chatbot-input button:disabled {
          opacity: .55;
          cursor: not-allowed;
        }

        .chatbot-whatsapp {
          display: block;
          padding: 9px 12px 11px;
          text-align: center;
          color: #071b33;
          background: #fff;
          border-top: 1px solid #e3edf8;
          font-size: .78rem;
          font-weight: 800;
          text-decoration: none;
        }

        .chatbot-toggle {
          position: fixed;
          left: 22px;
          bottom: 24px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #071b33;
          color: #fff;
          border: 0;
          z-index: 2200;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.35rem;
          box-shadow: 0 4px 18px rgba(7, 27, 51, .4);
          transition: transform .25s, background .25s;
        }

        .chatbot-toggle:hover {
          transform: translateY(-2px);
          background: #0a66c2;
        }

        @keyframes chatbotTyping {
          0%, 60%, 100% { transform: translateY(0); opacity: .4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }

        @media (max-width: 620px) {
          .chatbot-panel {
            left: 12px;
            bottom: 82px;
            width: calc(100vw - 24px);
            height: min(500px, calc(100vh - 110px));
            max-height: none;
          }

          .chatbot-toggle {
            left: 16px;
            bottom: 18px;
          }
        }
      `}</style>
    </>
  )
}
