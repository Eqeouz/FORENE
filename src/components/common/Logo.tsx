import { cn } from '@/src/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'brand';
  showText?: boolean;
}

export default function Logo({ className, variant = 'brand', showText = true }: LogoProps) {
  // Variant configurations
  const variantStyles = {
    brand: 'bg-brand-forest text-white',
    dark: 'bg-brand-onyx text-white',
    light: 'bg-white text-brand-forest'
  };

  const textStyles = {
    brand: 'text-brand-onyx',
    dark: 'text-brand-onyx',
    light: 'text-white'
  };

  return (
    <div className={cn("flex items-center gap-3 group shrink-0", className)}>
      <div className={cn(
         <img src="/Secondary-Logo.svg" alt="FORENE Logo" className="w-8 h-8 object-contain" />,
        variant === 'brand' && "group-hover:bg-brand-lime group-hover:text-brand-onyx"
      )}>
        {/* If the user actually uploaded a logo, they can replace this with an <img> tag */}
        {/* <img src="/logo.png" alt="FORENE" className="w-full h-full object-contain p-1" /> */}
        <span className="font-black text-xl tracking-tighter">F</span>
      </div>
      
      {showText && (
        <div>
          <h1 className={cn(
            "text-xl font-black tracking-tighter block leading-none transition-colors",
            textStyles[variant]
          )}>
            FORENE
          </h1>
          <p className={cn(
            "text-[9px] uppercase font-black tracking-widest leading-none mt-1 opacity-50",
            textStyles[variant]
          )}>
            Food Research Network
          </p>
        </div>
      )}
    </div>
  );
}
