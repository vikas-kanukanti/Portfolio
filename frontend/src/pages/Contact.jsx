import { useState } from 'react'
import { submitContact } from '../api'

const INITIAL = { name: '', email: '', subject: '', message: '' }

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email',
    value: 'vikaskanukanti@gmail.com',
    href: 'mailto:vikaskanukanti@gmail.com',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    label: 'GitHub',
    value: 'github.com/vikas',
    href: 'https://github.com',
  },
]

export default function Contact() {
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await submitContact(form)
      setStatus('success')
      setForm(INITIAL)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="container-page py-16 sm:py-20">
      <h1 className="section-title">Contact</h1>
      <p className="section-sub">I'd love to hear from you</p>

      <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
        {/* Left: info */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <p className="text-gray-400 leading-relaxed">
            Whether you have a project to discuss, a position to fill, or just want to connect — my inbox is always open.
          </p>

          <div className="flex flex-col gap-4">
            {contactInfo.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-indigo-400/60 dark:hover:border-indigo-500/40 hover:bg-gray-50/60 dark:hover:bg-gray-900/60 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-950/40">
                  {c.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-gray-500 mb-0.5">{c.label}</div>
                  <div className="text-sm text-white group-hover:text-indigo-400 transition-colors truncate">
                    {c.value}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div className="lg:col-span-3">
          {status === 'success' ? (
            <div className="card text-center py-14 animate-fade-in">
              <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4 shadow-xl shadow-indigo-950/50">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Message sent!</h3>
              <p className="text-gray-400 mb-8">Thanks for reaching out. I'll get back to you soon.</p>
              <button onClick={() => setStatus('idle')} className="btn-outline">Send another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Name" name="name" value={form.name} onChange={handleChange} required />
                <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
              </div>
              <Field label="Subject" name="subject" value={form.subject} onChange={handleChange} />
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message <span className="text-indigo-400">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="input resize-none"
                  placeholder="Tell me about your project or just say hello..."
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Something went wrong. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', value, onChange, required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label} {required && <span className="text-indigo-400">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="input"
        placeholder={label}
      />
    </div>
  )
}
