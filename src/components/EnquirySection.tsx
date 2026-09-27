"use client";
import { useState, useEffect } from "react";
import { Send, MessageCircle, Mail } from "lucide-react";

export default function EnquirySection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    passengers: "",
    vehicle: "",
    pickup: "",
    destination: "",
    message: "",
  });

  const [preselectedVehicle, setPreselectedVehicle] = useState("");

  useEffect(() => {
    // Basic setup to check if a vehicle was passed via URL hash or search params
    const hash = window.location.hash;
    if (hash && hash.includes("vehicle=")) {
      const vehicle = decodeURIComponent(hash.split("vehicle=")[1]);
      setFormData((prev) => ({ ...prev, vehicle }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Zara Tours & Travels,

New Enquiry:

Name: ${formData.name}
Phone: ${formData.phone}
Travel Date: ${formData.date}
Guests: ${formData.passengers}
Pickup: ${formData.pickup}
Destination: ${formData.destination}
Vehicle/Service: ${formData.vehicle}
Requirements: ${formData.message}

Thank you.`;
    window.open(`https://wa.me/918523923843?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Booking Enquiry - ${formData.name}`;
    const body = `Hello Zara Tours & Travels,

New Enquiry:

Name: ${formData.name}
Phone: ${formData.phone}
Travel Date: ${formData.date}
Guests: ${formData.passengers}
Pickup: ${formData.pickup}
Destination: ${formData.destination}
Vehicle/Service: ${formData.vehicle}
Requirements: ${formData.message}

Thank you.`;
    window.location.href = `mailto:Dhanushjr279@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="booking" className="relative -mt-20 z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-2">Quick Booking Enquiry</h2>
          <p className="text-gray-600">Fill out the details below and we will get back to you shortly.</p>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleWhatsApp}>
          <div className="w-full min-w-0 max-w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full max-w-full box-border min-w-0 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:border-transparent outline-none text-navy-900" placeholder="John Doe" />
          </div>
          <div className="w-full min-w-0 max-w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full max-w-full box-border min-w-0 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:border-transparent outline-none text-navy-900" placeholder="+91 00000 00000" />
          </div>
          <div className="w-full min-w-0 max-w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
            <input type="date" name="date" required value={formData.date} onChange={handleChange} className="w-full max-w-full box-border min-w-0 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:border-transparent outline-none text-navy-900 appearance-none" />
          </div>
          <div className="w-full min-w-0 max-w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Passengers</label>
            <input type="number" name="passengers" min="1" required value={formData.passengers} onChange={handleChange} className="w-full max-w-full box-border min-w-0 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:border-transparent outline-none text-navy-900" placeholder="e.g. 4" />
          </div>
          <div className="md:col-span-2 w-full min-w-0 max-w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
            <select name="vehicle" required value={formData.vehicle} onChange={handleChange} className="w-full max-w-full box-border min-w-0 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:border-transparent outline-none text-navy-900">
              <option value="">Select a vehicle</option>
              <option value="4-Seater Sedan">4-Seater Sedan</option>
              <option value="7-Seater Bolero">7-Seater Bolero</option>
              <option value="8-Seater Xylo">8-Seater Xylo</option>
              <option value="8-Seater Innova">8-Seater Innova</option>
              <option value="14-Seater Tempo Traveller">14-Seater Tempo Traveller</option>
              <option value="21-Seater Van">21-Seater Van</option>
              <option value="30-Seater Bus">30-Seater Bus</option>
            </select>
          </div>
          <div className="w-full min-w-0 max-w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
            <input type="text" name="pickup" required value={formData.pickup} onChange={handleChange} className="w-full max-w-full box-border min-w-0 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:border-transparent outline-none text-navy-900" placeholder="e.g. Ooty Bus Stand / Coimbatore Airport" />
          </div>
          <div className="w-full min-w-0 max-w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
            <input type="text" name="destination" required value={formData.destination} onChange={handleChange} className="w-full max-w-full box-border min-w-0 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:border-transparent outline-none text-navy-900" placeholder="e.g. Coonoor Sightseeing" />
          </div>
          <div className="md:col-span-2 w-full min-w-0 max-w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Message (Optional)</label>
            <textarea name="message" rows={3} value={formData.message} onChange={handleChange} className="w-full max-w-full box-border min-w-0 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:border-transparent outline-none text-navy-900" placeholder="Any specific requirements..."></textarea>
          </div>

          <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 pt-4 w-full max-w-full box-border min-w-0">
            <button
              type="submit"
              className="flex-1 w-full max-w-full box-border bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-colors shadow-lg"
            >
              <MessageCircle size={20} />
              Send via WhatsApp
            </button>
            <button
              type="button"
              onClick={handleEmail}
              className="flex-1 w-full max-w-full box-border bg-navy-900 hover:bg-navy-800 text-white px-6 py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-colors shadow-lg"
            >
              <Mail size={20} />
              Send via Email
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
