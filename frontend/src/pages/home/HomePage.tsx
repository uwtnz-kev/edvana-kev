import { HomePageNavbar } from './HomePageNavbar';
import { HomePageContent } from './HomePageContent';
import { HomePageFooter } from './HomePageFooter';

export default function EdvanaHomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary via-brand-brown to-brand-primary">
      <HomePageNavbar />
      <HomePageContent />
      <HomePageFooter />
    </div>
  );
}