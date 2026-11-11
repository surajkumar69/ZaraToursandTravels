"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, Mail, AlertCircle, CalendarCheck2 } from "lucide-react";

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

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const syncVehicleFromHash = () => {
      const hash = window.location.hash;
      if (hash && hash.includes("vehicle=")) {
        const raw = hash.split("vehicle=")[1].split("&")[0];
        const vehicle = decodeURIComponent(raw);
        setFormData((prev) => ({ ...prev, vehicle }));
        const bookingEl = document.getElementById("booking");
        if (bookingEl) {
          bookingEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    syncVehicleFromHash();
    window.addEventListener("hashchange", syncVehicleFromHash);
    return () => window.removeEventListener("hashchange", syncVehicleFromHash);
  }, []);

  // Sync aria-invalid and fallback invalid class on blur/input for non-intrusive feedback
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const supportsUserInvalid =
      typeof CSS !== "undefined" &&
      CSS.supports?.("selector(:user-invalid)");

    const syncControl = (el: EventTarget | null, markFallback: boolean) => {
      if (
        !(
          el instanceof HTMLInputElement ||
          el instanceof HTMLSelectElement ||
          el instanceof HTMLTextAreaElement
        )
      ) {
        return;
      }
      if (!el.willValidate) return;
      const valid = el.checkValidity();
      if (!valid) {
        el.setAttribute("aria-invalid", "true");
        if (!supportsUserInvalid && markFallback) {
          el.classList.add("user-invalid-fallback");
        }
      } else {
        el.removeAttribute("aria-invalid");
        el.classList.remove("user-invalid-fallback");
      }
    };

    const onBlur = (e: FocusEvent) => syncControl(e.target, true);
    const onInput = (e: Event) => {
      const target = e.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLSelectElement ||
        target instanceof HTMLTextAreaElement
      ) {
        if (target.checkValidity()) {
          target.removeAttribute("aria-invalid");
          target.classList.remove("user-invalid-fallback");
        }
      }
    };

    form.addEventListener("blur", onBlur, true);
    form.addEventListener("input", onInput);
    form.addEventListener("change", onInput);

    return () => {
      form.removeEventListener("blur", onBlur, true);
      form.removeEventListener("input", onInput);
      form.removeEventListener("change", onInput);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (form && !form.checkValidity()) {
      form
        .querySelectorAll<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >("input[required], select[required], textarea[required]")
        .forEach((ctrl) => {
          if (!ctrl.checkValidity()) {
            ctrl.setAttribute("aria-invalid", "true");
            ctrl.classList.add("user-invalid-fallback");
          }
        });
      form.reportValidity();
      return;
    }

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
    window.open(
      `https://wa.me/918523923843?text=${encodeURIComponent(text)}`,
      "_blank"
    );
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
    window.location.href = `mailto:Dhanushjr279@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const inputBaseClass =
    "field-input w-full max-w-full box-border min-w-0 min-h-[48px] px-4 py-3 text-base bg-ivory-100/70 border border-charcoal-400/40 rounded-xl text-charcoal-900 placeholder:text-charcoal-400 focus:bg-ivory-50 focus:border-forest-800 focus:ring-2 focus:ring-champagne-500/40 outline-none transition-colors";

  return (
    <section
      id="booking"
      className="relative -mt-16 md:-mt-24 z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
    >
      <div className="luxury-card bg-ivory-50 rounded-3xl shadow-[0_24px_60px_rgba(7,22,16,0.16)] p-6 sm:p-8 md:p-12 border border-ivory-200 relative overflow-hidden">
        {/* Champagne Gold Top Accent Bar */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-forest-900 via-champagne-400 to-forest-900"
        />

        <div className="text-center mb-8 md:mb-10">
          <p className="inline-flex items-center gap-2 text-champagne-600 font-semibold uppercase tracking-[0.2em] text-xs mb-2">
            <CalendarCheck2 className="w-4 h-4" aria-hidden="true" />
            <span>Concierge Trip Desk</span>
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-forest-900 text-balance mb-2">
            Quick Booking Enquiry
          </h2>
          <p className="text-charcoal-600 text-sm sm:text-base max-w-xl mx-auto text-pretty">
            Share your travel plan below and receive an instant tailored quote
            from our Ooty dispatch team.
          </p>
        </div>

        <form
          ref={formRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
          onSubmit={handleWhatsApp}
        >
          <div className="w-full min-w-0 max-w-full">
            <label
              htmlFor="booking-name"
              className="block text-sm font-semibold text-charcoal-900 mb-1.5"
            >
              Full Name <span className="text-red-700" aria-hidden="true">*</span>
            </label>
            <input
              id="booking-name"
              type="text"
              name="name"
              required
              autoComplete="name"
              enterKeyHint="next"
              value={formData.name}
              onChange={handleChange}
              aria-errormessage="booking-name-error"
              className={inputBaseClass}
              placeholder="e.g. Rajesh Kumar"
            />
            <div id="booking-name-error" className="field-error">
              <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Please enter your full name.</span>
            </div>
          </div>

          <div className="w-full min-w-0 max-w-full">
            <label
              htmlFor="booking-phone"
              className="block text-sm font-semibold text-charcoal-900 mb-1.5"
            >
              Phone Number{" "}
              <span className="text-red-700" aria-hidden="true">*</span>
            </label>
            <input
              id="booking-phone"
              type="tel"
              name="phone"
              required
              autoComplete="tel"
              inputMode="tel"
              enterKeyHint="next"
              value={formData.phone}
              onChange={handleChange}
              aria-errormessage="booking-phone-error"
              className={inputBaseClass}
              placeholder="+91 98765 43210"
            />
            <div id="booking-phone-error" className="field-error">
              <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Please enter a valid contact number.</span>
            </div>
          </div>

          <div className="w-full min-w-0 max-w-full">
            <label
              htmlFor="booking-date"
              className="block text-sm font-semibold text-charcoal-900 mb-1.5"
            >
              Travel Date{" "}
              <span className="text-red-700" aria-hidden="true">*</span>
            </label>
            <input
              id="booking-date"
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              aria-errormessage="booking-date-error"
              className={`${inputBaseClass} appearance-none`}
            />
            <div id="booking-date-error" className="field-error">
              <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Please select your travel date.</span>
            </div>
          </div>

          <div className="w-full min-w-0 max-w-full">
            <label
              htmlFor="booking-passengers"
              className="block text-sm font-semibold text-charcoal-900 mb-1.5"
            >
              Number of Passengers{" "}
              <span className="text-red-700" aria-hidden="true">*</span>
            </label>
            <input
              id="booking-passengers"
              type="number"
              name="passengers"
              min="1"
              inputMode="numeric"
              required
              enterKeyHint="next"
              value={formData.passengers}
              onChange={handleChange}
              aria-errormessage="booking-passengers-error"
              className={inputBaseClass}
              placeholder="e.g. 4"
            />
            <div id="booking-passengers-error" className="field-error">
              <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Enter at least 1 passenger.</span>
            </div>
          </div>

          <div className="md:col-span-2 w-full min-w-0 max-w-full">
            <label
              htmlFor="booking-vehicle"
              className="block text-sm font-semibold text-charcoal-900 mb-1.5"
            >
              Vehicle Type{" "}
              <span className="text-red-700" aria-hidden="true">*</span>
            </label>
            <select
              id="booking-vehicle"
              name="vehicle"
              required
              value={formData.vehicle}
              onChange={handleChange}
              aria-errormessage="booking-vehicle-error"
              className={inputBaseClass}
            >
              <option value="">Select a vehicle from our fleet</option>
              <option value="4-Seater Sedan">4-Seater Sedan</option>
              <option value="7-Seater Bolero">7-Seater Bolero</option>
              <option value="8-Seater Xylo">8-Seater Xylo</option>
              <option value="8-Seater Innova">8-Seater Innova</option>
              <option value="14-Seater Tempo Traveller">
                14-Seater Tempo Traveller
              </option>
              <option value="21-Seater Van">21-Seater Van</option>
              <option value="30-Seater Bus">30-Seater Bus</option>
            </select>
            <div id="booking-vehicle-error" className="field-error">
              <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Please choose a vehicle type.</span>
            </div>
          </div>

          <div className="w-full min-w-0 max-w-full">
            <label
              htmlFor="booking-pickup"
              className="block text-sm font-semibold text-charcoal-900 mb-1.5"
            >
              Pickup Location{" "}
              <span className="text-red-700" aria-hidden="true">*</span>
            </label>
            <input
              id="booking-pickup"
              type="text"
              name="pickup"
              required
              enterKeyHint="next"
              value={formData.pickup}
              onChange={handleChange}
              aria-errormessage="booking-pickup-error"
              className={inputBaseClass}
              placeholder="e.g. Ooty Bus Stand / Coimbatore Airport"
            />
            <div id="booking-pickup-error" className="field-error">
              <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Please enter your pickup location.</span>
            </div>
          </div>

          <div className="w-full min-w-0 max-w-full">
            <label
              htmlFor="booking-destination"
              className="block text-sm font-semibold text-charcoal-900 mb-1.5"
            >
              Destination{" "}
              <span className="text-red-700" aria-hidden="true">*</span>
            </label>
            <input
              id="booking-destination"
              type="text"
              name="destination"
              required
              enterKeyHint="next"
              value={formData.destination}
              onChange={handleChange}
              aria-errormessage="booking-destination-error"
              className={inputBaseClass}
              placeholder="e.g. Coonoor Sightseeing"
            />
            <div id="booking-destination-error" className="field-error">
              <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Please enter your destination.</span>
            </div>
          </div>

          <div className="md:col-span-2 w-full min-w-0 max-w-full">
            <label
              htmlFor="booking-message"
              className="block text-sm font-semibold text-charcoal-900 mb-1.5"
            >
              Additional Message{" "}
              <span className="text-charcoal-400 font-normal">(Optional)</span>
            </label>
            <textarea
              id="booking-message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              className="w-full max-w-full box-border min-w-0 px-4 py-3 text-base bg-ivory-100/70 border border-charcoal-400/40 rounded-xl text-charcoal-900 placeholder:text-charcoal-400 focus:bg-ivory-50 focus:border-forest-800 focus:ring-2 focus:ring-champagne-500/40 outline-none transition-colors"
              placeholder="Any specific itinerary notes, child seats, or luggage requirements..."
            />
          </div>

          <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 pt-3 w-full max-w-full box-border min-w-0">
            <button
              type="submit"
              className="flex-1 w-full max-w-full box-border min-h-[52px] bg-forest-900 hover:bg-forest-800 text-ivory-50 px-6 py-3.5 rounded-xl font-bold flex justify-center items-center gap-2.5 transition-all shadow-lg shadow-forest-950/15 hover:-translate-y-0.5"
            >
              <MessageCircle
                className="w-5 h-5 text-champagne-300"
                aria-hidden="true"
              />
              <span>Send via WhatsApp</span>
            </button>
            <button
              type="button"
              onClick={handleEmail}
              className="flex-1 w-full max-w-full box-border min-h-[52px] bg-ivory-100 hover:bg-champagne-200/60 text-forest-900 border border-champagne-500/50 px-6 py-3.5 rounded-xl font-bold flex justify-center items-center gap-2.5 transition-all"
            >
              <Mail
                className="w-5 h-5 text-champagne-600"
                aria-hidden="true"
              />
              <span>Send via Email</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
