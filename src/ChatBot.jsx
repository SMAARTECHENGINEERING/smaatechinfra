import { useEffect, useRef, useState } from 'react'
import {
  FaPaperPlane,
  FaTimes,
  FaVolumeMute,
  FaVolumeUp,
} from 'react-icons/fa'

const API_URL = '/api/chat'
const WHATSAPP = '7608061738'
const WHATSAPP_URL = 'https://wa.me/917608061738'

const QUICK_REPLIES = ['Services', 'Company', 'Project process', 'Pricing']

const BOT_KNOWLEDGE = [
  {
    keys: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'namaste', 'helo', 'hii'],
    reply: 'Hello! How can I help you today?\n\nI can assist you with information about our services, projects, pricing, process, and more. Feel free to ask anything!',
  },
  {
    keys: ['company', 'smaatech', 'smaa tech', 'about', 'who', 'profile', 'intro', 'introduction', 'trust'],
    reply:
      'SmaaTech Infra & Developer is a unit of SmaaTech Engineering Pvt. Ltd. We work on building construction, interior work, land sale & purchase, and independent home/villa projects. Our focus is on quality materials, transparent dealing, proper planning, and on-time handover.',
  },
  {
    keys: ['service', 'services', 'work', 'provide', 'offer'],
    reply:
      "SmaaTech's main services:\n• Building Construction\n• Complete Interior Work\n• Land Sale & Purchase\n• Independent Home & Villa Construction\n• Premium Interior Design\n\nShare your requirement and our team will suggest a design, estimate, and execution plan.",
  },
  {
    keys: ['building', 'construction', 'house', 'home', 'residential', 'commercial', 'site', 'civil'],
    reply:
      'We handle residential and commercial building construction — covering planning, material selection, skilled workforce, site execution, quality checking, and final handover. Every project is managed with a clear timeline and budget.',
  },
  {
    keys: ['interior', 'design', 'false ceiling', 'ceiling', 'kitchen', 'modular', 'wardrobe', 'tv unit', 'carpentry', 'flooring', 'painting'],
    reply:
      'Interior work includes:\n• False ceiling\n• Modular kitchen\n• Wardrobe & TV unit\n• Wall panel & flooring\n• Carpentry, painting & premium finishing\n\nDesigns are practical, clean, and planned according to your budget and lifestyle.',
  },
  {
    keys: ['villa', 'independent', 'bungalow', 'duplex', 'farmhouse'],
    reply:
      'For independent homes and villa projects, we support you from concept planning to final handover — layout, elevation, material, construction timeline, and interior finish are all executed in a planned flow.',
  },
  {
    keys: ['land', 'plot', 'property', 'sale', 'purchase', 'buy', 'sell', 'registry', 'document'],
    reply:
      'We offer transparent dealing in land sale and purchase — location guidance, pricing discussion, and document clarity. Share your location, size, and purpose and our team will provide suitable guidance.',
  },
  {
    keys: ['project', 'process', 'step', 'steps', 'start', 'planning', 'handover', 'timeline'],
    reply:
      'Our project process:\n1. Consultation\n2. Design & Planning\n3. Estimate & Material Discussion\n4. Construction / Interior Execution\n5. Quality Check\n6. Final Handover\n\nThis keeps budget, timeline, and work progress clear at every stage.',
  },
  {
    keys: ['price', 'pricing', 'cost', 'rate', 'budget', 'estimate', 'quote', 'charges'],
    reply:
      'Project cost depends on size, location, design, material quality, number of floors/rooms, and finish level.\n\nFor an accurate estimate, please share:\n• Project type\n• Location\n• Approximate area\n• Budget range',
  },
  {
    keys: ['quality', 'material', 'guarantee', 'transparent', 'delivery', 'on time'],
    reply:
      'Our focus is on Quality You Can Trust, transparent dealing, customer satisfaction, and on-time delivery. Every project gets quality material, a skilled team, regular coordination, and stage-wise quality checking.',
  },
  {
    keys: ['contact', 'phone', 'call', 'number', 'whatsapp', 'email', 'mail', 'talk'],
    reply: `You can reach SmaaTech via:\n• WhatsApp/Call: ${WHATSAPP}\n• Email: Info@smaatechengineering.com\n• Website contact form\n\nWe're available Mon–Sat, 9 AM – 7 PM.`,
  },
  {
    keys: ['location', 'address', 'where', 'office', 'map', 'bhubaneswar', 'odisha', 'area'],
    reply:
      'SmaaTech provides services in Bhubaneswar, Odisha. Check the map section on the page for directions to our office.',
  },
  {
    keys: ['time', 'hours', 'open', 'sunday', 'timing'],
    reply: 'Working hours: Monday to Saturday, 9:00 AM – 7:00 PM.\nSunday: By appointment only.',
  },
]

