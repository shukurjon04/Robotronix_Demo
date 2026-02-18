import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark pt-20">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-dark to-purple-900/20"></div>
                <div className="circuit-pattern absolute inset-0 opacity-10"></div>

                {/* Animated Circles */}
                <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="text-center lg:text-left space-y-8" data-aos="fade-up">
                    <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                        <span className="gradient-text block mb-2">Robotlar sizni emas,</span>
                        <span className="text-white">siz robotlarni boshqaring!</span>
                    </h1>

                    <p className="text-gray-300 text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                        Robotronix – Farg'ona va Namangan viloyatlaridagi yetakchi robototexnika markazi.
                        Biz bolalar va o'qituvchilarni kelajak texnologiyalari bilan tanishtiramiz.
                        <span className="block mt-2 text-secondary font-medium">Kelajak kasbini bugundan o'rganing!</span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link to="/courses" className="btn-primary group">
                            <span>Kursni boshlash</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                        <a href="#about" className="btn-outline group">
                            <span>Batafsil ma'lumot</span>
                            <span className="group-hover:translate-y-1 transition-transform">↓</span>
                        </a>
                    </div>

                    <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-800">
                        <div className="text-center lg:text-left">
                            <div className="text-3xl font-bold text-white mb-1">500+</div>
                            <div className="text-gray-400 text-sm">Bitiruvchilar</div>
                        </div>
                        <div className="text-center lg:text-left">
                            <div className="text-3xl font-bold text-white mb-1">2000+</div>
                            <div className="text-gray-400 text-sm">O'quvchilar</div>
                        </div>
                        <div className="text-center lg:text-left">
                            <div className="text-3xl font-bold text-white mb-1">10+</div>
                            <div className="text-gray-400 text-sm">Filiallar</div>
                        </div>
                    </div>
                </div>

                {/* Hero Visual */}
                <div className="relative lg:h-[600px] flex items-center justify-center p-8" data-aos="fade-left">
                    <div className="relative w-full max-w-md animate-float">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-30"></div>
                        <div className="relative bg-dark-card rounded-2xl border border-gray-700 p-6 shadow-2xl overflow-hidden">
                            {/* Code Window Header */}
                            <div className="flex items-center gap-2 mb-4 border-b border-gray-700 pb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="ml-2 text-xs text-gray-400 font-mono">robot_control.cpp</span>
                            </div>

                            {/* Code Content */}
                            <pre className="font-mono text-sm text-gray-300 overflow-x-auto">
                                <code>
                                    <span className="text-purple-400">#include</span> <span className="text-green-400">&lt;Robotronix.h&gt;</span>
                                    {'\n\n'}
                                    <span className="text-blue-400">void</span> <span className="text-yellow-400">setup</span>() {'{'}
                                    {'\n'}  <span className="text-gray-500">// Robot tizimini ishga tushirish</span>
                                    {'\n'}  Robot.<span className="text-yellow-400">begin</span>();
                                    {'\n'}  Robot.<span className="text-yellow-400">say</span>(<span className="text-green-400">"Salom, Dunyo!"</span>);
                                    {'\n'}{'}'}
                                    {'\n\n'}
                                    <span className="text-blue-400">void</span> <span className="text-yellow-400">loop</span>() {'{'}
                                    {'\n'}  <span className="text-purple-400">if</span> (Robot.<span className="text-yellow-400">isDetectingHuman</span>()) {'{'}
                                    {'\n'}    Robot.<span className="text-yellow-400">waveHand</span>();
                                    {'\n'}    Robot.<span className="text-yellow-400">smile</span>();
                                    {'\n'}  {'}'}
                                    {'\n'}{'}'}
                                </code>
                            </pre>

                            {/* Floating Elements on top of code */}
                            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
                            <div className="absolute bottom-4 right-4 animate-bounce text-4xl">🤖</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
