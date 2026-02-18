import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-dark/95 border-t border-gray-800 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link to="/" className="flex items-center gap-2">
                            <i className="fas fa-robot text-primary text-3xl"></i>
                            <span className="text-2xl font-bold text-white tracking-wide">Robotronix</span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed max-w-sm">
                            Robotronix – O'zbekistonda robototexnika ta'limini
                            yangi bosqichga olib chiquvchi innovatsion markaz.
                            Yoshlarni texnologiya iste'molchisidan ixtirochisiga
                            aylantiramiz.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://t.me/robotronixuz"
                                className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fab fa-telegram"></i>
                            </a>
                            <a
                                href="https://instagram.com/robotronixuz"
                                className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all duration-300"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a
                                href="https://youtube.com/robotronixuz"
                                className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-300"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="lg:col-span-2 md:col-span-1">
                        <h4 className="text-white font-bold text-lg mb-6">Kurslar</h4>
                        <ul className="space-y-4">
                            <li><a href="/#courses" className="text-gray-400 hover:text-primary transition-colors">Mitti Muhandis</a></li>
                            <li><a href="/#courses" className="text-gray-400 hover:text-primary transition-colors">Kichik Muhandis</a></li>
                            <li><a href="/#courses" className="text-gray-400 hover:text-primary transition-colors">Yosh Muhandis</a></li>
                            <li><a href="/#courses" className="text-gray-400 hover:text-primary transition-colors">Dasturlash va AI</a></li>
                            <li><a href="/#courses" className="text-gray-400 hover:text-primary transition-colors">O'qituvchilar kursi</a></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-3 md:col-span-1">
                        <h4 className="text-white font-bold text-lg mb-6">Mahsulotlar</h4>
                        <ul className="space-y-4">
                            <li><a href="/#products" className="text-gray-400 hover:text-primary transition-colors">Arduino To'plamlari</a></li>
                            <li><a href="/#products" className="text-gray-400 hover:text-primary transition-colors">LEGO WeDo 2.0</a></li>
                            <li><a href="/#products" className="text-gray-400 hover:text-primary transition-colors">3D Modellar</a></li>
                            <li><a href="/#products" className="text-gray-400 hover:text-primary transition-colors">Elektronika Qismlari</a></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-3 md:col-span-1">
                        <h4 className="text-white font-bold text-lg mb-6">Kompaniya</h4>
                        <ul className="space-y-4">
                            <li><a href="/#about" className="text-gray-400 hover:text-primary transition-colors">Biz haqimizda</a></li>
                            <li><a href="/#contact" className="text-gray-400 hover:text-primary transition-colors">Aloqa</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Hamkorlik</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Yangiliklar</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Vakansiyalar</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Robotronix. Barcha huquqlar himoyalangan.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Maxfiylik siyosati</a>
                        <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Foydalanish shartlari</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
