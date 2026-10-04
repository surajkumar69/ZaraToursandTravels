import { Star, Quote } from "lucide-react";

export default function Reviews() {
  const reviews = [
    {
      name: "Rahul Sharma",
      location: "Bangalore",
      rating: 5,
      text: "We booked a 14-seater Tempo Traveller for our family trip to Ooty. The vehicle was very clean, and the driver was extremely polite and knew all the local routes perfectly. Highly recommended!"
    },
    {
      name: "Priya Nair",
      location: "Kochi",
      rating: 5,
      text: "Excellent service by Zara Tours! We did the Coonoor sightseeing package. The rates were very transparent with no hidden charges, and we felt very safe throughout the journey."
    },
    {
      name: "Amit Patel",
      location: "Ahmedabad",
      rating: 5,
      text: "Very professional and punctual. The Innova we booked was in prime condition. They picked us up right on time from Coimbatore airport. Will definitely use their services again."
    }
  ];

  return (
    <section id="reviews" className="py-20 bg-slate-50 text-navy-900 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h4 className="text-gold-500 font-bold uppercase tracking-wider mb-2">Testimonials</h4>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Don't just take our word for it. Read what travelers have to say about their journey with Zara Tours & Travels.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative hover:-translate-y-1 transition-transform duration-300">
              <Quote className="absolute top-6 right-6 w-10 h-10 text-gold-500/20" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
                ))}
              </div>
              
              <p className="text-gray-600 mb-6 italic leading-relaxed">
                "{review.text}"
              </p>
              
              <div className="mt-auto">
                <h3 className="font-bold text-lg">{review.name}</h3>
                <p className="text-sm text-gray-500">{review.location}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
