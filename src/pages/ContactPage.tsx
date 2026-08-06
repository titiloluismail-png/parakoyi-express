import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OFFICE_ADDRESS, WHATSAPP_DISPLAY, WHATSAPP_NUMBER, CONTACT_EMAIL } from '../data/deliveryZones';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2,
  ShieldCheck
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Wholesale Order Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      showToast('Please enter your name, phone number, and message.', 'info');
      return;
    }

    setSubmitted(true);
    showToast('Message sent! Our Ilorin team will respond promptly.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Title */}
      <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-emerald-900">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="bg-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            Ilorin Customer Support
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Contact Parakoyi Express
          </h1>
          <p className="text-emerald-200 text-xs sm:text-sm leading-relaxed">
            Have questions about bulk orders, wholesale prices, or same-day delivery zones in Kwara State? We're available Monday through Saturday.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-2">
              Direct Channels
            </h3>

            <div className="space-y-3.5 text-xs text-slate-700">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors border border-emerald-200/80"
              >
                <div className="w-9 h-9 bg-emerald-600 text-white rounded-xl flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="font-bold text-emerald-950 block text-sm">WhatsApp Hotline (Instant)</span>
                  <span className="text-emerald-700 font-semibold">{WHATSAPP_DISPLAY}</span>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="w-9 h-9 bg-slate-800 text-white rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-sm">Call Support</span>
                  <span className="text-slate-600">{WHATSAPP_DISPLAY}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="w-9 h-9 bg-slate-800 text-white rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-sm">Email Address</span>
                  <span className="text-slate-600">{CONTACT_EMAIL}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="w-9 h-9 bg-orange-600 text-white rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-sm">Distribution Hub Address</span>
                  <span className="text-slate-600 leading-relaxed">{OFFICE_ADDRESS}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <h4 className="font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> Ilorin Operating Hours
            </h4>
            <div className="space-y-1 text-slate-300">
              <div className="flex justify-between">
                <span>Monday – Friday:</span>
                <span className="font-bold text-white">7:30 AM – 7:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span className="font-bold text-white">8:00 AM – 6:00 PM</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Sunday:</span>
                <span>Closed (Emergency B2B WhatsApp open)</span>
              </div>
            </div>
          </div>

          {/* Map Visual Placeholder Card */}
          <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200 text-center space-y-2">
            <div className="bg-emerald-950 text-white p-6 rounded-xl relative overflow-hidden flex flex-col items-center justify-center min-h-[140px]">
              <MapPin className="w-8 h-8 text-orange-500 mb-1 animate-bounce" />
              <span className="font-black text-sm text-white">GRA Fate Road, Ilorin</span>
              <span className="text-[10px] text-emerald-300">Opposite Stadium Main Gate</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Central dispatch hub for Tanke, Fate, Challenge, and Taiwo routes.
            </p>
          </div>

        </div>

        {/* Form Column */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-3 space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Send Us a Message
            </h2>
            <p className="text-xs text-slate-500">
              Fill out the form below and our team will get back to you within 30 minutes.
            </p>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
              <h3 className="font-bold text-emerald-950 text-lg">Message Sent!</h3>
              <p className="text-xs text-emerald-800">
                Thank you for contacting Parakoyi Express. Our representative in Ilorin will reach out to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-emerald-950 text-white text-xs font-semibold px-5 py-2.5 rounded-xl"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alh. Rasheed"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-700 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0803 123 4567"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-700 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. email@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-700 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-900 outline-none focus:border-emerald-700 focus:bg-white"
                  >
                    <option value="Wholesale Order Inquiry">Wholesale Order Inquiry</option>
                    <option value="Business Account Registration">Business Account Registration</option>
                    <option value="Delivery Status & Tracking">Delivery Status & Tracking</option>
                    <option value="Distributor Partnership">Distributor Partnership</option>
                    <option value="Feedback / Complaint">Feedback / Complaint</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we assist your business or household order today?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-700 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-amber-400" />
                <span>Send Inquiry Message</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
