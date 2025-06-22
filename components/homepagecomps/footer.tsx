import Link from "next/link";
import { FaEnvelope, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="mt-18 bg-[#333] text-gray-300 py-16 px-8">
            <div className="max-w-7xl mx-auto text-center space-y-6">
                <h3 className="text-2xl font-semibold text-white">Join the Acrilc Community</h3>
                <p className="text-gray-200">
                    Empowering handcrafted artists worldwide through AI-enabled social commerce
                </p>
                <div className="flex justify-center space-x-6 text-xl">
                    <Link href="#" aria-label="Email" className="hover:text-white transform hover:scale-110 transition duration-[0.3s] ease-in-out"><FaEnvelope /></Link>
                    <Link href="#" aria-label="Facebook" className="hover:text-white transform hover:scale-110 transition duration-[0.3s] ease-in-out"><FaFacebookF /></Link>
                    <Link href="#" aria-label="Instagram" className="hover:text-white transform hover:scale-110 transition duration-[0.3s] ease-in-out"><FaInstagram /></Link>
                    <Link href="#" aria-label="Twitter" className="hover:text-white transform hover:scale-110 transition duration-[0.3s] ease-in-out"><FaTwitter /></Link>
                </div>
                <p className="mt-6 text-sm text-gray-300">© 2025 Acrilc. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;