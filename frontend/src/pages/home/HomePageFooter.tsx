import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

export function HomePageFooter() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { href: '#privacy', label: 'Privacy Policy' },
    { href: '#terms', label: 'Terms of Service' },
    { href: '#contact', label: 'Contact Us' }
  ];

  return (
    <footer id="contact" className="glass-navbar mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 glass-brand-accent rounded-full flex items-center justify-center">
                <GraduationCap className="text-white" size={20} />
              </div>
              <h3 className="text-2xl font-bold text-white">Edvana</h3>
            </div>
            <p className="text-white/70 leading-relaxed">
              Transforming education in Rwanda through innovative technology and 
              comprehensive learning solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <div className="space-y-2">
              {footerLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="block text-white/70 hover:text-white glass-transition"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-white/70">
                <Mail size={16} />
                <span>info@edvana.rw</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <Phone size={16} />
                <span>+250 788 123 456</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <MapPin size={16} />
                <span>Kigali, Rwanda</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © {currentYear} Edvana. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {footerLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="text-white/60 hover:text-white text-sm glass-transition"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}