function getLocalReply(text) {
  const clean = text.toLowerCase().replace(/[^\w\s]/g, ' ')
  const match = BOT_KNOWLEDGE.find(item => item.keys.some(key => clean.includes(key)))

  if (match) return match.reply

  return `I can help you with information about SmaaTech's construction, interior, land, villa, or home projects.\n\nPlease share your project type, location, approximate area, and budget — I'll explain the service, process, and next steps clearly.\n\nFor direct discussion: WhatsApp/call ${WHATSAPP}.`
}

function BotIcon({ small = false, active = false }) {
  return (
    <span className={`bot-icon${small ? ' small' : ''}${active ? ' active' : ''}`} aria-hidden="true">
      <span className="bot-ear left" />
      <span className="bot-ear right" />
      <span className="bot-head">
        <span className="bot-screen">
          <span className="bot-eye left" />
          <span className="bot-eye right" />
          <span className="bot-smile" />
        </span>
      </span>
      {!small && <span className="bot-body"><span /></span>}
    </span>
  )
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
        'Namaste! Main SmaaTech assistant hoon. Company, services, construction, interior, land, villa, pricing ya project process ke baare me pooch sakte hain.',
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
    utterance.lang = 'en-IN'
    utterance.rate = 0.92
    utterance.pitch = 1.1
    const voices = window.speechSynthesis.getVoices()
    const preferred = voices.find(v => v.lang === 'en-IN' && v.name.toLowerCase().includes('female'))
      || voices.find(v => v.lang === 'en-IN')
      || voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female'))
      || voices.find(v => v.lang.startsWith('en'))
    if (preferred) utterance.voice = preferred
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
              <span className="chatbot-avatar"><BotIcon small active={open} /></span>
              <span>
                <strong>SmaaTech AI Assistant</strong>
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
        {open ? <FaTimes aria-hidden="true" /> : <BotIcon active />}
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
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(145deg, #f9fbff, #d9e4f6);
          border: 1px solid rgba(255, 255, 255, .8);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          box-shadow: inset 0 0 0 2px rgba(10, 102, 194, .12), 0 8px 20px rgba(10, 102, 194, .28);
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
          width: 66px;
          height: 66px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 28%, #ffffff 0 18%, #dfe8f7 42%, #0a66c2 100%);
          color: #fff;
          border: 0;
          z-index: 2200;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 12px 28px rgba(7, 27, 51, .32), 0 0 0 8px rgba(10, 102, 194, .1);
          transition: transform .25s, background .25s;
        }

        .chatbot-toggle::after {
          content: '';
          position: absolute;
          inset: -7px;
          border-radius: inherit;
          border: 1px solid rgba(37, 217, 255, .35);
          animation: botPulse 2.1s ease-out infinite;
        }

        .chatbot-toggle:hover {
          transform: translateY(-3px) scale(1.03);
          background: radial-gradient(circle at 35% 28%, #ffffff 0 18%, #e8f7ff 42%, #071b33 100%);
        }

        .bot-icon {
          position: relative;
          width: 42px;
          height: 50px;
          display: inline-flex;
          align-items: flex-start;
          justify-content: center;
          filter: drop-shadow(0 6px 8px rgba(7, 27, 51, .18));
          transform-origin: 50% 100%;
          animation: botFloat 2.8s ease-in-out infinite;
        }

        .bot-icon.small {
          width: 28px;
          height: 28px;
          animation-duration: 3.2s;
        }

        .bot-head {
          position: relative;
          width: 39px;
          height: 32px;
          border-radius: 13px;
          background: linear-gradient(145deg, #ffffff, #d8e2f2);
          box-shadow: inset -3px -4px 7px rgba(7, 27, 51, .12), inset 2px 3px 7px rgba(255, 255, 255, .9);
          z-index: 2;
        }

        .bot-icon.small .bot-head {
          width: 25px;
          height: 22px;
          border-radius: 9px;
        }

        .bot-screen {
          position: absolute;
          inset: 7px 6px 6px;
          border-radius: 9px;
          background: #071b33;
          overflow: hidden;
          box-shadow: inset 0 0 10px rgba(0, 239, 207, .22);
        }

        .bot-icon.small .bot-screen {
          inset: 5px 4px 4px;
          border-radius: 6px;
        }

        .bot-eye {
          position: absolute;
          top: 6px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #19f5d0;
          box-shadow: 0 0 9px #19f5d0;
          animation: botBlink 4s infinite;
        }

        .bot-icon.small .bot-eye {
          top: 4px;
          width: 4px;
          height: 4px;
        }

        .bot-eye.left {
          left: 7px;
        }

        .bot-eye.right {
          right: 7px;
        }

        .bot-icon.small .bot-eye.left {
          left: 5px;
        }

        .bot-icon.small .bot-eye.right {
          right: 5px;
        }

        .bot-smile {
          position: absolute;
          left: 50%;
          bottom: 5px;
          width: 12px;
          height: 7px;
          border-bottom: 2px solid #19f5d0;
          border-radius: 0 0 12px 12px;
          transform: translateX(-50%);
          box-shadow: 0 3px 8px rgba(25, 245, 208, .35);
        }

        .bot-icon.small .bot-smile {
          bottom: 3px;
          width: 8px;
          height: 5px;
          border-bottom-width: 1.5px;
        }

        .bot-ear {
          position: absolute;
          top: 9px;
          width: 9px;
          height: 18px;
          border-radius: 8px;
          background: linear-gradient(180deg, #20efff, #254bdb);
          box-shadow: 0 0 10px rgba(32, 239, 255, .55);
          z-index: 1;
        }

        .bot-icon.small .bot-ear {
          top: 7px;
          width: 6px;
          height: 12px;
        }

        .bot-ear.left {
          left: -2px;
          transform: rotate(-12deg);
        }

        .bot-ear.right {
          right: -2px;
          transform: rotate(12deg);
        }

        .bot-body {
          position: absolute;
          top: 29px;
          width: 30px;
          height: 21px;
          border-radius: 15px 15px 13px 13px;
          background: linear-gradient(145deg, #ffffff, #d7e1f3);
          box-shadow: inset -4px -5px 8px rgba(7, 27, 51, .12);
          z-index: 1;
        }

        .bot-body span {
          position: absolute;
          left: 50%;
          top: 6px;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          transform: translateX(-50%);
          background: #19f5d0;
          border: 3px solid #3156e8;
          box-shadow: 0 0 10px rgba(25, 245, 208, .65);
        }

        .chatbot-toggle:hover .bot-icon,
        .bot-icon.active {
          animation: botWave 1.4s ease-in-out infinite;
        }

        @keyframes chatbotTyping {
          0%, 60%, 100% { transform: translateY(0); opacity: .4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }

        @keyframes botFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(-1deg); }
        }

        @keyframes botWave {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          35% { transform: translateY(-3px) rotate(-5deg) scale(1.03); }
          70% { transform: translateY(-1px) rotate(5deg) scale(1.01); }
        }

        @keyframes botBlink {
          0%, 46%, 52%, 100% { transform: scaleY(1); opacity: 1; }
          49% { transform: scaleY(.15); opacity: .75; }
        }

        @keyframes botPulse {
          0% { transform: scale(.86); opacity: .7; }
          80%, 100% { transform: scale(1.18); opacity: 0; }
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
