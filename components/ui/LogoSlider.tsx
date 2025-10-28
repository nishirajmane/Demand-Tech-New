import './LogoSlider.css';
import Image from 'next/image';



const placeholderLogos: string[] = [
   '/wef.webp',
   '/HP 1.webp',
   '/tally.webp',
   '/Sophos.webp',
   '/thoughtspot.webp',
   '/epicor_.webp',
   '/Red_Hat2.webp',
   '/Zoho.webp',
   '/zoom1.webp',
   '/salesforce1.webp',
    // '/Redis.png',
    // '/paycor.webp',
    // '/tmp.webp',
    // '/commvault.webp',
    // '/peoplestrong.webp',

           
    
        
];

function LogoSlider() {
    return (
        <div className="logo-slider">
            <div className="logo-slider-track" aria-hidden="false">
                {placeholderLogos.map((src, idx) => (
                    <Image
                        key={`logo-a-${idx}`}
                        src={src}
                        alt="logo"
                        width={140}
                        height={48}
                        className="h-12 w-auto object-contain"
                        priority={false}
                    />
                ))}
                {/* Duplicate for seamless loop */}
                {placeholderLogos.map((src, idx) => (
                    <Image
                        key={`logo-b-${idx}`}
                        src={src}
                        alt="logo"
                        width={140}
                        height={48}
                        className="h-12 w-auto object-contain"
                        priority={false}
                    />
                ))}
            </div>
        </div>
    );
}

export default LogoSlider;


