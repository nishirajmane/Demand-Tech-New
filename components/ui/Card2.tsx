import { CardBody, CardContainer, CardItem } from './3d-card';
import Image from 'next/image';

interface Card2Props {
    imageSrc?: string;
    alt?: string;
    aspectClass?: string; // e.g., "aspect-[16/9]", "aspect-[4/3]", etc.
}

function Card2({ imageSrc = "/image1.jpeg", alt = "Card image", aspectClass = "aspect-[16/9]" }: Card2Props) {
    return (
        <CardContainer className="inter-var w-full">
            <CardBody
                className="relative group/card w-full max-w-[440px] sm:max-w-[520px] md:max-w-[640px] lg:max-w-[720px]"
            >
                <CardItem translateZ={60} className="w-full">
                    {/* Aspect ratio wrapper to keep image responsive */}
                    <div className={`relative w-full ${aspectClass}`}>
                        <Image
                            src={imageSrc}
                            height={800}
                            width={1280}
                            className="absolute inset-0 h-full w-full object-cover rounded-[28px] group-hover/card:shadow-xl"
                            alt={alt}
                            priority={false}
                        />
                    </div>
                </CardItem>
            </CardBody>
        </CardContainer>
    );
}

export default Card2;
