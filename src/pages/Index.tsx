import FloatingHearts from '@/components/FloatingHearts';
import ValentineCard from '@/components/ValentineCard';

const Index = () => {
  return (
    <div className="min-h-screen romantic-gradient-bg overflow-hidden relative">
      {/* Floating hearts background */}
      <FloatingHearts />
      
      {/* Main Valentine card */}
      <ValentineCard />
    </div>
  );
};

export default Index;
