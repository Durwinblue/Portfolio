import React, { useState } from "react";
import { supabase } from "../supabaseClient"; 
import { Send } from "lucide-react"; 

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(""); // Reset success message

    const { error } = await supabase.from("messages").insert([formData]);

    if (error) {
      console.error("Error saving message:", error.message);
      setSuccess("Error sending message. Please try again.");
    } else {
      setSuccess("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }

    setLoading(false);
  };

  return (
    <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-300">
      <h3 className="text-2xl font-bold text-[#9ef01a] mb-6">Send Me a Message</h3>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-white mb-2">Name</label>
            <input 
              type="text" id="name" name="name" 
              className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-3 text-white"
              placeholder="Your Name" value={formData.name} onChange={handleChange} required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-white mb-2">Email</label>
            <input 
              type="email" id="email" name="email"
              className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-3 text-white"
              placeholder="Your Email" value={formData.email} onChange={handleChange} required
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-white mb-2">Subject</label>
          <input 
            type="text" id="subject" name="subject"
            className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-3 text-white"
            placeholder="Subject" value={formData.subject} onChange={handleChange} required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-white mb-2">Message</label>
          <textarea 
            id="message" name="message" rows={5}
            className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-3 text-white"
            placeholder="Your Message" value={formData.message} onChange={handleChange} required
          ></textarea>
        </div>

        <button 
          type="submit"
          className="flex items-center gap-2 bg-[#9ef01a] text-black px-6 py-3 rounded-md hover:bg-[#8ad00a] transition-colors"
          disabled={loading}
        >
          <Send size={20} />
          {loading ? "Sending..." : "Send Message"}
        </button>

        {success && <p className="text-green-400">{success}</p>}
      </form>
    </div>
  );
};

export default ContactForm;
