import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaHotel, FaPlaneDeparture, FaUmbrellaBeach, FaFacebook, FaInstagram, FaLinkedin, FaEnvelope  } from "react-icons/fa";

export default function View() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("currentUser");
    if (!raw) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(raw));
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="text-white">
      {/* ---------------- Hero / Video Section ---------------- */}
      <div className="relative min-h-screen">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/bgvideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 min-h-screen flex flex-col">
          <Navbar />
          <div className="flex flex-col items-center justify-center flex-grow text-center px-6">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to TravelPlanner, {user.name}!
            </h2>
            <p className="text-lg md:text-2xl max-w-2xl">
              Explore the World with TravelPlanner.
            </p>
          </div>
        </div>
      </div>

      {/* ---------------- Popular Destinations Section ---------------- */}
      <section className="bg-gray-100 py-16 text-black">
        <h3 className="text-2xl md:text-3xl underline text-center mb-8 font-bold">
          POPULAR DESTINATIONS
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    <img src="/places/dubai.jpg" alt="Dubai" className="w-full h-40 object-cover" />
    <h3 className="text-center py-2 font-semibold text-gray-700">Dubai</h3>
  </div>

  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    <img src="/places/paris.jpg" alt="Paris" className="w-full h-40 object-cover" />
    <h3 className="text-center py-2 font-semibold text-gray-700">Paris</h3>
  </div>

  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    <img src="/places/tokyo.jpg" alt="Tokyo" className="w-full h-40 object-cover" />
    <h3 className="text-center py-2 font-semibold text-gray-700">Tokyo</h3>
  </div>

  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    <img src="/places/capetown.jpg" alt="Cape Town" className="w-full h-40 object-cover" />
    <h3 className="text-center py-2 font-semibold text-gray-700">Cape Town</h3>
  </div>

  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    <img src="/places/maldives.jpg" alt="Maldives" className="w-full h-40 object-cover" />
    <h3 className="text-center py-2 font-semibold text-gray-700">Maldives</h3>
  </div>

  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    <img src="/places/rome.jpg" alt="Rome" className="w-full h-40 object-cover" />
    <h3 className="text-center py-2 font-semibold text-gray-700">Rome</h3>
  </div>
</div>


      </section>

      {/* ---------------- Explore More / Services Section ---------------- */}
      <section className="bg-gray-400 py-16 text-black">
        <h5 className="text-2xl md:text-3xl underline text-center mb-8 font-bold">
          EXPLORE MORE WITH TRAVELPLANNER
        </h5>

        <div className=" grid-cols-1 md:grid-cols-4 gap-6 px-4 text-center flex justify-center">
          <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow">
            <FaPlaneDeparture className="text-4xl text-red-600" />
            <Link to="/flights" className="font-semibold hover:text-red-500">
              Flight Booking
            </Link>
            <p className="text-sm">Search real flight schedules and travel requirements.</p>
          </div>

          <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow">
            <FaHotel className="text-4xl text-red-600" />
            <Link to="/hotels" className="font-semibold hover:text-red-500">
              Hotel Booking
            </Link>
            <p className="text-sm">Find and compare hotels in your destination city.</p>
          </div>

          <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow ">
            <FaUmbrellaBeach className="text-4xl text-red-600" />
            <Link to="/beaches" className="font-semibold hover:text-red-500">
              Beach Tours
            </Link>
            <p className="text-sm">Discover beautiful beaches around the world.</p>
          </div>
        </div>
      </section>



      <section className="bg-gray-100 py-16 text-black flex flex-col justify-center">
        <h6 className="text-2xl md:text-3xl underline text-center mb-8 font-bold">
             What Travellers Says
        </h6>


        {/* Center the whole grid */}
        <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 text-center">
      
                <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow">
                    <img src="/trav1.jpg" className="review-img" alt="Traveler 1" />
                    <div className="font-bold">Comfort Joseph</div>
                    <div className="font-bold">⭐⭐⭐⭐⭐</div>
                    <p>Beautiful destinations and great customer support. Highly recommended.</p>
                </div>

                <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow">
                    <img src="/trav2.jpg" className="review-img" alt="Traveler 2" />
                    <div className="font-bold">Emmanuel Joseph</div>
                    <div className="font-bold">⭐⭐⭐⭐⭐</div>
                    <p>Easy to use platform with amazing travel deals. Loved my experience!</p>
                </div>

                <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow">
                    <img src="/trav3.jpg" className="review-img" alt="Traveler 3" />
                    <div className="font-bold">Godspower Joseph</div>
                    <div className="font-bold">⭐⭐⭐⭐⭐</div>
                    <p>A one-stop solution for all my travel needs. Exceptional service!</p>
                </div>
            </div>
        </div>



        <section className="bg-purple-800 py-20  text-white min-h-64 justify-center items-center ">
            <footer className="">
                <div className="max-w-6xl mx-auto px-4 text-center text-bold">
                    About TravelPlanner is your ultimate travel companion, offering seamless flight and hotel bookings, curated beach and city tours, and personalized travel experiences. Connect with us on social media:
                    <div className="flex justify-center space-x-6 mt-4">
                        <a href="https://www.facebook.com/miracle.joseph.358868" className="hover:text-red-500"><FaFacebook size={24} /></a>
                        <a href="mjschool48@gmail.com" className="hover:text-red-500"><FaInstagram size={24} /></a>
                        <a href="www.linkedin.com/in/miracle-joseph-009b16349" className="hover:text-red-500"><FaLinkedin size={24} /></a>
                        <a href="miraclejoseph896@gmail.com" className="hover:text-red-500"><FaEnvelope size={24} /></a>
                    </div>
                </div>
            </footer>
        </section>
     </section>
 </div>
  );
}
